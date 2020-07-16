import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public miPerfil:Usuario 
  constructor() {
    this.miPerfil = new Usuario(50, "mi perfil", "")
  }
  // metodo que busca en bbdd info sobre otros usuarios
  getUserInfo(id:number):Usuario{
    // generar usuario
    return new Usuario(id, "usuario" + id, "https://picsum.photos/200")
  }
}
