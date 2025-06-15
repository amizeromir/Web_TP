import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService, SensorData } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [CommonModule, IonicModule, NgChartsModule]
})
export class DashboardPage implements OnInit {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: '🌡️ Température (°C)',
        data: [],
        borderColor: 'red',
        backgroundColor: 'rgba(255,0,0,0.3)',
        tension: 0.3,
        fill: true
      },
      {
        label: '💧 Humidité (%)',
        data: [],
        borderColor: 'blue',
        backgroundColor: 'rgba(0,0,255,0.3)',
        tension: 0.3,
        fill: true
      },
      {
        label: '🧪 Ammoniac (ppm)',
        data: [],
        borderColor: 'green',
        backgroundColor: 'rgba(0,255,0,0.3)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: '📊 Mesures en temps réel'
      }
    },
    animation: false
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    interval(5000)
      .pipe(switchMap(() => this.dataService.getSensorData()))
      .subscribe((data: SensorData[]) => {
        const now = new Date().toLocaleTimeString();
        if (this.lineChartData.labels) {
          this.lineChartData.labels.push(now);
          if (this.lineChartData.labels.length > 20) {
            this.lineChartData.labels.shift();
          }
        }

        const temperature = data.find(d => d.type === 'temperature')?.value ?? 0;
        const humidity = data.find(d => d.type === 'humidity')?.value ?? 0;
        const ammonia = data.find(d => d.type === 'ammonia')?.value ?? 0;

        this.lineChartData.datasets[0].data.push(temperature);
        this.lineChartData.datasets[1].data.push(humidity);
        this.lineChartData.datasets[2].data.push(ammonia);

        for (let dataset of this.lineChartData.datasets) {
          if (dataset.data.length > 20) {
            dataset.data.shift();
          }
        }

        // Forcer la mise à jour
        this.lineChartData = { ...this.lineChartData };
      });
  }
}
