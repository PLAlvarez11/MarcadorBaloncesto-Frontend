import { Component } from '@angular/core';
//import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports:[CommonModule,  FormsModule ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token); // Guarda el JWT
        this.router.navigate(['/inicio']); // Redirige al dashboard o página principal
      },
      error: () => {
        this.errorMessage = 'Usuario o contraseña incorrectos.';
      }
    });
  }
}