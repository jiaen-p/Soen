import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/shared/proyectos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { EmpresaService } from 'src/app/shared/empresa.service';
import { Sector } from 'src/app/models/sectores.enum';

@Component({
  selector: 'app-modificar-proyecto',
  templateUrl: './modificar-proyecto.component.html',
  styleUrls: ['./modificar-proyecto.component.css']
})
export class ModificarProyectoComponent implements OnInit {
  // quitar 3 poner null cuando funcione
  private project_id: number = null 
  public project: Proyecto = new Proyecto()
  public sector = Sector
  public sectorType = []
  public sectorName = []
  constructor(private proyecto:ProyectosService, private route:ActivatedRoute, private empresa:EmpresaService, public router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.project_id = params['project_id'];
      this.proyecto.getProyecto(this.project_id).subscribe(res => {
        this.project = res[0]
        this.project.end_date = res[0].end_date.slice(0,10)
      })
    });
    this.sectorType = Object.keys(this.sector)
    this.sectorName = Object.values(this.sector)
  }

  modificar(){
    this.empresa.modificarProyecto(this.project).subscribe()
    this.router.navigate(['/dashboard'])
  }
}
