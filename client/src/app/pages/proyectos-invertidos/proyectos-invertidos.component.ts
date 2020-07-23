import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectosService } from 'src/app/shared/proyectos.service';

@Component({
  selector: 'app-proyectos-invertidos',
  templateUrl: './proyectos-invertidos.component.html',
  styleUrls: ['./proyectos-invertidos.component.css']
})
export class ProyectosInvertidosComponent implements OnInit {

  public projects: Proyecto[]

  constructor(public router:Router, private apiService: ProyectosService) { }

  // Coge los proyectos asociados al usuario por su id
  projectsForUser(id:number)
  {
    this.apiService.getProyectoUser(id).subscribe((data: any[]) =>
    {
      console.log(this.projects = data);
    }
  )
  }

  ngOnInit(): void {
  }

}
