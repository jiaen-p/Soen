import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mensajes } from '../models/mensajes';
import { Conversacion } from '../models/conversacion';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url: string = 'http://localhost:4000/conversation'
  public conversaciones: Conversacion = null
  constructor(private http:HttpClient) { }
  getConversation(user_id: number){
    return this.http.get(this.url + `s/${user_id}`)
  }
  sendMessage(mensaje: Mensajes, conversation_id:number){
    return this.http.put(this.url, {mensaje: mensaje, conversation_id: conversation_id})
  }
}
