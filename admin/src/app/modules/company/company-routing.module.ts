import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';
import { FindcompanyComponent } from './components/findcompany/findcompany.component';
import { CommercialsegmentComponent } from './components/commercialsegment/commercialsegment.component';

const routes: Routes = [
  { path: '', component: CompanyComponent },
  { path: 'tipocliente', component: CommercialsegmentComponent },
  { path: 'find', component: FindcompanyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
