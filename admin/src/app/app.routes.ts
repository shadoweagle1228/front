import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'empresa',
        loadChildren: () =>
          import('./modules/company/company.module').then(
            (m) => m.CompanyModule
          ),      
      },
];
