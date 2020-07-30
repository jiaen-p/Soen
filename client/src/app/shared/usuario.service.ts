import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Proyecto } from '../models/proyecto';
import { ProyectosService } from './proyectos.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Empresa } from '../models/empresa';
import { Router } from '@angular/router';
import { Inversor } from '../models/inversor';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public miPerfil:User = new User()
  public user_id: number = null
  private url:string = 'http://localhost:4000/user'
  public userinfo = null
  public inversor = null
  public empresa = null
  public perfil_url = null
  constructor(private apiService: ProyectosService, private http: HttpClient, private router:Router) {
    
  }
  // metodo que busca en bbdd info sobre otros usuarios
  getUserInfo(id:number){

    return this.http.get(this.url + `/${id}`).toPromise()

  }
  login(user){
    return this.http.post(this.url + "/login", user).toPromise()
  }
  logout(){
    this.miPerfil = null
    this.perfil_url = null
    this.empresa = null
    this.inversor = null
    this.router.navigate(["/"])
  }
  registerInversor(user: Inversor){
    // completar el request cuando esté la pagina de formulario
    return this.http.post(this.url+"/register/investor",{user: this.userinfo, investor: user})
  }

  registerEmpresa(empresa: Empresa){
    // completar el request cuando esté la pagina de formulario
    return this.http.post(this.url+"/register/company",{user: this.userinfo, company: empresa})
  }
  /*
  getProyectos():Proyecto[]{
    return //this.proyectos.getProyectosUsuario(this.miPerfil.id)
  }
  */
}
