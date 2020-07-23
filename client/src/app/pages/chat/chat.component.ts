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
  public conversaciones = null
  public picture_url = []
  // --------------------------------------
  public nombre_deseado:string = ''
  public conversacion = []
  public conversacion_activo: number = 0
  public conversacion_usuario_seleccionado: number = null
  public enviar_mensaje: string = ''
  public mensajes: Mensajes[][] = []
  public antes_filtrar: Mensajes[][] = []

  constructor(public servicio_mensajeria: MensajesService, public usuario: UsuarioService, public chat:ChatService) {
    Object.assign(this.mensajes, servicio_mensajeria.mensajes)
    Object.assign(this.antes_filtrar, servicio_mensajeria.mensajes)
  }

  filtrar_chat(){
    // this.mensajes = this.antes_filtrar
    // let res = []
    // if(this.nombre_deseado){
    //   this.mensajes.forEach((mensaje, i) => {
    //     if (this.usuario.getUserInfo(this.id_otro_usuario(i)).username.includes(this.nombre_deseado)){
    //       res.unshift(mensaje)
    //     }
    //   })
    //   this.mensajes = res
    // } else {
    //   this.mensajes = this.antes_filtrar
    // }
  }

  
  enviarMensaje(){
    if(this.enviar_mensaje){
      this.chat.sendMessage(this.enviar_mensaje, this.conversacion_activo)
      .subscribe(res => {
        console.log(res)
        this.getUpdate()
        this.enviar_mensaje = ''
      })
    }
  }
  
  borrarConversacion(){
    this.chat.deleteConversation(this.conversacion_activo).subscribe( res => {
      this.ngOnInit()
    })
  }
  
  ver_conversacion(data){
    this.conversacion_activo = data 
    this.conversacion = this.chat.conversaciones[0].filter(conv => conv.conversation_id === data)
  }
  // 
  getConversation(){
    let result = this.chat.conversaciones[3].filter(conv => conv.conversation_id === this.conversacion_activo) || this.chat.conversaciones[2].filter(conv => conv.conversation_id === this.conversacion_activo)
    return result[0].name
  }

  getMessage(data){
    let conv_id = data.conversation_id
    let result = this.chat.conversaciones[0].filter(conv => conv.conversation_id === conv_id)
    return result[0].message
  }

  getDate(date){
    return new Date(date)
  }

  getDay(data):Date{
    let conv_id = data.conversation_id
    let result = this.chat.conversaciones[0].filter(conv => conv.conversation_id === conv_id)
    return new Date(result[0].date)
  }

  getName(data):string{
    let user =  (data.sender === this.usuario.user_id ? data.receiver : data.sender)
    let response =  this.chat.conversaciones[3].filter(conv => conv.user_id === user) || this.chat.conversaciones[2].filter(conv => conv.user_id = user)
    return response[0].name
  }

  getProfile(data):string{
    let user =  (data.sender === this.usuario.user_id ? data.receiver : data.sender)
    let response =  this.chat.conversaciones[3].filter(conv => conv.user_id === user) || this.chat.conversaciones[2].filter(conv => conv.user_id = user)
    return response[0].profile_url
  }

  getUpdate(){
    this.chat.getConversation(this.usuario.user_id).subscribe(data => {
      this.chat.conversaciones = data
      this.conversacion = this.chat.conversaciones[0].filter(conv => conv.conversation_id === this.conversacion_activo)
    })
  }

  ngOnInit(): void {
    // obtener datos de conversacion
    if(this.usuario.user_id){
      this.chat.getConversation(this.usuario.user_id).subscribe(data => {
        this.chat.conversaciones = data
        this.conversacion_activo = data[0][0].conversation_id
        this.conversacion = this.chat.conversaciones[0].filter(conv => conv.conversation_id === this.conversacion_activo)
      })
    }
    // this.conversacion_usuario_seleccionado = this.mensajes[this.conversacion_activo][0].sender === this.usuario.miPerfil.id ? this.mensajes[this.conversacion_activo][0].receiver : this.mensajes[this.conversacion_activo][0].sender
  }
  private id_otro_usuario(index:number):number{
    return // this.chat.conversaciones[1][index].sender === this.usuario.user_id ? this.chat.conversaciones[1][index].receiver : this.chat.conversaciones[1][index].sender
  }
}
