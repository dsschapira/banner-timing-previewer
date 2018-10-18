import { Component, OnInit } from '@angular/core';
import { FileUploaderService } from '../../services/file-uploader/file-uploader.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  selectedFiles: Array<File> = [];

  constructor( private fileUploader: FileUploaderService) { }

  ngOnInit(){}

  onFileSelected(event){
    for(let i=0; i < event.target.files.length; i++){
      this.selectedFiles.push(event.target.files.item(i));
    }
  }

  onUpload(){
    this.fileUploader.uploadFiles(this.selectedFiles)
      .subscribe(res => { console.log(res); });
  }

}
