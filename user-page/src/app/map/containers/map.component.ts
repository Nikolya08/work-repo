import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../models/user';
import { UserService } from '../../main/services/user.service';
import { AuthService } from '../../root/services/auth.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  public userGlobalInfo: UserInfo[] = [];
  public searchText: any = '';
  public lat = 50.520149;
  public lon = 30.238960;
  public selectedMarker: any;
  public alpha = 1;
  public markers: { lat: number, lon: number, alpha: number }[] = [];

  constructor(public userService: UserService,
              public authService: AuthService) {}

  public ngOnInit(): void {
    this.userService.getUserInformationList().subscribe( item => {
      this.userGlobalInfo  = item.result;
      this.userGlobalInfo.forEach(item => {
        if (item.lon !== null || item.lat !== null) {
          this.markers.push({lat: item.lat, lon: item.lon, alpha: this.alpha});
        }
      });
      const userEmail = this.authService.email;
      const profileInfo = this.userGlobalInfo.find(attribute => attribute.email === userEmail);
      this.lat = profileInfo.lat;
      this.lon = profileInfo.lon;
    });
  }

  public addMarker(lat: number, lon: number) {
    this.lat = lat;
    this.lon = lon;
    const requestBody = {lat: lat, lon: lon};
    this.userService.updateUserLocation(requestBody);
  }

  public selectMarker(event): void {
    const selectProfileInfo = this.userGlobalInfo.find(attribute => +attribute.lat === event.latitude);
    this.selectedMarker = {
      name: selectProfileInfo.firstName,
      img: selectProfileInfo.image
    };
  }
}
