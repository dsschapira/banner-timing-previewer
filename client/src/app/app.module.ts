import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BannerService } from './services/banner.service';
import { BannerDataComponent } from './components/banner-data/banner-data.component';


@NgModule({
  declarations: [
    AppComponent,
    BannerDataComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ BannerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
