import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../root/services/auth.service';
import { UserInfo } from '../../../models/user';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ROUTES_STRINGS } from '../../../constants/routing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  public profileInfo: any = [];
  public profileForm: FormGroup;
  public url: any;
  fileToUpload: File;

  constructor(public authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              public userService: UserService) {
  }

  public ngOnInit(): void {
    this.userService.getUserInformationList().subscribe( item => {
      const userInfo: UserInfo[]  = item.result;
      const userEmail = this.authService.email;
      this.profileInfo = userInfo.find(attribute => attribute.email === userEmail);
      this.url = this.profileInfo.image;
    });

    this.profileForm = this.formBuilder.group({
      firstName: [],
      lastName: [],
      gender: [],
      country: [],
      city: []
    });
  }

  public saveProfile(): void {
    const loginData = this.profileForm.getRawValue();
    this.profileForm.disable();
    this.userService.updateUserProfile(loginData).pipe(
      finalize(() => this.profileForm.enable())
    );
    this.router.navigate([ROUTES_STRINGS.LIST]);
  }

  onSelectFile(files: FileList) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.url = event.target.result;
    };
    this.userService.addProfileIcon(this.fileToUpload, this.profileInfo.id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  public deleteImage(): void {
    this.url = null;
    this.userService.deleteUserIcon(this.profileInfo.id);
  }
}
