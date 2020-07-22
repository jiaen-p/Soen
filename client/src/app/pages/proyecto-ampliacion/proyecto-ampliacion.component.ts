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
  public proyectos: Proyecto[]
  
  constructor(public _location: Location, private apiService: ProyectosService) { }

  // Coge el valor del id del proyecto pasado por la url y devuelve toda su información
  aboutProject(id:number)
  {
    this.apiService.getProyecto(id).subscribe((data: any[]) =>
    {
      for (let i = 0; i < data.length; i++)
      {
        console.log(this.proyecto = data[i]);
      }
    }
    )
  }

  addFav(investor_id:number, project_id:number)
  {
    this.apiService.postFav(investor_id).subscribe((data) =>
    {
      return console.log(data);
    }
    )
  }

  ngOnInit(): void { }


}
