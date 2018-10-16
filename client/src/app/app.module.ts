import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';

import { BannerService } from './services/banner/banner.service';
import { FileUploaderService } from './services/file-uploader/file-uploader.service';

import { BannerDataComponent } from './components/banner-data/banner-data.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';


@NgModule({
  declarations: [
    AppComponent,
    BannerDataComponent,
    FileUploaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ 
    BannerService,
    FileUploaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
