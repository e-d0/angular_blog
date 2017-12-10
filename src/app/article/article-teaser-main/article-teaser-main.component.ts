import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-article-teaser-main',
  templateUrl: './article-teaser-main.component.html',
  styleUrls: ['./article-teaser-main.component.scss']
})
export class ArticleTeaserMainComponent {

  @Input() teaser_title: string;
  @Input() article_href: string;
  @Input() img_teaser: any;
  @Input() teaser_text: string;
  @Input() created: string;

  constructor( private sanitizer: DomSanitizer) {}

  returnStyleUrl() {
    return this.sanitizer.bypassSecurityTrustStyle(`url("${this.img_teaser}")`);
  }

  returnImgUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl( this.img_teaser );
  }

}
