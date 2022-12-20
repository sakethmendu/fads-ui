import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteCaseComponent } from './complete-case/complete-case.component';
import { CreateCaseComponent } from './create-case/create-case.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: '', component: CreateCaseComponent },
  { path: 'createcase', component: CreateCaseComponent },
  { path: 'completecase', component: CompleteCaseComponent }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
