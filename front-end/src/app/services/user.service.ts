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

  login(email:String, password:String):Observable<User>
  {
    return this.http.post<LoginSuccess>("http://localhost:3000/auth/login",{email,password},{withCredentials:true})
    .pipe(
      map(res=>res.user)
    );
  }

  isLogin():Observable<User>
  {
    return this.http.get<LoginSuccess>("http://localhost:3000/auth/me",{withCredentials:true}).pipe(
      map(res=>res.user)
    );
  }
}