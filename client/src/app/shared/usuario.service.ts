import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import {} from '../models/tipo-perfil.enum'
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public miPerfil:Usuario = null
  constructor() {
    
  }
  // metodo que busca en bbdd info sobre otros usuarios
  getUserInfo(id:number):Usuario{
    // generar usuario
    return new Usuario(id, "usuario" + id, "https://picsum.photos/200", "empresa")
  }
  login(usuario:Usuario){
    this.miPerfil = usuario
  }
}
