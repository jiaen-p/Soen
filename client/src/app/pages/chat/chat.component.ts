import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../../shared/mensajes.service';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { ChatService } from '../../shared/chat.service';
import { Mensajes } from 'src/app/models/mensajes';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public conversaciones = null;
  public picture_url = [];
  // --------------------------------------
  public nombre_deseado = '';
  public conversacion = [];
  public conversacion_activo: number = null;
  public conversacion_usuario_seleccionado: number = null;
  public enviar_mensaje = '';
  public mensajes: Mensajes[][] = [];
  public antes_filtrar: Mensajes[][] = [];
  public conversaciones_copy = [];
  public nombre = '';

  constructor(public servicio_mensajeria: MensajesService, public usuario: UsuarioService,
              public chat: ChatService, private route: ActivatedRoute, private router: Router, public _location: Location) {  }

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
    if (this.enviar_mensaje){
      this.chat.sendMessage(this.enviar_mensaje, this.conversacion_activo)
      .subscribe(res => {
        this.getUpdate();
        this.enviar_mensaje = '';
      });
    }
  }

  borrarConversacion(){
    this.chat.deleteConversation(this.conversacion_activo)
    .then( res => {
      this.ngOnInit();
    })
    .catch(err => null);
  }

  ver_conversacion(data, conversacion){
    this.conversacion_activo = data;
    this.conversacion = this.chat.conversaciones[0].filter(conv => conv.conversation_id === data);
    this.nombre = this.getName(conversacion);
  }
  //
  getConversation(){
    let result = null;
    if ( this.chat.conversaciones[3].filter(conv => conv.conversation_id === this.conversacion_activo).length !== 0){
      result = this.chat.conversaciones[2].filter(conv => conv.conversation_id === this.conversacion_activo)[0];
    } else if (this.chat.conversaciones[2].filter(conv => conv.conversation_id === this.conversacion_activo).length !== 0){
      result = this.chat.conversaciones[3].filter(conv => conv.conversation_id === this.conversacion_activo)[0];
    }
    result ? result = result.name : null;
    return result;
  }

  getMessage(data){
    let res = null;
    const conv_id = data.conversation_id;
    const result = this.chat.conversaciones[0].filter(conv => conv.conversation_id === conv_id);
    if (result.length !== 0){
      res = result[0].message;
    }
    return res;
  }

  getDate(date){
    return new Date(date);
  }

  getDay(data): Date{
    let res = null;
    const conv_id = data.conversation_id;
    const result = this.chat.conversaciones[0].filter(conv => conv.conversation_id === conv_id);
    if (result.length !== 0){
      res = new Date(result[0].date);
    }
    return res;
  }

  getName(data): string{
    const user =  (data.sender === this.usuario.user_id ? data.receiver : data.sender);
    let response = null;
    if (this.chat.conversaciones[3].filter(conv => conv.user_id === user).length !== 0){
      response = this.chat.conversaciones[3].filter(conv => conv.user_id === user);
    }else if (this.chat.conversaciones[2].filter(conv => conv.user_id = user).length !== 0){
      response = this.chat.conversaciones[2].filter(conv => conv.user_id = user);
    }
    return response.filter(us => us.conversation_id === data.conversation_id)[0].name;
  }

  getProfile(data): string{
    const user =  (data.sender === this.usuario.user_id ? data.receiver : data.sender);
    let response =  null;
    if (this.chat.conversaciones[3].filter(conv => conv.user_id === user).length !== 0){
      response = this.chat.conversaciones[3].filter(conv => conv.user_id === user);
    } else if (this.chat.conversaciones[2].filter(conv => conv.user_id = user).length !== 0){
      response = this.chat.conversaciones[2].filter(conv => conv.user_id = user);
    }
    return response.filter(us => us.conversation_id === data.conversation_id)[0].profile_url;
  }

  getUpdate(){
    this.chat.getConversation(this.usuario.user_id).then(data => {
      this.chat.conversaciones = data;
      this.conversacion = this.chat.conversaciones[0].filter(conv => conv.conversation_id === this.conversacion_activo);
    })
    .catch(err => null);
  }

  ngOnInit(): void {
    // obtener datos de conversacion
    this.route.queryParams.subscribe(params => {
      const desired_conv_id = params.conversation_id;
      if (this.usuario.user_id){
        this.chat.getConversation(this.usuario.user_id).then(data => {
          this.chat.conversaciones = data;
          if (this.chat.conversaciones){
            desired_conv_id ? this.conversacion_activo = Number(desired_conv_id) : this.conversacion_activo = data[0][0].conversation_id;
            this.conversacion = this.chat.conversaciones[0].filter(conv => conv.conversation_id === this.conversacion_activo);
          }
        })
        .then(() => {
          this.ver_conversacion(this.conversacion_activo, this.chat.conversaciones[1][0]);
        })
        .catch(err => null);
      }
    });
    // quitar notificacion de mensaje
    this.usuario.miPerfil.new_message = null;
    this.chat.resetRead();
  }
}
