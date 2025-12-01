import { Injectable } from '@angular/core';
import { responseAgentDto } from '../dtos/agent/response-agent.dto';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  private currentUser : responseAgentDto | null = null;

  setCurrentUser(user: responseAgentDto){
    this.currentUser = user;
  }
  
  getCurrentUser() : any{
    return this.currentUser;
  }
}
