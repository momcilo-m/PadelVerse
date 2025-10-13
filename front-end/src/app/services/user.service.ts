import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { LoginSuccess } from '../models/login.success';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient)

  login(email: String, password: String): Observable<User> {
    return this.http.post<LoginSuccess>("http://localhost:3000/auth/login", { email, password }, { withCredentials: true })
      .pipe(
        map(res => res.user)
      );
  }

  isLogin(): Observable<User> {
    return this.http.get<LoginSuccess>("http://localhost:3000/auth/me", { withCredentials: true }).pipe(
      map(res => res.user)
    );
  }

  updateProfile(email?: string, phone?: string, first_name?: string, last_name?: string): Observable<User> {

    let body: { [key: string]: string } = {};

    if (email) body["email"] = email;
    if (phone) body["phone"] = phone;
    if (first_name) body["first_name"] = first_name;
    if (last_name) body["last_name"] = last_name;

    return this.http.patch<User>("http://localhost:3000/profile", body, { withCredentials: true })
  }

  updateProfileImage(file: File): Observable<{ path: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ path: string }>("http://localhost:3000/profile/photo", formData, { withCredentials: true });
  }

  register(user: UserRegisterInterface) {
    return this.http.post<{ message: string }>("http://localhost:3000/auth/register", user)
  }

  confirmRegistration(token: string) {
    return this.http.get<{ message: string }>(`http://localhost:3000/auth/confirmRegistration/${token}`)
  }
}