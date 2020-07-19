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
  public proyecto_ampliacion: Proyecto = new Proyecto()
  public id: number = null
  
  constructor(public _location: Location, private route: ActivatedRoute, private proyecto: ProyectosService) { 
    
  }
  
  ngOnInit(): void {
    // coger valor de id pasado por el url
    this.route.queryParams.subscribe(params => {
      this.id = params['id']
      // buscamos el proyecto correspondiente en el servicio
      this.proyecto_ampliacion = this.proyecto.getProyecto(this.id)
    })
  }

  addFav(){
    // codigo para añadir a favoritos
  }
}
