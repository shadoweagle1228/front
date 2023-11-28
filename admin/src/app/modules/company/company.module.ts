import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './components/company/company.component';
import { CompanyService } from '../../infrastructure/services/company.service';


@NgModule({
  declarations: [],
  imports: [
    CompanyComponent,
    CommonModule,
    CompanyRoutingModule
  ],
  providers:[
    CompanyService
  ]
})
export class CompanyModule { }
