import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FileUploaderService {

  filesToUpload: any ;
  results: any;

  constructor( private http: HttpClient) { }

  // TO DO add progress bar
  // req = new HttpRequest(
  //     'POST',
  //     'http://localhost:8200/api/upload',
  //     this.filesToUpload,
  //   { reportProgress: true }
  //   );

   upload(files){
       return this.http.post('/api/upload', files , { reportProgress: true } );


    // TO DO add progress bar
    // this.http.request(this.req).subscribe(event => {
    //   // Via this API, you get access to the raw event stream.
    //   // Look for upload progress events.
    //   if (event.type === HttpEventType.UploadProgress) {
    //     // This is an upload progress event. Compute and show the % done:
    //     const percentDone = Math.round(100 * event.loaded / event.total);
    //     console.log(`File is ${percentDone}% uploaded.`);
    //   } else if (event instanceof HttpResponse) {
    //     console.log('File is completely uploaded!');
    //   }
    // });

  }

  getImages(){
    return this.http.post('/api/getallimages', null);
  }

  removeImage(name){
    return this.http.post('/api/remove/' + name, null);
  }

  handleError( res: Response | any) : Observable<any>{
    return Observable.throw('error');
  }

  mapPost(res: Response){
      const post = res;
      return post;
  }



}
