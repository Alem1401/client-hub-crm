import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { createUpdateClientDto } from '../dtos/client/create-update-client.dto';
import { ResponseClientDto } from '../dtos/client/response-client.dto';
import { GlobalService } from './global-service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  http = inject(HttpClient)
  globalService = inject(GlobalService)


  getClientsByAgentId(id : number){
    return this.http.get<ResponseClientDto[]>(`${this.globalService.apiUrl}/Client/agent/${id}`)
  }

  addClient(client : createUpdateClientDto){
    return this.http.post(`${this.globalService.apiUrl}/Client`,client)
  }
  
  getClientById(id : number){
    return this.http.get<ResponseClientDto>(`${this.globalService.apiUrl}/Client/${id}`)
  }

  deleteClient(id : number){
   return this.http.delete(`${this.globalService.apiUrl}/Client/${id}`)
  }

  updateClient(client : createUpdateClientDto,id : number){
    return this.http.put(`${this.globalService.apiUrl}/Client/${id}`,client)
  }

  searchClients(name : string,id : number){
    return this.http.get(`${this.globalService.apiUrl}/Client/search/${id}?fullName=${name}`)
  }

  getClientCount(agentId : number){
    return this.http.get<Number>(`${this.globalService.apiUrl}/Client/count/${agentId}`)
  }
}
