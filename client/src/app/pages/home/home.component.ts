import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/shared/proyectos.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { InversorService } from 'src/app/shared/inversor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public projects_featured: Proyecto[] = []
  public total_projects
  public total_investor
  public total_invested

  constructor(private inversor: InversorService, public apiService: ProyectosService, private router:Router, private usuario: UsuarioService) { 
   
  }
  
  featuredProjects(){
    this.apiService.getProyectos().subscribe((data: any[]) =>
    {
      this.projects_featured = data.slice(0,5);
    }
    )
  }

  totalProjects(){
    this.apiService.getTotalProjects().subscribe((data: any[]) =>
    {
      this.total_projects = Object.values(data[0])
      
    }
    )
  }

  totalInvested(){
    this.apiService.getTotalInvested().subscribe((data: any[]) =>
    {
      this.total_invested = Object.values(data[0])
      console.log(data)
      
    }
    )
  }

  totalInversores(){
    this.inversor.getTotalInvestors().subscribe((data: any[]) =>
    {
      console.log(data)
      this.total_investor = Object.values(data[0])
      console.log(this.total_investor)
      
    }
    )
  }
  
  conocerMas(id:number){
    console.log(id)
    if(this.usuario.empresa || this.usuario.inversor){
      this.router.navigate(['/proyectos/proyecto'], { queryParams: { project_id: id} })
    } else {
    this.router.navigate(['/register'])
   }
  }

  ngOnInit(): void {
    this.featuredProjects();
    this.totalProjects();
    this.totalInvested();
    this.totalInversores();
  }

}
