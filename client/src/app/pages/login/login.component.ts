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

  public user;
  public autentificado:boolean = false
  constructor(private router:Router, private usuario:UsuarioService) 
  {
    this.user = new User();
  }


  onSubmit(form)
  {
    console.log(form.value);
    // realizar autentificacion con el servidor y cambiar autentificado a true
    // asignar el perfil de usuario al servicio de usuario
    this.usuario.login(new Usuario(50, "mi perfil", "https://picsum.photos/400", "empresa"))
    // asignar el tipo de perfil con el nuevo usuario del login
    this.autentificado = true
    if(this.autentificado){
      this.router.navigate(["/dashboard"])
    }
  }

  ngOnInit(): void {
  }
}
