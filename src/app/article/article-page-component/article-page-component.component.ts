import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../article.service';
import {DomSanitizer, Meta, SafeHtml, Title} from '@angular/platform-browser';
import {AuthService} from '../../register/auth.service';

@Component({
  selector: 'app-article-page-component',
  templateUrl: './article-page-component.component.html',
  styleUrls: ['./article-page-component.component.scss'],
})
export class ArticlePageComponent implements OnInit {

  name = '';
  url = '';
  content: SafeHtml;
  admin: boolean;

  constructor(private meta: Meta,
              private metaHeaderTitle: Title,
              private route: ActivatedRoute,
              private ArticleService: ArticleService,
              private sanitizer: DomSanitizer,
              private router: Router,
              private authService: AuthService
              ) {
    this.admin = authService.isAdmin;
  }

  ngOnInit() {

    this.name = this.route.snapshot.params.name;

    this.ArticleService.findArticle(this.name).toPromise().then(
      (res) => {
        this.content = this.sanitizer.bypassSecurityTrustHtml(res.content);
        this.meta.addTags( ( [
          { name: 'title', content: res.title },
          { name: 'description', content: res.teaser_text },
          { name: 'referrer', content: 'always' },
          { property: 'og:title', content: res.title },
          { property: 'og:url', content: this.router.url },
          { property: 'og:image', content: res.image_teaser },
          { property: 'og:description', content: res.teaser_text },
          { property: 'author', content: 'webblog' },
          { property: 'og:type', content: 'article' },
        ]   ) );
        this.metaHeaderTitle.setTitle(res.title);
        this.url = res.url;
      } ,
      err => console.log(err)
    );




  }

  updateArticlePage() {
    this.router.navigate([`update/article/${this.url}`]);
  }

}
