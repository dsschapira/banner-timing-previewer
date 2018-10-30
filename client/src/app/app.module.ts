import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { BannerService } from './services/banner/banner.service';
import { FileUploaderService } from './services/file-uploader/file-uploader.service';

import { BannerDataComponent } from './components/banner-data/banner-data.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';

const appRoutes: Routes = [
  { path: '', component: FileUploaderComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    BannerDataComponent,
    FileUploaderComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
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
