import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { MessageInterface } from '../models/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient)

  private BASE = environment.apiUrl;

  getChat(id:number):Observable<MessageInterface[]>
  {
    return this.http.get<MessageInterface[]>(`${this.BASE}/chat/${id}`)
  }

  sendMessage(message:string,id:number):Observable<MessageInterface>
  {
    return this.http.post<MessageInterface>(`${this.BASE}/chat/${id}`,{message},{withCredentials:true});
  }

}
