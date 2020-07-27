import { Injectable } from '@angular/core';
import { Proyecto } from '../models/proyecto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  
  public project_id: number;

  private url = "http://localhost:4000/projects"

  constructor(private http: HttpClient) { }

  // Proyectos
  getProyectos()
  {
    return this.http.get(this.url);
  }

  //Información proyecto por id proyecto
  getProyecto(id:Number)
  {
    return this.http.get(this.url + `/${id}`);
  }

  // Total de proyectos (información para el contador de la home)
  getTotalProjects()
  {
    return this.http.get(this.url + "/total");
  }

   // Total de dinero invertido en cada proyecto de la tabla proyectos
   getTotalInvested()
   {
     return this.http.get(this.url + "/totalinvested");
   }

  //Proyectos por id usuario
  getProyectoUser(id:Number)
  {
    return this.http.get(this.url + `/user/${id}`);
  }

  //Proyectos según filtros

  getFilter(sector:string, min:number, max:number, end_date:string)
  {
    const options =
    {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {sector: sector, min: min, max:max, end_date:end_date} 
    }
    return this.http.request('get', this.url + "/filters", options)
  }


}
