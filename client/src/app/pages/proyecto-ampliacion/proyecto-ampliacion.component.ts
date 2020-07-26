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
  
  public proyecto: Proyecto  = new Proyecto()
  public project_id: number

  constructor(public route: ActivatedRoute, public _location: Location, private apiService: ProyectosService) { }

  // Coge el valor del id del proyecto pasado por la url y devuelve toda su información
  projectsForId(id:number)
  {
    this.apiService.getProyecto(id).subscribe((data: any[]) =>
    {
          this.proyecto.project_id = data[0].project_id;
          this.proyecto = data[0];
          console.log(this.proyecto);
    }
  )
  }


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.project_id = params["project_id"];
      this.projectsForId(this.project_id)
    }
    )
   }


}
