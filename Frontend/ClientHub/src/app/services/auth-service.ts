import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { registerAgentDto } from '../dtos/agent/register-agent.dto';
import { loginAgentDto } from '../dtos/agent/login-agent.dto';
import { responseAgentDto } from '../dtos/agent/response-agent.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  http = inject(HttpClient);

 userExists(email: string) {
  const encodedEmail = encodeURIComponent(email);
  return this.http.get<boolean>(`https://localhost:57197/api/Agent/${encodedEmail}`);
}

registerUser(user : registerAgentDto){
  return this.http.post(`https://localhost:57197/api/Agent`,user);
}

loginUser(user : loginAgentDto){
  return this.http.post<responseAgentDto>(`https://localhost:57197/api/Agent/login`,user)
}
}
