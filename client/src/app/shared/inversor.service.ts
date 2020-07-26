import { Injectable } from '@angular/core';
import { Inversor } from '../models/inversor'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InversorService {
  private urlInversor = "http://localhost:4000/inversor"
  private urlInvested =  "http://localhost:4000/projects/invested"
  private urlInvertido = "http://localhost:4000/projects/investor"
  private urlFavoritos = "http://localhost:4000/projects/favorites"
  
  constructor(private http: HttpClient) { }

  //Registro
  postInversor(inversor: Inversor){
    return this.http.post(this.urlInversor + "/", inversor);
  }
  //GET Invertir
  getProyectosInvertido(idInversor:number){
    return this.http.get(this.urlInvertido + "/" + idInversor)
  }

  // Agregar Invertir
  postProyectosInvertido(idInversor: number, idProyecto: number){ 
    return this.http.post(this.urlInvested + "/", {"projects_id": idProyecto, "investor_id": idInversor});
  }
  //Borrar Invertir
  deleteProyectosInvertido(idInversor:number, idProyecto: number){
    return this.http.request("delete", this.urlInvertido + "/", {body:{"projects_id": idProyecto, "investor_id": idInversor}});
  }
  //Get favoritos
  getProyectosFavoritos(idInversor:number){
    return this.http.get(this.urlFavoritos + "/" + idInversor)
  }
  
   // Agregar favoritos
   postProyectosFavoritos(idInversor: number, idProyecto: number){ 
     console.log(idInversor)
    return this.http.post(this.urlFavoritos + "/", {"investor_id": idInversor, "projects_id": idProyecto});
  }
  //Borrar favoritos
  deleteProyectosFavoritos(idInversor:number, idProyecto: number){
    return this.http.request("delete", this.urlFavoritos + "/", {body:{"investor_id": idInversor, "projects_id": idProyecto}});
  }
}
