import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  http = inject(HttpClient);

 userExists(email: string) {
  const encodedEmail = encodeURIComponent(email);
  return this.http.get(`https://localhost:58878/api/Agent/${encodedEmail}`);
}

}
