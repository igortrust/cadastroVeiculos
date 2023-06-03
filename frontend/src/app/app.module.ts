import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VeiculoListComponent } from './veiculo-list/veiculo-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FiltroVeiculosPipe } from './pipes/filtro-veiculos.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TableRowBindingExample } from './example/table-pagination-example';


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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    TableRowBindingExample
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
