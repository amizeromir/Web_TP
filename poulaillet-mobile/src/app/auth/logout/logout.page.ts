// src/app/auth/logout/logout.page.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {IonContent, IonHeader, IonSpinner, IonText, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonSpinner,
    IonText
  ]
})
export class LogoutPage implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.logout();
  }
}
