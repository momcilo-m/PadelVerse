import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  http = inject(HttpClient)

  login(email:String, password:String):Observable<User>
  {
    console.log('Pozivam login sa:', email, password);
    return this.http.post<User>("http://localhost:3000/auth/login",{email,password},{withCredentials:true});
  }

}
