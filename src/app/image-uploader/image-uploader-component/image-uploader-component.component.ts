import {Component, OnInit} from '@angular/core';
import {FormBuilder } from '@angular/forms';
import {FileUploaderService} from '../file-uploader.service';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';



@Component({
  selector: 'app-image-uploader-component',
  templateUrl: './image-uploader-component.component.html',
  styleUrls: ['./image-uploader-component.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  filesToUpload: any;
  linksArray: any;
  results: any;


  constructor( private http: HttpClient,
               private formBuilder: FormBuilder,
               private uploadService: FileUploaderService,
               private sanitizer: DomSanitizer){
       this.filesToUpload = [];
  }

  ngOnInit() {
    this.getImages();
  }

  getImages(){
    this.uploadService.getImages().map( res => this.results = res ).subscribe(
      data => console.log('done with url' ),
      err => console.log( 'error'  + err),
    );
  }

  upload(){
    this.uploadService.upload(this.filesToUpload).subscribe(
      data => console.log('uploaded'),
      err => {
        console.log('Something went wrong!');
      },
      () => ( this.getImages())
      );
  }

  removeImage(url){
    const filename = this.getFileNAme(url);
    this.uploadService.removeImage(filename).subscribe(
      data => this.getImages(),
      err => console.log( 'error'  + err),
    );
  }

  /* get file name from url */
  getFileNAme(url){
    const urlArray = url.split('/');
    return urlArray[urlArray.length - 1];
  }


  fileChangeEvent(event){

    const formData: any = new FormData();
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i].name);
    }

    this.filesToUpload = formData;

  }

}
