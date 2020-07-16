import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { ProyectoAmpliacionComponent } from './pages/proyecto-ampliacion/proyecto-ampliacion.component';
import { ChatComponent } from './pages/chat/chat.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  {path:"proyectos", component: ProyectosComponent},
  {path:"proyectos/proyecto", component: ProyectoAmpliacionComponent},
  {path:"chat", component: ChatComponent},
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
