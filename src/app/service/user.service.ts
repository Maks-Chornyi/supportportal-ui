import { environment } from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpEvent} from "@angular/common/http";
import { User } from "../model/user"
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
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

  public resetPassword(email: string): Observable<any | HttpErrorResponse> {
    return this.http.get<User>(`${this.host}/user/reset-password/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<any> | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/update/profileImage`, formData,
      {
        reportProgress: true,
        observe: "events"
      });
  }

  public deleteUser(userId: number): Observable<any | HttpErrorResponse> {
    return this.http.delete<User>(`${this.host}/user/delete/${userId}`);
  }
}
