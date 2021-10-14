import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post('http://localhost/api/auth/login', credentials).pipe(
      tap((response) => {
        if(response?.data?.token) {
          localStorage.setItem('token', response?.data?.token);
          localStorage.setItem('userId', response?.data?.userId);
        }
    }));
  }
}
