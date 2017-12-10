import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Article } from './article.model';
import { ArticleService } from '../article.service';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';


import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


const now = new Date();
@Component({
    styleUrls: ['./article-form.css'],
    selector: 'article-add-form',
    templateUrl: './article-add.component.html'
})

export class ArticleAddComponent implements OnInit{

  addArticleForm: FormGroup;
  articleTitle: string;
  source = '';
  submitted = false;
  created= '';
  content= '';

  filesToUpload: any ;

  currentDate = new Date();
    constructor(
                private httpClient: HttpClient,
                private ArticleService: ArticleService,
                private formBuilder: FormBuilder,
                private ngbDateParserFormatter: NgbDateParserFormatter
                ){
                  this.addArticleForm = this.formBuilder.group({
                    title: ['', Validators.required ],
                    url: ['', Validators.required ],
                    content: [''],
                    image_teaser: [''],
                    teaser_text: [''],
                    weight: [''],
                    tag: ['', Validators.required ],
                    created: ''
                   });
                  this.filesToUpload = [];
      }

  model: NgbDateStruct = {year: now.getFullYear() , month: now.getMonth() + 1, day: now.getDate()};


    ngOnInit(){
      this.addArticleForm.controls.created.setValue(this.model);

    }

    articleAdd(){
      // get title value
      this.source = this.addArticleForm.value.title;
      // get date
      const createdDate = this.addArticleForm.value.created;
      // date from object format to string 2017-01-01
      const formattedDate = this.ngbDateParserFormatter.format(createdDate); // e.g. myDate = 2017-01-01
      this.addArticleForm.value.created = formattedDate;

      console.log(this.addArticleForm.value);
        this.ArticleService.addArticle(this.addArticleForm.value).subscribe(
          res => {
            const newArticle = res.json();

          },
          error => console.log(error)
        );
      }



   clickVal(event: any){
    console.log(this.addArticleForm);
  }

  onSubmit() {
    this.submitted = true;

  }

}
