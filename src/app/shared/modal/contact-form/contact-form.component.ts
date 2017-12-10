import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent{

  @ViewChild('form') public form;

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  successMessagebool = false;
  successMessage: string;
  errorMessagebool = false;
  errorMessageContent: string;
  contactForm;
  checkbox: boolean;

  constructor(
    private http: Http,
    private fb: FormBuilder) {
    this.contactForm = fb.group({
      username:  [''],
      email: ['', Validators.email],
      message: [''],
      checkbox: ['']
    });
  }

  onSubmit() {
      if ( !this.checkbox ) {
        this.sendMail(this.contactForm.value);
      }
  }
  /*checkbox checking. antispam bot protection*/
  monitorChckbx(event) {
      if ( event.target.checked ) {
        this.checkbox = true;
      }else {
        this.checkbox = false;
      }

  }

  sendMail(body): Promise<any> {
    return this.http.post(`/api/sendmail`, body , this.options ).toPromise()
      .then(
          result => { this.sucessMessage(); },
          error => { this.errorMessage(); }
      ).catch(this.handleError);

  }

  sucessMessage() {
    this.successMessagebool = true;
    this.successMessage = 'Сообщение отправлено';
    this.contactForm.reset();
    setTimeout(
      () => this.form.hide()
    , 2000);
  }

  errorMessage() {
    this.errorMessagebool = true;
    this.errorMessageContent = 'Ошибка. Что-то пошло не так.';
    setTimeout(
      () => this.form.hide()
      , 5000);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }


}
