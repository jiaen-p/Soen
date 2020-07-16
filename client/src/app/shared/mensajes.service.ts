import { Injectable } from '@angular/core';
import { Mensajes } from '../models/mensajes';
import { UsuarioService } from "../shared/usuario.service"
import {Usuario} from "../models/usuario"

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  public mensajes: Mensajes[][] = []
  constructor(private usuario:UsuarioService) { 
    this.mensajes = this.getMensajes(50)
  }

  getMensajes(id:number):Mensajes[][]{
    // buscar en bbdd los mensajes asociados al id como destinatario/origen
    let mensajes:Mensajes[][] = []
    for (let i = 0; i < 9;i = i + 3){
      let mensajes2: Mensajes[] = []
      mensajes2.unshift(new Mensajes(i,i + 10, id, 'receiver ' + i, new Date()))
      mensajes2.unshift(new Mensajes(i+1,id, i + 10, 'sender ' + (i + 1), new Date()))
      mensajes2.unshift(new Mensajes(i+2,i + 10, id, 'receiver ' + (i + 2), new Date()))
      mensajes.push(mensajes2)
    }
    return mensajes
  }
  getInfoUser(id:number):Usuario{
    return this.usuario.getUserInfo(id)
  }

  enviarMensaje(mensaje: Mensajes, index: number){
    this.mensajes[index].unshift(mensaje)
  }

  borrarConversacion(index:number){
    this.mensajes.splice(index,1)
  }
}
