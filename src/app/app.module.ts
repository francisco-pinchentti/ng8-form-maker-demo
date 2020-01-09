import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormMakerComponent } from './form-maker/form-maker.component';
import { FormLoaderComponent } from './form-loader/form-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    FormMakerComponent,
    FormLoaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
