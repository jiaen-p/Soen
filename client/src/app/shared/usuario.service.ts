import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Proyecto } from '../models/proyecto';
import { ProyectosService } from './proyectos.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Empresa } from '../models/empresa';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public miPerfil:Usuario = null
  private url:string = 'http://localhost:4000/user'
  public userinfo:User = new User()
  constructor(private proyectos: ProyectosService, private http: HttpClient) {
    
  }
  // metodo que busca en bbdd info sobre otros usuarios
  getUserInfo(id:number):Usuario{
    // generar usuario
    return new Usuario(id, "usuario" + id, "https://picsum.photos/200", "empresa")
  }
  login(user:User){
    return this.http.post(this.url, user)
  }
  registerInversor(user: User){
    // completar el request cuando esté la pagina de formulario
    return this.http.post(this.url+"/register/investor",{user: this.userinfo, investor: user})
  }

  registerEmpresa(empresa: Empresa){
    // completar el request cuando esté la pagina de formulario
    return this.http.post(this.url+"/register/company",{user: this.userinfo, company: empresa})
  }
  getProyectos():Proyecto[]{
    return this.proyectos.getProyectosUsuario(this.miPerfil.id)
  }
}
