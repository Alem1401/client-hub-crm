import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { createUpdateClientDto } from '../dtos/client/create-update-client.dto';
import { ResponseClientDto } from '../dtos/client/response-client.dto';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  http = inject(HttpClient)


  getClientsByAgentId(id : number){
    return this.http.get<ResponseClientDto[]>(`https://localhost:57197/api/Client/agent/${id}`)
  }

  addClient(client : createUpdateClientDto){
    return this.http.post(`https://localhost:57197/api/Client`,client)
  }
  
  getClientById(id : number){
    return this.http.get<ResponseClientDto>(`https://localhost:57197/api/Client/${id}`)
  }

  deleteClient(id : number){
   return this.http.delete(`https://localhost:57197/api/Client/${id}`)
  }

  updateClient(client : createUpdateClientDto,id : number){
    return this.http.put(`https://localhost:57197/api/Client/${id}`,client)
  }

  searchClients(name : string,id : number){
    return this.http.get(`https://localhost:57197/api/Client/search/${id}?fullName=${name}`)
  }
}
