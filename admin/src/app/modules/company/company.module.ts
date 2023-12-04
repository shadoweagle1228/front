import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './components/company/company.component';
import { CompanyService } from '../../infrastructure/services/company.service';
import { FindcompanyComponent } from './components/findcompany/findcompany.component';
import { CommercialsegmentComponent } from './components/commercialsegment/commercialsegment.component';
import { graphqlProvider } from '../../graphql.provider';


@NgModule({
  declarations: [],
  imports: [
    CompanyComponent,
    FindcompanyComponent,
    CommonModule,
    CompanyRoutingModule,
    CommercialsegmentComponent
  ],
  providers:[
    CompanyService,    
  ]
})
export class CompanyModule { }
