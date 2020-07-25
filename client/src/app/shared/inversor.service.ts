import { Injectable } from '@angular/core';
import { Inversor } from '../models/inversor'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InversorService {
  private urlInversor = "http://localhost:4000/inversor"
  private urlInvertido = "http://localhost:4000/projects/invested"
  private urlFavoritos = "http://localhost:4000/projects/favorites/:id"
  constructor(private http: HttpClient) { }

  //Registro
  postInversor(inversor: Inversor){
    return this.http.post(this.urlInversor + "/", inversor);
  }

  // Agregar Invertir
  postProyectosInvertido(idInversor: number, idProyecto: number){ 
    return this.http.post(this.urlInvertido + "/", {"projects_id": idProyecto, "investor_id": idInversor});
  }
  //Borrar Invertir
  deleteProyectosInvertido(idInversor:number, idProyecto: number){
    return this.http.request("delete", this.urlInvertido + "/", {body:{"projects_id": idProyecto, "investor_id": idInversor}});
  }
  
   // Agregar favoritos
   postProyectosFavoritos(idInversor: number, idProyecto: number){ 
    return this.http.post(this.urlFavoritos + "/", {"projects_id": idProyecto, "investor_id": idInversor});
  }
  //Borrar favoritos
  deleteProyectosFavoritos(idInversor:number, idProyecto: number){
    return this.http.request("delete", this.urlFavoritos + "/", {body:{"projects_id": idProyecto, "investor_id": idInversor}});
  }
}
