import { Injectable } from '@angular/core';
import { Proyecto } from '../models/proyecto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

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
    return this.http.get(this.url + "/" + id);
  }

  //Proyectos por id usuario

  getProyectoUsuario(id:number)
  {
    return this.http.get(this.url + "/user/" + id);
  }

  // Proyecto favorito de un inversor
  getFav(id:number)
  {
    return this.http.get(this.url + "/investor/" + id);
  }

  postFav(id:number)
  {
    return this.http.get(this.url + "/favorites/" + id);
  }

  //Añadir proyecto
  postProyecto(project:Proyecto)
  {
    return this.http.post(this.url, project);
  }

  //Modificar proyecto
  putProyecto(project:Proyecto)
  {
    return this.http.put(this.url, project);
  }

  //Borrar proyecto
  deleteProyecto(project_id)
  {
    const option =
    {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {project_id: project_id}  
    }
    return this.http.request('delete', this.url, option);
  }


}
