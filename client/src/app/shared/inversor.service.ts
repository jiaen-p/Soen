import { Injectable } from '@angular/core';
import { Inversor } from '../models/inversor';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class InversorService {
  private urlInversor = 'http://localhost:4000/inversor';
  private urlInvested =  'http://localhost:4000/projects/invested';
  private urlInvertido = 'http://localhost:4000/projects/investor';
  private urlFavoritos = 'http://localhost:4000/projects/favorites';
  private urlInversores = 'http://localhost:4000/inversores';

  constructor(private http: HttpClient, private usuario: UsuarioService) { }

  // Registro
  postInversor(inversor: Inversor){
    return this.http.post(this.urlInversor + '/', inversor);
  }
  // GET Invertir
  getProyectosInvertido(){
    return this.http.get(this.urlInvertido + '/' + this.usuario.inversor.investor_id);
  }

  // Total inversores
  getTotalInvestors()
  {
    return this.http.get(this.urlInversores + '/total');
  }

  // Agregar Invertir
  postProyectosInvertido(idProyecto: number){
    return this.http.post(this.urlInvested + '/', {projects_id: idProyecto, investor_id: this.usuario.inversor.investor_id});
  }
  // Borrar Invertir
  deleteProyectosInvertido(idProyecto: number){
    return this.http.request('delete', this.urlInvertido + '/', {body: {projects_id: idProyecto, investor_id: this.usuario.inversor.investor_id}});
  }
  // Get favoritos
  getProyectosFavoritos(){
    return this.http.get(this.urlFavoritos + '/' + this.usuario.inversor.investor_id);
  }

   // Agregar favoritos
  postProyectosFavoritos(idProyecto: number){
    return this.http.post(this.urlFavoritos + '/', {investor_id: this.usuario.inversor.investor_id, projects_id: idProyecto});
  }
  // Borrar favoritos
  deleteProyectosFavoritos( idProyecto: number){
    return this.http.request('delete', this.urlFavoritos + '/', {body: {investor_id: this.usuario.inversor.investor_id, projects_id: idProyecto}});
  }
}
