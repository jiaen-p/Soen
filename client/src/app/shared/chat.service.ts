import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mensajes } from '../models/mensajes';
import { Conversacion } from '../models/conversacion';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url: string = 'http://localhost:4000/conversations'
  public conversaciones = null
  constructor(private http:HttpClient, public usuario: UsuarioService) { }
  getConversation(user_id: number){
    return this.http.get(this.url + `/${user_id}`)
  }
  sendMessage(mensaje: string, conversation_id:number){
    let message = new Mensajes()
    message.mensaje = mensaje
    message.user_id = this.usuario.user_id
    return this.http.put(this.url, {mensaje: message, conversation_id: conversation_id})
  }
  deleteConversation(conversation_id: number){
    return this.http.request("delete",this.url, {body: {conversation_id: conversation_id}})
  }
}
