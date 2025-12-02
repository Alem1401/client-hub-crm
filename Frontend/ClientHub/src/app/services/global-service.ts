import { Injectable } from '@angular/core';
import { responseAgentDto } from '../dtos/agent/response-agent.dto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  private currentUser = new BehaviorSubject<responseAgentDto | null>(null);
  currentUser$ = this.currentUser.asObservable();

  setCurrentUser(user: responseAgentDto){
    this.currentUser.next(user);
  }
  
  //getCurrentUser() : any{
    //return this.currentUser;
  //}
}
