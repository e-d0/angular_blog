import { Component,  OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../register/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'modal-login-content-component',
  template: `

    <div *ngIf="message.body" class="alert alert-{{message.type}} alert-dismissible" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>Message:</strong> {{message.body}}
    </div>


    <div class="modal-header">
      <h4 class="card-header">Login</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>


    <div class="modal-body">

     <div class="card">
      <div class="card-block">

        <form [formGroup]="loginForm" (ngSubmit)="login()">
          <div class="input-group" [ngClass]="setClassEmail()">
            <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
            <input class="form-control" type="email" name="email" formControlName="email" placeholder="Email" autofocus>
          </div>
          <div class="input-group" [ngClass]="setClassPassword()">
            <span class="input-group-addon"><i class="fa fa-key"></i></span>
            <input class="form-control" type="password" name="password" formControlName="password" placeholder="Password">
          </div>
          <button class="btn btn-primary" type="submit" [disabled]="!loginForm.valid"><i class="fa fa-sign-in"></i> Login</button>
         
        </form>

      </div>
    </div>
    </div>

    <div class="modal-footer">
      <!--<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>-->
      <button *ngIf="logged === true" class="btn btn-primary"(click)="logout()"><i class="fa fa-sign-in"></i>Logout</button>
    </div>

  `
})
export class ModalLoginContentComponent implements OnInit {

  constructor(
              public activeModal: NgbActiveModal,
              private auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              ) {}

  message = { body: '', type: '' };

  logged: boolean = false;

  loginForm: FormGroup;
  email = new FormControl('', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required,
    Validators.minLength(6)]);

  ngOnInit() {

    if (this.auth.loggedIn) {
      this.logged = true;
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
      res => this.activeModal.close(),
      error => this.setMessage('invalid email or password!', 'danger')
    );
  }


  setMessage(body, type, time = 4000) {
    this.message.body = body;
    this.message.type = type;
    setTimeout(() => { this.message.body = ''; }, time);
  }

  logout(){
    this.logged = false;
    this.auth.logout();
    this.activeModal.close();
  }

}

/* modal form call tag component */
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  modalRef: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {

  }

  open() {
    const modalRef = this.modalService.open(ModalLoginContentComponent);
  }

  close(){
    this.modalRef.close();
  }

}
