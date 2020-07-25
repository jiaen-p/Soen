import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/proyecto';
import { ProyectosService } from '../../shared/proyectos.service'
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { InversorService } from '../../shared/inversor.service'
import { Empresa } from 'src/app/models/empresa';
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
  // search, vinculado directamente con el valor de la barra de busqueda
  public search:string = ''
  public projects: Proyecto[]
  public project: Proyecto

  constructor(private router:Router, private usuario:UsuarioService, private apiService: ProyectosService, private inversor: InversorService) {
    this.proyectos = this.apiService.getProyectos()
    console.log(this.proyectos.project_name)
  }

  // añadir/quitar de favorito 
  toggle(id:number):void{
    let res = 'fas'
    if(this.user_fav.indexOf(id) >= 0){
      let index = this.user_fav.indexOf(id)
      this.user_fav.splice(index,1)
      res = 'far'
      this.inversor.deleteProyectosFavoritos(this.usuario.user_id,id).subscribe(data =>{})
    } else {
      this.user_fav.push(id)
      this.inversor.postProyectosFavoritos(this.usuario.user_id,id).subscribe(data =>{})  
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
    this.apiService.getFilter(sector, max, min, date).subscribe((data: any[]) => {
      if (!max) {
        max = 99999999999;
      }
      if (!min) {
        min = 0;
      }
      if (!date) {
        date = "2999/12/31";
      }
      this.filtrado = [];
      for (let i = 0; i < data.length; i++) {
        if (sector) {
          if ((data[i].total_amount >= Number(min) && data[i].total_amount <= Number(max)) && (sector && sector == data[i].sector) && (date && new Date(date) >= new Date(data[i].end_date))) {
            this.filtrado.push(data[i]);
          }
        } else {
          if ((data[i].total_amount >= Number(min) && data[i].total_amount <= Number(max)) && (date && new Date(date) >= new Date(data[i].end_date))) {
            this.filtrado.push(data[i]);
          }
        }
      } console.log(this.filtrado)
    })
  }

  filterForName()
  {
      if(this.search){
        this.filtradoPorRango = [];
        for(var i=0; i<this.projects.length; i++)
        {
          if(this.projects[i].project_name.includes(this.search) ||this.projects[i].company_name.includes(this.search))
          {
            console.log(this.projects[i]);
            this.filtradoPorRango.push(this.projects[i]);
            //console.log(filter)
            
          }
        }
        console.log(this.filtradoPorRango);
      }
  }

  ngOnInit(): void {
    this.allProjects();
  }

  filtrar(sector:string = null, max:number = null, min:number = null, end_date:string = null){
    // Object.assign(this.filtrado,this.proyectos)
    // comprobamos si el filtro está vacio o no
    // if(sector || max || min || fecha){
    //   // barremos el array de filtrado para filtrar aquellos que no cumplen con la condicion
    //   let borrar:Proyecto[] = []
    //   this.filtrado.forEach(proyecto => {
    //     if ((min && proyecto.total_amount < Number(min))  || (max && proyecto.total_amount > Number(max)) || (sector && sector != proyecto.sector) || (fecha && new Date(fecha) > proyecto.end_date)){
    //     } else {
    //       borrar.push(proyecto)
    //     }
    //   })
    //   // actualizar array
    //   this.filtrado = borrar
    // } else {
    //   // recuperar el array inicial
    //   Object.assign(this.filtrado, this.proyectos.proyectos)
    // }
    // Object.assign(this.filtradoPorRango, this.filtrado)
  }

  // comprobar si es usuario
  masInfo(id:number){
    if(this.usuario.empresa || this.usuario.inversor){
       this.router.navigate(['/proyectos/proyecto'], { queryParams: { id: id} })
     } else {
     this.router.navigate(['/register'])
    }
    
  }
}
