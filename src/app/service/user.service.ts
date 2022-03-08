import { environment } from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpEvent} from "@angular/common/http";
import { User } from "../model/user"
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import {CustomHttpResponse} from "../model/custom-http-response";

@Injectable({providedIn: 'root'})
export class UserService {
  private host: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

  public resetPassword(email: string): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.get<CustomHttpResponse>(`${this.host}/user/reset-password/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<any> | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/update/profileImage`, formData,
      {
        reportProgress: true,
        observe: "events"
      });
  }

  public deleteUser(userId: number): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${userId}`);
  }

  public addUserToLocalCache(users: User[]): void {
      localStorage.setItem('users', JSON.stringify(users));
  }

  public getUserFromLocalStorage(): User[] {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users'));
    }
    return null;
  }

  public createUserFormData(loggedInUsername: string, user: User, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.isActive));
    formData.append('isNonLocked', JSON.stringify(user.isNotLocked));

    return formData;
  }

}
