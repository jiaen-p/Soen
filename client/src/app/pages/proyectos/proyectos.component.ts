import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/proyecto';
import { ProyectosService } from '../../shared/proyectos.service'
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { InversorService } from '../../shared/inversor.service'
import { Sector } from 'src/app/models/sectores.enum';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  // filtrado y filtrado por rango, copias de proyecto, util para realizar los filtros
  public filtrado: Proyecto[]
  public proyectos: any;
  public filtradoPorRango: Proyecto[] = []
  public user_fav = []
  public empresa:string;
  public proyecto:string;
  public busqueda:string;
  // search, vinculado directamente con el valor de la barra de busqueda
  public search:string = ''
  public projects: Proyecto[]
  public project: Proyecto
  // carga los sectores dinamicamente
  public sector = Sector
  public sectorType = []
  public sectorName = []

  constructor(private router:Router, public usuario:UsuarioService, private apiService: ProyectosService, private inversor: InversorService) {
    this.proyectos = this.apiService.getProyectos()

  }

  // añadir/quitar de favorito 
  toggle(id:number):void{
    let res = 'fas'
    if(this.user_fav.indexOf(id) >= 0){
      let index = this.user_fav.indexOf(id)
      this.user_fav.splice(index,1)
      res = 'far'
      this.inversor.deleteProyectosFavoritos(id).subscribe(data =>{})
    } else {
      this.user_fav.push(id)
      this.inversor.postProyectosFavoritos(id).subscribe(data =>{})  
    }
    // cambia el icono segun estado, no funciona con ngclass
    document.getElementById('id_proyecto_'+id).setAttribute("data-prefix", res)
  }

  allProjects()
  {
    this.apiService.getProyectos().subscribe((data: any[]) =>
    {
      this.projects = data;
      Object.assign(this.filtradoPorRango, this.projects);
    }
    )
  }

  
  filter(sector: string = null, max: number = null, min: number = null, date: string = null) {
    let filter = [];
    Object.assign(filter,this.projects);
    if(sector){
      filter = filter.filter(project => project.sector === sector);
    }
    if(max){
      filter = filter.filter(project => project.total_amount < max);
    }
    if(min){
      filter = filter.filter(project => project.total_amount > min);
    }
    if(date){
      let fecha = new Date(date);
      console.log(filter[0].end_date);
      filter = filter.filter(project => new Date(project.end_date.slice(0,10)) >= fecha);
      
    }
    this.filtradoPorRango = filter;
   
  }
  
  filterForName()
  {
      if(this.search != " "){
        this.filtradoPorRango = [];
        for(var i=0; i<=this.projects.length-1; i++)
        {
          this.proyecto = this.projects[i].project_name.toLowerCase();
          this.empresa = this.projects[i].company_name.toLowerCase();
          this.busqueda = this.search.toLocaleLowerCase();
          if(this.proyecto.includes(this.busqueda) ||this.empresa.includes(this.busqueda))
          {
            console.log(this.projects[i]);
            this.filtradoPorRango.push(this.projects[i]);
            //console.log(filter)
            
          }
        }
        console.log(this.filtradoPorRango);
      }
  }

  // comprobar si es usuario
  masInfo(id:number){
    if(this.usuario.empresa || this.usuario.inversor){
       this.router.navigate(['/proyectos/proyecto'], { queryParams: { project_id: id} })
     } else {
     this.router.navigate(['/register'])
    }
    
  }

  ngOnInit(): void {
    this.sectorType = Object.keys(this.sector)
    this.sectorName = Object.values(this.sector)
    this.allProjects()
    if(this.usuario.inversor){
      this.inversor.getProyectosFavoritos().subscribe(data => { 
        this.user_fav = Object.values(data).map(x => x.project_id)
        setTimeout(() => {
          this.user_fav.forEach(f_id => {
            document.getElementById('id_proyecto_'+f_id).setAttribute("data-prefix", 'fas')
          })
        }, 20);
      })
    }
  }
}
