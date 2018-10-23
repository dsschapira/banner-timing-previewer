import { Component, OnInit } from '@angular/core';
import { FileUploaderService } from '../../services/file-uploader/file-uploader.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  selectedFiles: Array<File> = [];

  bannerWidth: Number = 0;
  bannerHeight: Number = 0;
  bannerCode: String = ``;

  constructor( private fileUploader: FileUploaderService) { }

  ngOnInit(){}

  onFileSelected(event){
    for(let i=0; i < event.target.files.length; i++){
      this.selectedFiles.push(event.target.files.item(i));
    }

    this.updateBannerFrame();
  }

  updateBannerFrame(){
    this.selectedFiles.forEach(file => {

      if(file.type == 'text/html'){
        const fileReader = new FileReader();

        fileReader.onload = event => {
          this.resolveHTMLData(event.target.result);
        }

        fileReader.readAsText(file);
      }

    });
  }

  resolveHTMLData(htmlString){
    const start = htmlString.search(`<meta name="ad.size" content="`);
    const adBannerSize = htmlString.slice(start,htmlString.indexOf("\n",start)); // We have the meta ad.size tag

    // Need to get height and width regardless of which is first and any number of width/height digits
    // Set this height and width on the iframe
    this.bannerWidth = +adBannerSize.slice(adBannerSize.indexOf("=", adBannerSize.indexOf("width"))+1, adBannerSize.indexOf(','));
    if(typeof this.bannerWidth !== "number"){
      this.bannerWidth = +adBannerSize.slice(adBannerSize.indexOf("=", adBannerSize.indexOf("width"))+1, adBannerSize.indexOf('"', adBannerSize.indexOf("weight")));

    }
    this.bannerHeight = +adBannerSize.slice(adBannerSize.indexOf("=", adBannerSize.indexOf("height"))+1, adBannerSize.indexOf('"', adBannerSize.indexOf("height")));
    if(typeof this.bannerHeight !== "number"){
      this.bannerHeight = +adBannerSize.slice(adBannerSize.indexOf("=", adBannerSize.indexOf("height"))+1, adBannerSize.indexOf(','));
    }

    this.updateHTMLSources(htmlString);

  }

  updateHTMLSources(htmlString){
    // Need to update the style hrefs, the script src, and the image src attributes
  }

  onUpload(){
    this.fileUploader.uploadFiles(this.selectedFiles)
      .subscribe(res => { console.log(res); });
  }

}
