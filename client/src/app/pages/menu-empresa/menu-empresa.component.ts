import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-empresa',
  templateUrl: './menu-empresa.component.html',
  styleUrls: ['./menu-empresa.component.css']
})
export class MenuEmpresaComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
