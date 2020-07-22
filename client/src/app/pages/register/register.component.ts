import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User;
  public isEmpresa:boolean = false;
  constructor(private router: Router, private usuario: UsuarioService) {
    this.user = new User();
  }


  onSubmit(form)
  {
    this.usuario.userinfo = form.value
    if(this.isEmpresa){
      // console.log("Empresa",form.value);
      this.router.navigate(["/register/enterprise"])
    } else {
      // console.log("Inversor", form.value)
      this.router.navigate(['/register/investor'])
    }
    // ir a endpoint de registro en el backend
  }

  ngOnInit(): void {

  }

}
