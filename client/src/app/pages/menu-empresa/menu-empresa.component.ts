import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-menu-empresa',
  templateUrl: './menu-empresa.component.html',
  styleUrls: ['./menu-empresa.component.css']
})
export class MenuEmpresaComponent implements OnInit {

  constructor(public router: Router, public usuario: UsuarioService) { }

  ngOnInit(): void {
  }

}
