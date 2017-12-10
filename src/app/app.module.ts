import {BrowserModule, Meta} from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import {ArticleAddComponent} from './article/articleAdd/article-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ArticleService} from './article/article.service';
import {FileUploaderService} from './image-uploader/file-uploader.service';
import { AuthService } from './register/auth.service';
import { AuthGuardLogin} from './register/auth-guard-login.service';
import {AuthGuardAdmin} from './register/auth-guard-admin.service';
import {UserService} from './register/user.service';


import { ROUTES } from './app.routes';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NoContentComponent} from './no-content/no-content.component';
import { Title } from '@angular/platform-browser';

import {AppState} from './app.service';
import { NavComponent } from './nav/nav.component';
import { CKEditor } from './cke-component/cke-component.component';
import {CKEditorModule} from 'ng2-ckeditor';
import { ArticlePageComponent } from './article/article-page-component/article-page-component.component';

import { ImageUploaderComponent } from './image-uploader/image-uploader-component/image-uploader-component.component';
import { SafeUrlPipe } from './image-uploader/safe-url.pipe';
import { RegisterComponent } from './register/register/register.component';
import { LoginComponent } from './login/login.component';
import { ToastComponent } from './shared/toast/toast.component';
import { ArticleTeaserComponent } from './article/article-teaser/article-teaser.component';
import { ArticlesViewComponent } from './article/articles-view/articles-view.component';
import {ArticleUpdateComponent} from './article/article-update/article-update.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginFormComponent, ModalLoginContentComponent} from './shared/modal/login-form/login-form.component';
import {ContactFormComponent} from "./shared/modal/contact-form/contact-form.component";
import { ArticlesPageComponent } from './article/articles/articles-page/articles-page.component';
import { AboutTeaserComponent } from './about/about-teaser/about-teaser.component';
import {NavigationbarComponent} from "./navigationbars/navigationbar.component";
import { AboutPageComponent } from './about/about-page/about-page.component';
import { ArticleTeaserMainComponent } from './article/article-teaser-main/article-teaser-main.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticleAddComponent,
    HomeComponent,
    NoContentComponent,
    NavComponent,
    CKEditor,
    ArticlePageComponent,
    ImageUploaderComponent,
    SafeUrlPipe,
    RegisterComponent,
    LoginComponent,
    ToastComponent,
    ArticleTeaserComponent,
    ArticlesViewComponent,
    ArticleUpdateComponent,
    LoginFormComponent,
    ModalLoginContentComponent,
    ContactFormComponent,
    ArticlesPageComponent,
    AboutTeaserComponent,
    NavigationbarComponent,
    AboutPageComponent,
    ArticleTeaserMainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CKEditorModule,
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }),
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    ArticleService,
    FileUploaderService,
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    UserService,
    AppState,
    Title,
    Meta],
  entryComponents: [ModalLoginContentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
