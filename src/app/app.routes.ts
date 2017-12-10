import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { ArticleAddComponent } from './article/articleAdd';
import { ArticlePageComponent } from './article/article-page-component';
import {RegisterComponent} from './register/register/register.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardAdmin} from './register/auth-guard-admin.service';
import {ArticleUpdateComponent} from './article/article-update/article-update.component';
import {ArticlesPageComponent} from './article/articles/articles-page/articles-page.component';
import {AboutPageComponent} from './about/about-page/about-page.component';



export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles', component: ArticlesPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'article/:name', component: ArticlePageComponent },
  { path: 'add/article', component: ArticleAddComponent , canActivate: [AuthGuardAdmin] },
  { path: 'update/article/:name', component: ArticleUpdateComponent , canActivate: [AuthGuardAdmin] },
  { path: 'reg', component: RegisterComponent,  },
  { path: 'login', component: LoginComponent },
  { path: '**',    component: NoContentComponent },
];
