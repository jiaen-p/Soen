import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectosService } from 'src/app/shared/proyectos.service';

@Component({
  selector: 'app-proyectos-interes',
  templateUrl: './proyectos-interes.component.html',
  styleUrls: ['./proyectos-interes.component.css']
})
export class ProyectosInteresComponent implements OnInit {

  public fav: Proyecto
  public favs: Proyecto[]

  constructor(public router:Router, private apiService: ProyectosService) { }

  // Coge el id del inversor y devuelve favoritos asociados
  Favs(id){
    this.apiService.getFav(id).subscribe((data: any[]) =>
    {
      for(let i = 0; i < data.length; i++)
      {
        console.log(this.fav = data[i]);
      }
    }
    ) 
  }

  ngOnInit(): void {
  }

}
