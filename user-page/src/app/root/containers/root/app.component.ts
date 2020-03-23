import { Component, OnInit } from '@angular/core';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ROUTES_STRINGS } from '../../../constants/routing';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  public ngOnInit(): void {
    let urlToRedirect: string;
    this.authService.isLoggedIn$.pipe(
      tap((isLoggedIn: boolean): void => {
        if (!isLoggedIn) {
          urlToRedirect = location.pathname === `/${ROUTES_STRINGS.LOGIN}` ? `/${ROUTES_STRINGS.MAIN}` : location.pathname;
          this.router.navigate([ROUTES_STRINGS.LOGIN]);
        }
      }),
      filter(result => result),
      switchMap(() => this.authService.fetchUserData())
    ).subscribe(() => this.router.navigateByUrl(urlToRedirect || `/${ROUTES_STRINGS.MAIN}`));
  }
}
