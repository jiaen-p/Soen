import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { ProyectoAmpliacionComponent } from './pages/proyecto-ampliacion/proyecto-ampliacion.component';
import { ChatComponent } from './pages/chat/chat.component';


const routes: Routes = [
  {path:"proyectos", component: ProyectosComponent},
  {path:"proyectos/proyecto", component: ProyectoAmpliacionComponent},
  {path:"chat", component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
