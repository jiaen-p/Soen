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
    return null
  }
  getInfoUser(id:number):Usuario{
    return null
  }

  enviarMensaje(mensaje: Mensajes, index: number){
    this.mensajes[index].unshift(mensaje)
  }

  borrarConversacion(index:number){
    this.mensajes.splice(index,1)
  }
}
