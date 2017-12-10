import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../register/auth.service';
import {ToastComponent} from '../shared/toast/toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild(ToastComponent)
  toast: ToastComponent;
  logged: boolean = false;

  loginForm: FormGroup;
  email = new FormControl('', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required,
    Validators.minLength(6)]);

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
               ) { }

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.logged = true;
      this.router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      res => this.router.navigate(['/']),
      error => this.toast.setMessage('invalid email or password!', 'danger')
    );
  }

  logout(){
    this.logged = false;
    this.auth.logout();
  }

}
