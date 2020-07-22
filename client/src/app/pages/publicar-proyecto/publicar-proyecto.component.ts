import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/proyecto'
import { ProyectosService } from 'src/app/shared/proyectos.service';
import { Sectores } from 'src/app/models/sectores.enum';

@Component({
  selector: 'app-publicar-proyecto',
  templateUrl: './publicar-proyecto.component.html',
  styleUrls: ['./publicar-proyecto.component.css']
})
export class PublicarProyectoComponent implements OnInit {
 
  constructor(private apiService:ProyectosService) { }

  save(project_id: string, project_name: string, description: string, total_amount:number, remaining_amount:number, end_date: Date, project_img_url:string, sector: string, update_: number)
  {
    this.apiService.postProyecto(new Proyecto()).subscribe((data) =>
    {
      console.log(data);
    }
    )
  }
  ngOnInit(): void {
  }

}
