import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FileUploaderService {

  constructor( 
    private http: HttpClient
    ) { }

  uploadFiles(fileList){
    console.log(fileList);
    return this.http.post('http://localhost:8080/banner-timing-previewer/server/api/post_banner.php', fileList);
  }

}
