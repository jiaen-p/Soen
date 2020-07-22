import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/proyecto';
import { ProyectosService } from '../../shared/proyectos.service'
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  // filtrado y filtrado por rango, copias de proyecto, util para realizar los filtros
  public filtrado: Proyecto[] = []
  public filtradoPorRango: Proyecto[] = []
  public user_fav = [2]
  // search, vinculado directamente con el valor de la barra de busqueda
  public search:string = ''


  constructor(public proyectos:ProyectosService, private router:Router, public usuario:UsuarioService) {
  }
  // añadir/quitar de favorito 
  toggle(id:number):void{
    let res = 'fas'
    if(this.user_fav.indexOf(id) >= 0){
      let index = this.user_fav.indexOf(id)
      this.user_fav.splice(index,1)
      res = 'far'
    } else {
      this.user_fav.push(id)
    }
    // cambia el icono segun estado, no funciona con ngclass
    document.getElementById('id_proyecto_'+id).setAttribute("data-prefix", res)
  }
  ngOnInit(): void {
    // asignar valores a los arrays con datos obtenidos del service
    Object.assign(this.filtrado, this.proyectos.proyectos)
    Object.assign(this.filtradoPorRango, this.proyectos.proyectos)
  }

  filtrar(sector:string = null, max:number = null, min:number = null, fecha:string = null){
    Object.assign(this.filtrado,this.proyectos)
    // comprobamos si el filtro está vacio o no
    if(sector || max || min || fecha){
      // barremos el array de filtrado para filtrar aquellos que no cumplen con la condicion
      let borrar:Proyecto[] = []
      this.filtrado.forEach(proyecto => {
        if ((min && proyecto.capital_total < Number(min))  || (max && proyecto.capital_total > Number(max)) || (sector && sector != proyecto.sector) || (fecha && new Date(fecha) > proyecto.fecha_fin)){
        } else {
          borrar.push(proyecto)
        }
      })
      // actualizar array
      this.filtrado = borrar
    } else {
      // recuperar el array inicial
      Object.assign(this.filtrado, this.proyectos.proyectos)
    }
    Object.assign(this.filtradoPorRango, this.filtrado)
  }

  filtrarPorNombre(){
    this.filtrado = this.filtradoPorRango
    if(this.search){
      let filter:Proyecto[] = []
      this.filtrado.forEach(proyecto => {
        // por cada proyecto que incluya los terminos en nombre de empresa o proyecto, se añade al array de filter
        if(proyecto.nombre.includes(this.search) || proyecto.empresa.includes(this.search)){
          filter.push(proyecto)
        }
      })
      this.filtrado = filter
    } 
  }
  // comprobar si es usuario
  masInfo(id:number){
    if(this.usuario.miPerfil){
      this.router.navigate(['/proyectos/proyecto'], { queryParams: { id: id } })
    } else {
      this.router.navigate(['/register'])
    }
  }
}
