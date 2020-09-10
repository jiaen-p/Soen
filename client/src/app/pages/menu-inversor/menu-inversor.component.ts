import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';


@Component({
  selector: 'app-menu-inversor',
  templateUrl: './menu-inversor.component.html',
  styleUrls: ['./menu-inversor.component.css']
})
export class MenuInversorComponent implements OnInit {

  constructor(public router: Router, public usuario: UsuarioService) { }


  ngOnInit(): void {

  }

}
