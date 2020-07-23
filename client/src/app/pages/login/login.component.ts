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
    // realizar autentificacion con el servidor y cambiar autentificado a true
    // asignar el perfil de usuario al servicio de usuario
    console.log(form.value.email)
    if(form.value.email && form.value.password){
      this.usuario.login(form.value).subscribe(res => {
        if(res){
          // asignar el tipo de perfil con el nuevo usuario del login
          if (res[0].company_id){
            this.usuario.empresa = res[0]
          } else {
            this.usuario.inversor = res[0]
          }
          this.usuario.perfil_url = res[0].profile_url
          this.usuario.user_id = res[0].user_id
          console.log(res)
          this.router.navigate(["/dashboard"])
        } else {
          console.log(res)
        }
      })
    }
  }

  ngOnInit(): void {
  }
}
