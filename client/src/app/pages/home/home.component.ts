import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/shared/proyectos.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public projects_featured: Proyecto[] = []
  public total_projects: number

  constructor(public apiService: ProyectosService, private router:Router, private usuario: UsuarioService) { 
   
  }
  
  featuredProjects(){
    this.apiService.getProyectos().subscribe((data: any[]) =>
    {
      this.projects_featured = data.slice(0,4);
    }
    )
  }

  totalProjects(){
    this.apiService.getTotalProjects().subscribe((data:number = 0) =>
    {
      this.total_projects = data[0][0];
      // console.log(this.total_projects)
    }
    )
  }
  

  conocerMas(id:number){
    console.log(id)
    if(this.usuario.miPerfil){
      this.router.navigate([`/proyectos/proyecto`], { queryParams: { id: id } })
    } else {
      this.router.navigate(["/register"])
    }
  }

  ngOnInit(): void {
    this.featuredProjects();
    this.totalProjects();
  }

}
