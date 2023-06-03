import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VeiculoListComponent } from './veiculo-list/veiculo-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FiltroVeiculosPipe } from './pipes/filtro-veiculos.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    VeiculoListComponent,
    FiltroVeiculosPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
