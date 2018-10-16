import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';

import { BannerService } from './services/banner.service';
import { BannerDataComponent } from './components/banner-data/banner-data.component';


@NgModule({
  declarations: [
    AppComponent,
    BannerDataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ BannerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
