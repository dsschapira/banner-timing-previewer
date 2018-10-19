import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable()
export class FileUploaderService {

  constructor( 
    private http: HttpClient
    ) { }

  uploadFiles(fileList){
    var formData: FormData = new FormData();
    /* 
    *  Headers need to be figured out by the browser because of a bug in Angular - it is listed as fixed but based on testing, I'm not convinced.
    *  Issue - https://github.com/angular/angular/issues/18096
    *  Currently if you set the content-type manually, there will be no boundary header detection
    *  Because of this, we need to rely entirely on the browser detecting and setting the correct headers.
    */
    fileList.forEach((file,index) => {
      formData.append('file-'+index, file, file.name);
    });
    return this.http.post('http://localhost:8080/banner-timing-previewer/server/api/post_banner.php', formData);
  }

}
