import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, SensorData } from '../../services/data';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    NgChartsModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Température (°C)',
        data: [],
        borderColor: 'red',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Humidité (%)',
        data: [],
        borderColor: 'blue',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Ammoniac (ppm)',
        data: [],
        borderColor: 'green',
        tension: 0.4,
        fill: false
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: 'Mesures en temps réel du poulailler'
      }
    },
    animation: false
  };

  private allData: SensorData[] = [];

  ngOnInit(): void {
    interval(5000)
      .pipe(switchMap(() => this.dataService.getSensorData()))
      .subscribe(data => {
        console.log('📡 Données reçues du backend :', data);
        this.allData.push(...data);

        const now = new Date().toLocaleTimeString();
        this.lineChartData.labels?.push(now);
        if (this.lineChartData.labels.length > 20) this.lineChartData.labels.shift();

        const temp = data.find(d => d.type === 'temperature')?.value ?? 0;
        const hum = data.find(d => d.type === 'humidity')?.value ?? 0;
        const ammo = data.find(d => d.type === 'ammonia')?.value ?? 0;

        this.lineChartData.datasets[0].data.push(temp);
        this.lineChartData.datasets[1].data.push(hum);
        this.lineChartData.datasets[2].data.push(ammo);

        for (let dataset of this.lineChartData.datasets) {
          if (dataset.data.length > 20) dataset.data.shift();
        }

        // Mise à jour du graphique
        this.lineChartData = { ...this.lineChartData };
      });
  }

  exportCSV(): void {
    const header = 'Type,Value,Timestamp\n';
    const rows = this.allData.map(d => `${d.type},${d.value},${d.timestamp ?? ''}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'donnees_poulailler.csv');
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }
}
