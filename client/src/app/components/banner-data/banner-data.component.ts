import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../services/banner/banner.service';

@Component({
  selector: 'app-banner-data',
  templateUrl: './banner-data.component.html',
  styleUrls: ['./banner-data.component.css']
})
export class BannerDataComponent implements OnInit {

  banner: any;

  constructor( private bannerService: BannerService) { }

  ngOnInit() {
    this.showBanners();
  }

  showBanners(): void {
    this.bannerService.getBanners()
      .subscribe(banner => this.banner = JSON.parse(banner['data'])['test']);
  }

}
