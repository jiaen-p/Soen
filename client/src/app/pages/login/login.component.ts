import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public user: User = new User();
  public autentificado:boolean = false
  constructor(private router:Router, private usuario:UsuarioService) {  }


  onSubmit(form)
  {
    console.log(form.value);
    // realizar autentificacion con el servidor y cambiar autentificado a true
    // asignar el perfil de usuario al servicio de usuario
    this.usuario.login(form.value).subscribe(res => {
      if(res){
        // asignar el tipo de perfil con el nuevo usuario del login
        this.router.navigate(["/dashboard"])
      }
    })
  }

  ngOnInit(): void {
  }
}
