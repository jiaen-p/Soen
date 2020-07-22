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
  public newProyecto: Proyecto = new Proyecto();
  public newProject_name: string
  public newDescription: string
  public newTotal_amount: number
  public newRemaining_abount: number
  public newEnd_date: Date
  public newProject_img_url: string
  public newSector: string;
  public newUpdate: string
 

 
  constructor(private proyectos:ProyectosService) { }

  save(project_name: HTMLInputElement, description: HTMLInputElement,total_amount: HTMLInputElement,end_date: HTMLInputElement,project_img_url: HTMLInputElement, sector: HTMLInputElement){
    this.newProject_name = project_name.value;
    this.newDescription = description.value;
    this.newTotal_amount = Number(total_amount.value);
    this.newRemaining_abount = 0;
    this.newEnd_date = end_date.valueAsDate;
    this.newProject_img_url = project_img_url.value
    this.newSector = sector.value;
    this.newUpdate = "";
    this.newProyecto =  {project_name:this.newProject_name, description:this.newDescription, total_amount: this.newTotal_amount,remaining_abount: this.newRemaining_abount,end_date: this.newEnd_date,project_img_url: this.newProject_img_url,sector: <Sectores>this.newSector,update:this.newUpdate}
    this.proyectos.proyectos.unshift(this.newProyecto)
  }
  ngOnInit(): void {
  }
  public project_name: string
  public description: string
  public total_amount: number
  public remaining_abount: number
  public end_date: Date 
  public project_img_url: string
  public sector: Sectores
  public update: string
}
