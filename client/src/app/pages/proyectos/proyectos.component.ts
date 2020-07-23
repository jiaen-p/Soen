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
  public filtrado: Proyecto[] = []
  public filtradoPorRango: Proyecto[] = []
  public user_fav = []
  // search, vinculado directamente con el valor de la barra de busqueda
  public search:string = ''
  public projects: Proyecto[]


  constructor(private router:Router, private usuario:UsuarioService, private apiService: ProyectosService) {
  }
  // añadir/quitar de favorito 
  toggle(id:number):void{
    let res = 'fas'
    if(this.user_fav.indexOf(id) >= 0){
      let index = this.user_fav.indexOf(id)
      this.user_fav.splice(index,1)
      res = 'far'
      // this.inversorSrevice.deleteProyectosInteres(1,id)
    } else {
      this.user_fav.push(id)
      // this.inversorSrevice.postProyectosInteres(1,id) 
    }
    // cambia el icono segun estado, no funciona con ngclass
    document.getElementById('id_proyecto_'+id).setAttribute("data-prefix", res)
  }

  allProjects()
  {
    this.apiService.getProyectos().subscribe((data: any[]) =>
    {
      console.log(this.projects = data[0]);
    }
    )
  }

  filter(sector:string = null, max:number = null, min:number = null, date:string = null)
  {
    this.apiService.getFilter(sector, 0, 0, "2020-02-02").subscribe((data: any[]) =>
    {
      console.log(data);
    }
    )
  }

  filterForName()
  {
    this.apiService.getProyectos().subscribe((data: any[]) =>
    {
      if(this.search){
        let company: Empresa
        data.forEach(project => {
          // por cada proyecto que incluya los terminos enombre de empresa o proyecto, se añade al array dfilter
          if(project.project_name.includes(this.search) || company.company_name.includes(this.search)){
            this.filtrado.push(project);
        }
      })
      this.filtrado = data;
      }
    }
    )
  }

  ngOnInit(): void {
    // asignar valores a los arrays con datos obtenidos del service
    // Object.assign(this.filtrado, this.proyectos.proyectos)
    // Object.assign(this.filtradoPorRango, this.proyectos.proyectos)
  }

  filtrar(sector:string = null, max:number = null, min:number = null, fecha:string = null){
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

  //ERROR proyecto.empresa se ha modificado modelo Proyectos 
  filtrarPorNombre(){
    // this.filtrado = this.filtradoPorRango
    // if(this.search){
    //   let filter:Proyecto[] = []
    //   this.filtrado.forEach(proyecto => {
    //     // por cada proyecto que incluya los terminos en nombre de empresa o proyecto, se añade al array de filter
    //     if(proyecto.project_name.includes(this.search) || proyecto.empresa.includes(this.search)){
    //       filter.push(proyecto)
    //     }
    //   })
    //   this.filtrado = filter
  } 
  
  // comprobar si es usuario
  masInfo(id:number){
    // if(this.usuario.empresa || this.usuario.inversor){
    //   this.router.navigate(['/proyectos/proyecto'], { queryParams: { id: id } })
    // } else {
    //   this.router.navigate(['/register'])
    // }
  }
}
