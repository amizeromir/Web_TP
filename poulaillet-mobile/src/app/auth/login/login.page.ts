import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule, RouterModule],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Tous les champs sont requis.';
      return;
    }

    const success = this.authService.login(this.username, this.password);
    if (!success) {
      this.error = 'Nom d’utilisateur ou mot de passe incorrect.';
    }
  }
}
