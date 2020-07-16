import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { ProyectoAmpliacionComponent } from './pages/proyecto-ampliacion/proyecto-ampliacion.component';
import { MenuInversorComponent } from './pages/menu-inversor/menu-inversor.component';
import { MenuEmpresaComponent } from './pages/menu-empresa/menu-empresa.component';
import { ProyectosInvertidosComponent } from './pages/proyectos-invertidos/proyectos-invertidos.component';
import { ProyectosInteresComponent } from './pages/proyectos-interes/proyectos-interes.component';
import { PublicarProyectoComponent } from './pages/publicar-proyecto/publicar-proyecto.component';
import { MisProyectosComponent } from './pages/mis-proyectos/mis-proyectos.component';
import { ChatComponent } from './pages/chat/chat.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProyectosComponent,
    ProyectoAmpliacionComponent,
    MenuInversorComponent,
    MenuEmpresaComponent,
    ProyectosInvertidosComponent,
    ProyectosInteresComponent,
    PublicarProyectoComponent,
    MisProyectosComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
