import { Component, OnInit } from '@angular/core';
import { FileUploaderService } from '../../services/file-uploader/file-uploader.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  selectedFiles: FileList = null;

  constructor( private fileUploader: FileUploaderService) { }

  ngOnInit(){}

  onFileSelected(event){
    this.selectedFiles = event.target.files;
  }

  onUpload(){
    this.fileUploader.uploadFiles(this.selectedFiles)
      .subscribe(res => { console.log(res); });
  }

}
