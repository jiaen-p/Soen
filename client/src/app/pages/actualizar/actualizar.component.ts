import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  public newActualizar: string;
  public newFinanciacion: number;

  constructor() { }

  actualizar(actualizar: HTMLInputElement){
    this.newActualizar = actualizar.value;
    console.log(this.newActualizar);
  }

  financiacion(financiacion: HTMLInputElement){
    this.newFinanciacion = Number(financiacion.value);
    console.log(this.newFinanciacion);
  }

  objetivos(){
    console.log("Click objetivos")
  }


  ngOnInit(): void {
  }

}
