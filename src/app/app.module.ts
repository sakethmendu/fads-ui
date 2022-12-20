import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql.module';
import { CreateCaseComponent } from './create-case/create-case.component';
import { CompleteCaseComponent } from './complete-case/complete-case.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateCaseComponent,
    CompleteCaseComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }