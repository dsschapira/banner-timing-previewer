import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable()
export class FileUploaderService {

  constructor( 
    private http: HttpClient
    ) { }

  uploadFiles(fileList){
    var formData: FormData = new FormData();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      })
    };
    fileList.forEach((file,index) => {
      formData.append('file-'+index, file, file.name);
    });
    return this.http.post('http://localhost:8080/banner-timing-previewer/server/api/post_banner.php', formData, httpOptions);
  }

}
