import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from 'src/app/shared/proyectos.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-proyecto-ampliacion',
  templateUrl: './proyecto-ampliacion.component.html',
  styleUrls: ['./proyecto-ampliacion.component.css']
})
export class ProyectoAmpliacionComponent implements OnInit {
  
  public proyecto: Proyecto 
  
  constructor(public _location: Location, private apiService: ProyectosService) { }

  // Coge el valor del id del proyecto pasado por la url y devuelve toda su información
  projectsForId(id:number)
  {
    this.apiService.getProyecto(id = this.proyecto.project_id).subscribe((data: any[]) =>
    {
          this.proyecto.project_id = data[0].project_id;
          console.log(this.proyecto);
    }
  )
  }

  addFav(){
    
  }

  ngOnInit(): void {
    this.proyecto;
   }


}
