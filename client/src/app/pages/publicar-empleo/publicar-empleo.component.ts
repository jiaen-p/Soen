import { Component, OnInit } from '@angular/core';
import { Empleo } from '../../models/empleo'
import { Sectores } from 'src/app/models/sectores.enum';
import { Contracts } from 'src/app/models/contract.enum';
import { WorkingDays } from 'src/app/models/working-day.enum'
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';


@Component({
  selector: 'app-publicar-empleo',
  templateUrl: './publicar-empleo.component.html',
  styleUrls: ['./publicar-empleo.component.css']
})
export class PublicarEmpleoComponent implements OnInit {


  constructor(private router:Router, private usuario:UsuarioService) { }

  save( title: string, sector: string, description:string, working_day: string, contract:string, salary: number, requeriments:string){
    let empleo = new Empleo()
    empleo = {
      empleo_id: null, 
      company_id: null,
      company_name:this.usuario.empresa.company_name, 
      title: title, 
      sector: <Sectores>sector, 
      description: description,
      working_day: <WorkingDays>working_day,
      contract: <Contracts>contract,
      salary: salary,
      requeriments: requeriments,
    }
    console.log(empleo)
      //this.router.navigate(['/dashboard'])
  }
  ngOnInit(): void {
  }

}
