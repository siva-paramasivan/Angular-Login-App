import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        password: [
          '', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: User) => {
          this.router.navigate(['/']);
          this.toastr.success('Login successful');
        },
        error: (error) => {
          this.toastr.error('Username or password is incorrect');
        }
      })
    }
  }
}
