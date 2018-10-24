import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FileUploaderService } from '../../services/file-uploader/file-uploader.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  selectedFiles: Array<File> = [];
  htmlStringArr: Array<String> = [];

  bannerWidth: Number = 0;
  bannerHeight: Number = 0;
  bannerCode: SafeHtml = ``;

  constructor( private fileUploader: FileUploaderService,
               private sanitizer: DomSanitizer) { }

  ngOnInit(){}

  onFileSelected(event){
    this.bannerWidth, this.bannerHeight = 0; // reset to 0 for when we have re-upload;
    this.bannerCode = ``;
    this.selectedFiles = [];

    for(let i=0; i < event.target.files.length; i++){
      this.selectedFiles.push(event.target.files.item(i));
    }
    // Flow is updateBannerFrame -> resolveHTMLData -> updateHTMLSources -> resolveCSS -> bindHTMLToFrame
    this.updateBannerFrame();
  }

  updateBannerFrame(){
    this.selectedFiles.forEach(file => {

      if(file.type == 'text/html'){
        const fileReader = new FileReader();

        fileReader.onload = (event: any) => {
          this.resolveHTMLData(event.target.result);
        }

        fileReader.readAsText(file);
      }

    });
  }

  resolveHTMLData(htmlString){
    const start: number = htmlString.search(`<meta name="ad.size" content="`);
    const adBannerSize: String = htmlString.slice(start,htmlString.indexOf("\n",start)); // We have the meta ad.size tag

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
    this.htmlStringArr = htmlString.split("\n");
    this.htmlStringArr.forEach( (tag, index) => {
      if(tag.indexOf('.css') >= 0 || tag.indexOf('.js') >= 0 || tag.indexOf('.png') >=0 || tag.indexOf('.jpg') >= 0){
        // There is a css, js, png, or jpg file
        // Replace JS file locations
        if(tag.indexOf('.js') >= 0) {
          const jsStart = tag.indexOf('src="')+'src="'.length;
          const jsEnd = tag.indexOf('.js"')+'.js"'.length - 1;
          const jsFileName = tag.slice(jsStart, jsEnd);

          this.selectedFiles.forEach(file => {
            if(file.type == "text/javascript" && file.name == jsFileName){
              tag = tag.replace(jsFileName, URL.createObjectURL(file));
              this.htmlStringArr[index] = tag;
            }
          });
        }
        // Replace images
        else if(tag.indexOf('.png') >= 0 || tag.indexOf('.img') >= 0) {
          const imgStart = tag.indexOf('src="')+'src="'.length;
          const imgEnd = (tag.indexOf('.png"')+'.png"'.length - 1) >= 0 ? 
                          tag.indexOf('.png"')+'.png"'.length - 1 :
                          tag.indexOf('.jpg"')+'.jpg"'.length - 1;
          const imgFileName = tag.slice(imgStart, imgEnd);

          this.selectedFiles.forEach(file => {
            if((file.type == "image/png" || file.type == "image/jpg") && file.name == imgFileName){
              tag = tag.replace(imgFileName, URL.createObjectURL(file));
              this.htmlStringArr[index] = tag;
            }
          });
        }
        // Replace CSS tag with style tags
        if(tag.indexOf('.css') >= 0){
          const cssStart = tag.indexOf('href="')+'href="'.length;
          const cssEnd = tag.indexOf('.css"')+'.css"'.length - 1; 
          const cssFileName = tag.slice(cssStart, cssEnd);

          this.selectedFiles.forEach(file => {
            if(file.type == "text/css"  && file.name == cssFileName){
              this.resolveCSS(file, index);
            }
          });
        }
      }
    });
  }

  resolveCSS(cssFile, index){
    let cssReturnString = ``; //Build the CSS here
    const cssFileReader = new FileReader();

    cssFileReader.onload = (event: any) => {
      const cssFileString = event.target.result;
      let start: number = 0;
      let endOfFile: Boolean = false;
      let loops = 0; // this is just here to stop infinite loops

      let fileNameEnd: number; //need this to exist outside the while loop to close off the iframe's style tag

      while (!endOfFile && loops < 2000){
        if(cssFileString.indexOf('url(',start) < 0) {
          endOfFile = true; //Got to the last url included file
        } 
        else {
          let fileNameStart: number = cssFileString.indexOf('url(', start)+'url('.length;
          fileNameEnd = cssFileString.indexOf(');', fileNameStart);
          let fileName: String = cssFileString.slice(fileNameStart, fileNameEnd); // Filename will include ' or " marks around file name
          fileName = fileName.slice(1, fileName.length-1); // Removed quote marks

          this.selectedFiles.forEach(file => {
            if((file.type == "image/png" || file.type == "image/jpeg") && file.name == fileName){
              fileNameStart = cssFileString.indexOf('url(', start)+'url('.length;
              fileNameEnd = cssFileString.indexOf(');', fileNameStart);

              cssReturnString += cssFileString.slice(start, fileNameStart)+ '\'' + URL.createObjectURL(file) + '\''; // Replace file with temp location
              start = fileNameEnd; // Update the start position for the next loop iteration
              return;
            }
          });

          loops++; // break out of infinite loop
        }
      }
      cssReturnString += cssFileString.slice(fileNameEnd, cssFileString.length); // Get the rest of the styles after the last image and add to style string
      this.htmlStringArr[index] = '<style>\n'+cssReturnString+'\n</style>';
      this.bindHTMLToFrame();
    }

    cssFileReader.readAsText(cssFile);
  }

  bindHTMLToFrame(){;
    this.bannerCode = this.sanitizer.bypassSecurityTrustHtml(this.htmlStringArr.join("\n"));
  }

  onUpload(){
    this.fileUploader.uploadFiles(this.selectedFiles)
      .subscribe(res => { console.log(res); });
  }

}
