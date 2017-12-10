import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";

@Component({
  selector: 'app-article-teaser',
  templateUrl: './article-teaser.component.html',
  styleUrls: ['./article-teaser.component.scss']
})
export class ArticleTeaserComponent implements OnInit {

  @Input() teaser_title: string;
  @Input() article_href: string;
  @Input() img_teaser: any;
  @Input() teaser_text: string;
  @Input() created: string;

  constructor( private sanitizer: DomSanitizer) {}

  ngOnInit() {
  }

  returnStyleUrl(){
    return this.sanitizer.bypassSecurityTrustStyle(`url("${this.img_teaser}")`);
  }

}
