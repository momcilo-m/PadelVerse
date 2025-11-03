import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, filter, map, merge, Observable, share, tap } from 'rxjs';
import { MatchStatsInterface } from '../models/match.stats.interface';


interface MatchEventData {
  data: { event: string; team: number; id: number; stats: MatchStatsInterface };
  type: "EVENT";
}

interface ChatEventData {
  data: {id:number, user: string; message: string; time: Date };
  type: "CHAT";
}

type EventData = MatchEventData | ChatEventData;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private BASE = environment.apiUrl;
  public socket: any;

  constructor() { }


  connect(roomName: string) {
    if (!this.socket) {
      this.socket = io(this.BASE);

      console.log('Socket initialized');

      this.socket.on('connect', () => {
        console.log('Connected to server:', this.socket.id);
        this.joinRoom(roomName);
      });

      this.socket.on('connect_error', (err: any) => {
        console.error('Socket connection error:', err);
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinRoom(roomName: string) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('join-room', { room: +roomName });
      console.log(`Joined room: ${roomName}`);
    }
  }

  listenToMatchEvents(): Observable<EventData> {
    return new Observable<EventData>(observer => {
      const handler = (payload: { data: { event: string, team: number, id: number, stats: MatchStatsInterface } }) => {
        observer.next({ data: payload.data, type: "EVENT" });
      };

      this.socket.on('event', handler);

      return () => this.socket.off('event', handler);
    });
  }

  listenToChatEvents(): Observable<ChatEventData> {
    return new Observable<ChatEventData>(observer => {
      const handler = (payload: { data: { id:number,user: string; message: string; time: Date } }) => {
        observer.next({
          type: "CHAT",
          data: {
            id:payload.data.id,
            user: payload.data.user,
            message: payload.data.message,
            time: payload.data.time
          }
        });
      };

      this.socket.on('chat', handler);

      return () => this.socket.off('chat', handler);
    });
  }
  getAllEvents(): Observable<EventData> {
    return merge(this.listenToMatchEvents(), this.listenToChatEvents());
  }
}