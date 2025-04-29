import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    public authService: AuthService, 
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSignup(): void {
    if (this.signupForm.invalid) {
      return;
    }
    const { email, password } = this.signupForm.value;
    this.authService.createUser(email, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Signup successful:', response);
        this.router.navigate(['/login']);

      },
      error: (err) => {
        console.error('Signup error:', err);
      }
    });
  }
}