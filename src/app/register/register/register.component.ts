import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  username = new FormControl('', [Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  email = new FormControl('', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required,
    Validators.minLength(6)]);

  role = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    });
  }

  setClassUsername() {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }
  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  register() {
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      error => console.log('email already exists', 'danger')
    );
  }
}

