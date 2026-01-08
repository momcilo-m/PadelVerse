import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { matchStats, matchStatsSuccess, selectMatch } from '../../store/actions/match.action';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';
import { addEvent, loadEvetns } from '../../store/actions/events.action';
import { selectedMatch, selectStats } from '../../store/selectors/match.selector';
import { AsyncPipe, CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { selectEvents } from '../../store/selectors/event.selector';
import { selectChat } from '../../store/selectors/chat.selector';
import { addMessage, loadChat, sendMessage } from '../../store/actions/chat.action';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { selectUser } from '../../store/selectors/user.selector';

@Component({
  selector: 'app-match',
  imports: [AsyncPipe, CommonModule,MatIcon,FormsModule],
  templateUrl: './match.html',
  styleUrl: './match.scss',
})
export class Match {

  private eventsSub?: Subscription;
  private id: string = "";

  message:string = "";
  disabledBtn:boolean = false;
  
  base = environment.apiUrl+'/photo/';
  
  store = inject<Store<AppState>>(Store)


  selectedMatch$ = this.store.select(selectedMatch);
  stats$ = this.store.select(selectStats);
  events$ = this.store.select(selectEvents);
  chat$ = this.store.select(selectChat)
  user$ = this.store.select(selectUser).subscribe((user)=>user?.id ? this.disabledBtn = false : this.disabledBtn = true)


  @ViewChild('chatContainer') private chatContainer!: ElementRef;


  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService
  ) { }


  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || "";
    this.store.dispatch(selectMatch({ id: +this.id }))

    this.socketService.connect(this.id);
    this.store.dispatch(loadEvetns({ id: +this.id }))

    this.store.dispatch(loadChat({id:+this.id}))

    // this.eventsSub = this.socketService.getAllEvents().subscribe(event => {

    //   if (event.type === "EVENT") {
    //     const { stats, ...cleanData } = event.data;
    //     this.store.dispatch(addEvent({ event: cleanData }));
    //     this.store.dispatch(matchStatsSuccess({ stats }))
    //   }
    //   else if (event.type === "CHAT") {
    //     this.store.dispatch(addMessage({message:event.data}))
    //   }
    // });

    this.eventsSub = this.socketService.listenToAllEvents().subscribe(action => this.store.dispatch(action));
  }



  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  getTime(time: string): string {
    const date = new Date(time);
    const hh = date.getHours().toString().padStart(2, '0');
    const mm = date.getMinutes().toString().padStart(2, '0');
    return `${hh}:${mm}`;
  }

  sendMessage()
  {
    if(this.message === "")
      return;

    this.store.dispatch(sendMessage({message:this.message,id:+this.id}))

    this.message = "";
  }

  private scrollToBottom(): void {
    const container = this.chatContainer?.nativeElement;
    if(container){
      container.scrollTop = container.scrollHeight;
    }
  }
  
}
