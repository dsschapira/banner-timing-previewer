import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FileUploaderService {

  constructor( 
    private http: HttpClient
    ) { }

  uploadFiles(fileList){
    const fd = new FormData();
    console.log('got to the service');
    console.log(fileList);
    //this.http.post('http://localhost:8080/banner-timing-previewer/server/api/upload_files.php');
  }

}
