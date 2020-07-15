import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public profile: boolean;
  public user: User;

  constructor() {
    this.profile = false;
    this.user = new User();
  }

  profile_select(){
    this.profile = true;
  }

  onSubmit(form)
  {
    console.log(form.value);
  }

  ngOnInit(): void {
  }

}
