import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mensajes } from '../models/mensajes';
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url: string = 'http://localhost:4000/conversations'
  public conversaciones = null
  constructor(private http:HttpClient, public usuario: UsuarioService, private router:Router) { }
  getConversation(user_id: number){
    return this.http.get(this.url + `/${user_id}`).toPromise()
  }
  sendMessage(mensaje: string, conversation_id:number){
    let message = new Mensajes()
    message.mensaje = mensaje
    message.user_id = this.usuario.user_id
    return this.http.put(this.url, {mensaje: message, conversation_id: conversation_id})
  }
  deleteConversation(conversation_id: number){
    return this.http.request("delete",this.url, {body: {conversation_id: conversation_id}}).toPromise()
  }
  getProjectOwner(project_id: number){
    return this.http.post(this.url + "/project", {project_id: project_id}).toPromise()
  }
  getConversationId(user_id:number){
    return this.http.post(this.url + "/conv_id", {sender: this.usuario.user_id, receiver: user_id}).toPromise()
  }
  goToChat(project_id:number){
    this.getProjectOwner(project_id).then(res => {
        let project_owner = res['user_id']
      this.getConversationId(project_owner).then(conv_id => {
        this.router.navigate(['/chat'], {queryParams: {conversation_id: conv_id['conversation_id']}})
      })
    })
  }
  resetRead(){
    this.http.patch(this.url, {user_id: this.usuario.user_id}).toPromise().then().catch(err => null)
  }
}
