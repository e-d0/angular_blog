import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService{

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    getArticles(): Observable<any> {
        return this.http.get('/api/articles').map(res => res.json());
    }

    getArticlesCount(): Observable<any> {
        return this.http.get('/api/articles/count').map(res => res.json());
    }

    addArticle(article): Observable<any>{
      const token = localStorage.token;
      this.headers.append('Authorization', '' + token);

      return this.http.post('/api/article/add', JSON.stringify(article), this.options);
    }

    findArticle(url): Observable<any>{
        return this.http.get(`/api/article/${url}`).map(res => res.json());
    }

    getArticle(article): Observable<any>{
        return this.http.get(`/api/article/${article._id}`).map(res => res.json());
    }

    editArticle(article): Observable<any> {

      const token = localStorage.token;
      this.headers.append('Authorization', '' + token);

      return this.http.put(`/api/article/${article._id}`, JSON.stringify(article), this.options);
    }

    deleteArticle(url){

        this.findArticle(url).toPromise().then(
          (res) =>  {
             this.delete(res._id);
          },
          (error) => console.error(error)
        );

    }

    delete(id): Promise<any> {
      return this.http.delete(`/api/article/remove/${id}`, this.options).toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      return Promise.reject(error.message || error);
    }

}
