import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUserLocation, UpdateUserRequest, User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../root/services/local-storage.service';
import { BASE_URL } from '../../constants/api';

@Injectable()
export class UserService {

  constructor(protected http: HttpClient,
              private localStorageService: LocalStorageService) {
  }

  public getUserInformationList(): Observable<User> {
    const pageCountParams = this.localStorageService.get('pageCount');
    return this.getUser('page=' + pageCountParams);
  }

  private getUser(params): Observable<User> {
    return this.http.get<User>(`v1/user?perPage=50&${params}`);
  }

  public updateUserProfile(requestBody: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`${BASE_URL}/profile`, requestBody);
  }

  public updateUserLocation(requestBody: UpdateUserLocation): Observable<User> {
    return this.http.put<User>(`${BASE_URL}/location`, requestBody);
  }

  public addProfileIcon(fileToUpload: File, id: number): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post<void>(`${BASE_URL}/profile/image`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  }

  public deleteUserIcon(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/profile/image`);
  }
}
