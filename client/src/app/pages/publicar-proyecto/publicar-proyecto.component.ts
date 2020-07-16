import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/proyecto'

@Component({
  selector: 'app-publicar-proyecto',
  templateUrl: './publicar-proyecto.component.html',
  styleUrls: ['./publicar-proyecto.component.css']
})
export class PublicarProyectoComponent implements OnInit {
  public newProyecto: Proyecto = new Proyecto;
  public newNombre: string;
  public newEmpresa: string;
  public newCapital_total: number;
  public newCapital_restante: number;
  public newFecha_fin:Date;
  public newDescripcion: string;
  public newImg_url: string;
  public newId: number;
  public newSector: string;
 
  constructor() { }

  save(nombre: HTMLInputElement, empresa: HTMLInputElement,capital_total: HTMLInputElement,fecha_fin: HTMLInputElement,descripcion: HTMLInputElement,img_url: HTMLInputElement, sector: HTMLInputElement){
    this.newNombre = nombre.value;
    this.newEmpresa = empresa.value;
    this.newCapital_total = Number(capital_total.value);
    this.newCapital_restante = 0;
    this.newFecha_fin = fecha_fin.valueAsDate;
    this.newDescripcion = descripcion.value
    this.newImg_url = img_url.value;
    this.newId = 0;
    this.newSector = sector.value;
    this.newProyecto =  {nombre:this.newNombre, empresa:this.newEmpresa,capital_total: this.newCapital_total,capital_restante: this.newCapital_restante,fecha_fin: this.newFecha_fin,descripcion: this.newDescripcion,img_url: this.newImg_url,id: this.newId,sector: this.newSector}
    console.log(this.newProyecto)
  
   
  }
  ngOnInit(): void {
  }

}
