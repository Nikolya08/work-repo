import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../../models/user';
import { UserService } from '../../../main/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  public userGlobalInfo: UserInfo[] = [];
  public searchText: any = '';

  constructor(public userService: UserService) {}

  public ngOnInit(): void {
    this.userService.getUserInformationList().subscribe( item => {
      this.userGlobalInfo  = item.result;
    });
  }

}
