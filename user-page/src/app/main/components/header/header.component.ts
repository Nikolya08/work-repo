import { ROUTES_STRINGS } from '../../../constants/routing';
import { User } from '../../../models/user';
import { AuthService } from '../../../root/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public URLS = ROUTES_STRINGS;
  public user: User;

  constructor(private authService: AuthService,
              private router: Router) {}

  public ngOnInit(): void {
  }

  public logout() {
    this.authService.logout();
  }

  profile() {
    this.router.navigate([ROUTES_STRINGS.PROFILE]);
  }

}
