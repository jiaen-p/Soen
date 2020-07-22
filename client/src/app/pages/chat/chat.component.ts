import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../../shared/mensajes.service'
import { UsuarioService } from 'src/app/shared/usuario.service'
import { ChatService } from '../../shared/chat.service'
import { Chat } from '../../models/chat'
import { Mensajes } from 'src/app/models/mensajes';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public conversaciones: Chat = null
  // --------------------------------------
  public nombre_deseado:string = ''
  public conversacion: Mensajes[] = []
  public conversacion_activo: number = 0
  public conversacion_usuario_seleccionado: number = null
  public enviar_mensaje: string = ''
  public mensajes: Mensajes[][] = []
  public antes_filtrar: Mensajes[][] = []

  constructor(public servicio_mensajeria: MensajesService, public usuario: UsuarioService, private chat:ChatService) {
    Object.assign(this.mensajes, servicio_mensajeria.mensajes)
    Object.assign(this.antes_filtrar, servicio_mensajeria.mensajes)
  }

  filtrar_chat(){
    this.mensajes = this.antes_filtrar
    let res = []
    if(this.nombre_deseado){
      this.mensajes.forEach((mensaje, i) => {
        if (this.usuario.getUserInfo(this.id_otro_usuario(i)).username.includes(this.nombre_deseado)){
          res.unshift(mensaje)
        }
      })
      this.mensajes = res
    } else {
      this.mensajes = this.antes_filtrar
    }
  }

  ver_conversacion(index: number){
    this.conversacion_activo = index  
  }

  enviarMensaje(){
    if(this.enviar_mensaje){
      // this.servicio_mensajeria.enviarMensaje()
      this.enviar_mensaje = ''
    }
  }

  borrarConversacion(){
    this.servicio_mensajeria.borrarConversacion(this.conversacion_activo)
    this.mensajes = this.servicio_mensajeria.mensajes
  }
// 
  ngOnInit(): void {
    // obtener datos de conversacion
    console.log(this.usuario.user_id)
    this.chat.getConversation(this.usuario.user_id).subscribe(data => {
      console.log(data)
    })
    // this.conversacion_usuario_seleccionado = this.mensajes[this.conversacion_activo][0].sender === this.usuario.miPerfil.id ? this.mensajes[this.conversacion_activo][0].receiver : this.mensajes[this.conversacion_activo][0].sender
  }

  private id_otro_usuario(index:number):number{
    // return this.mensajes[index][0].sender === this.usuario.miPerfil.id ? this.mensajes[index][0].receiver : this.mensajes[index][0].sender
    return null
  }
}
