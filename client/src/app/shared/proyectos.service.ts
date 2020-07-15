import { Injectable } from '@angular/core';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  public proyectos: Proyecto[] = []
  constructor() { 
    for(let i = 0; i < 7; i++){
      let proyect = new Proyecto()
      proyect = {
        "nombre": `nombre proyecto ${i + 1}`, 
        "empresa":`nombre empresa ${i + 2}`, 
        "capital_total": i * 8000 + 2, 
        "capital_restante":i * 2000,
        "descripcion":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod laoreet maximus. Vestibulum finibus turpis id lorem ultrices, ac commodo lacus feugiat. Pellentesque egestas purus ut accumsan dictum. Duis vehicula nisl consectetur lectus laoreet rhoncus. Praesent faucibus nisi id leo volutpat, id congue enim luctus. Nullam et elit nec dui accumsan tempor quis vitae leo. Nam blandit, turpis id malesuada elementum, urna elit fringilla sapien, quis gravida risus lorem eu eros. Suspendisse ut tincidunt nisl. Aenean vel neque a est fringilla tristique vel et tellus. Curabitur imperdiet odio pellentesque ante laoreet molestie. Aliquam congue ac augue vitae luctus. Nulla scelerisque eget eros nec ornare. Mauris vitae semper diam. Proin commodo erat scelerisque arcu suscipit, at pellentesque felis sollicitudin. Phasellus a.",
        "fecha_fin": new Date(),
        "img_url": "https://picsum.photos/400",
        "id": i,
        "sector":"fintech"
      }
      this.proyectos.push(proyect)

    }
  }
  getProyecto(ids:number){
    return this.proyectos.find( ({id}) => id === Number(ids))
  }
}
