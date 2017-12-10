import {Component, Input } from '@angular/core';
import './ckeditor.loader';
import 'ckeditor';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'ckeEditor',
  templateUrl: './cke-component.component.html',
})
export class CKEditor {

  @Input() group: FormGroup;

  ckeditorContent: string;

  html:string;

  constructor( ) {
    this.ckeditorContent = `<p>Начните вводить текст здесь...</p>`;
  }

  onSubmit(){

  }

  getvalue(){
    return  this.ckeditorContent;
  }


}



