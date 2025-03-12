import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NumeroPipe } from './pipes/numero.pipe';
import { AppHighlightDirective } from './directives/app-highlight.directive';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    NumeroPipe,
    AppHighlightDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgxSpinnerModule
  ],
  exports:[AppHighlightDirective],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
