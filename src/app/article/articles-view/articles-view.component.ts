import { Component, OnInit } from '@angular/core';
import  { ArticleService } from '../article.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-articles-view',
  templateUrl: './articles-view.component.html',
  styleUrls: ['./articles-view.component.scss']
})
export class ArticlesViewComponent implements OnInit {

  allArticles: any;
  url: any;

  constructor(
    private router: Router,
    private articleService: ArticleService ){
      this.url = router.url;
  }

  ngOnInit() {
    this.getAllArticles();
  }

  getAllArticles(): Promise<any> {
    return this.articleService.getArticles().toPromise().then(
      data => this.allArticles = data,
      err => console.log( 'error'  + err)
    ).catch( this.handleError  );
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
