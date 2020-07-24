import { Injectable } from '@angular/core';
import { Proyecto } from '../models/proyecto';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private url: string = 'http://localhost:4000/projects'
  constructor(private http: HttpClient, private usuario:UsuarioService) { }
  publicarProyecto(proyecto:Proyecto){
    return this.http.post(this.url,{proyecto, company_id: this.usuario.empresa.company_id})
  }
  modificarProyecto(proyecto:Proyecto){
    return this.http.put(this.url,{proyecto})
  }
  
}
