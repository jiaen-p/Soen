import { Injectable } from '@angular/core';
import { Inversor } from '../models/inversor'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InversorService {
  private urlInversor = "http://localhost:4200/inversor"
  private urlInteres = "http://localhost:4200/interes"
  constructor(private http: HttpClient) { }

  //Registro
  postInversor(inversor: Inversor){
    return this.http.post(this.urlInversor + "/", inversor);
  }

  // Agregar Favoritos
  postProyectosInteres(idInversor: number, idProyecto: number){
    console.log(idInversor)
    console.log(idProyecto)    
    return 
  }
  //Borrar fovoritos 
  deleteProyectosInteres(idInversor:number, idProyecto: number){
    console.log(idInversor)
    console.log(idProyecto)    
    return
  }
  
}
