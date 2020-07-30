import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { EmpleoService } from 'src/app/shared/empleo.service';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { Empleo } from 'src/app/models/empleo';

@Component({
  selector: 'app-mis-empleos',
  templateUrl: './mis-empleos.component.html',
  styleUrls: ['./mis-empleos.component.css']
})
export class MisEmpleosComponent implements OnInit {

  public empleos: Empleo[];

  constructor(public router: Router, public empleo: EmpleoService, public usuario: UsuarioService) { }

  empleosForUser(id:number)
  {
    
    this.empleo.getJobCompany(id).subscribe((data: any[]) =>
    {
      this.empleos = data;
      console.log(this.empleos)
    }
  )
  }

  eliminar(id){
    console.log(id)
    this.empleo.deleteJob(id)
    .then(() => {
      this.ngOnInit()
    })
    .catch(null)
  }
  ngOnInit(): void {
    this.empleosForUser(this.usuario.empresa.company_id);
  }

}
