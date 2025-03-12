import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  standalone:false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted!: boolean;
  
  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private formBuilder:FormBuilder
  ){}

  loginForm:FormGroup= new FormGroup({
    name:new FormControl(''),
    password: new FormControl('')
  })
  loading!:boolean;



  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name:['', Validators.required],
      password:['',Validators.maxLength(25),Validators.minLength(6)]
    })
  }

  get f(){
    return this.loginForm.controls
  }

  onSubmit(){
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.register(this.loginForm.value).subscribe(
      data => {
        this.toastr.success('Registration successful');
        this.router.navigate(['/login']);
      },
      error => {
        this.toastr.error(error);
      });
  }
  
}
