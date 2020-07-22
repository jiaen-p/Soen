import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Proyecto } from '../models/proyecto';
import { ProyectosService } from './proyectos.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public miPerfil:Usuario = null
  public userinfo = null;
  constructor(private proyectos: ProyectosService) {
    
  }
  // metodo que busca en bbdd info sobre otros usuarios
  getUserInfo(id:number):Usuario{
    // generar usuario
    return new Usuario(id, "usuario" + id, "https://picsum.photos/200", "empresa")
  }
  login(usuario:Usuario){
    this.miPerfil = usuario
  }
  getProyectos():Proyecto[]{
    return //this.proyectos.getProyectosUsuario(this.miPerfil.id)
  }
}
