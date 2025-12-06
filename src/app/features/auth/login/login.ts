import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const { userId, password } = this.loginForm.value;

      this.authService.login(userId, password).subscribe({
        next: (isAuthenticated) => {
          this.isLoading = false;
          if (isAuthenticated) {
            // Navigate to dashboard or home
            console.log('Login successful');
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Authentication failed. Please check your credentials.';
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Login error', err);
          this.errorMessage = 'An error occurred during login. Please try again.';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
