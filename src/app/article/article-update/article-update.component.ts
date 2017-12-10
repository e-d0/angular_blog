import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';


import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


const now = new Date();
@Component({
    styleUrls: ['./article-form.css'],
    selector: 'app-article-update-form',
    templateUrl: './article-update.component.html'
})

export class ArticleUpdateComponent implements OnInit{

  updateArticleForm: FormGroup;
  submitted = false;
  created = '';
  content = '';
  private url = '';

  constructor(
                private router: Router,
                private route: ActivatedRoute,
                private ArticleService: ArticleService,
                private formBuilder: FormBuilder,
                private ngbDateParserFormatter: NgbDateParserFormatter
                ){
                  this.updateArticleForm = this.formBuilder.group({
                    _id: '',
                    title: ['', Validators.required ],
                    url: ['', Validators.required ],
                    content: [''],
                    image_teaser: [''],
                    teaser_text: [''],
                    weight: [''],
                    tag: ['', Validators.required ],
                    created: ''
                   });

                  this.url = this.route.snapshot.params.name;
      }



    ngOnInit(){

        this.ArticleService.findArticle(this.url).toPromise().then(
          res => {
              const formattedDate = new Date(res.created);
              const model: NgbDateStruct = {year: formattedDate.getFullYear() , month: formattedDate.getMonth() + 1, day: formattedDate.getDate()};

               for (const prop in this.updateArticleForm.controls) {

                         if (prop == 'created') {
                           this.updateArticleForm.controls[prop].setValue(model);
                         } else {
                           this.updateArticleForm.controls[prop].setValue(res[prop]);
                         }


                }

          },
          err => console.log(err)
      );

    }

  articleUpdate(){

      // get date
      const createdDate = this.updateArticleForm.value.created;
      // date from object format to string 2017-01-01
      const formattedDate = this.ngbDateParserFormatter.format(createdDate); // e.g. myDate = 2017-01-01
      this.updateArticleForm.value.created = formattedDate;

      this.url = this.updateArticleForm.value.url;
      this.ArticleService.editArticle(this.updateArticleForm.value).toPromise().then(
        res => { this.router.navigate(['/update/article/', this.url]); location.reload(); },
        err => console.log(err)
      );
    }

  removeArticle() {
    this.ArticleService.deleteArticle(this.url);
  }

  onSubmit() {
    this.submitted = true;
  }

}
