import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { registerAgentDto } from '../dtos/agent/register-agent.dto';
import { loginAgentDto } from '../dtos/agent/login-agent.dto';
import { responseAgentDto } from '../dtos/agent/response-agent.dto';
import { GlobalService } from './global-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  http = inject(HttpClient);
  globalService = inject(GlobalService);

 userExists(email: string) {
  const encodedEmail = encodeURIComponent(email);
  return this.http.get<boolean>(`${this.globalService.apiUrl}/Agent/${encodedEmail}`);
}

registerUser(user : registerAgentDto){
  return this.http.post(`${this.globalService.apiUrl}/Agent`,user);
}

loginUser(user : loginAgentDto){
  return this.http.post<responseAgentDto>(`${this.globalService.apiUrl}/Agent/login`,user)
}
}
