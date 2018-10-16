import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BannerService {

  constructor(
    private http: HttpClient
  ) { }

  getBanners() {
    return this.http.get('http://localhost:8080/banner-timing-previewer/server/api/get_banner.php?id=1');
  }

}
