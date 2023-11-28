import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ResultCompany } from '../model/resultCompany.model';
import { Company } from '../model/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = 'https://prueba-concepto-qr.azurewebsites.net/api/v1/companies/';

  constructor(private http: HttpClient) {
  }

  createCompany(){
    const headers = new HttpHeaders().set('Accept-Language', 'es');
    return this.http.post<ResultCompany>(this.apiUrl,null);
  }

  updateCompany(idCompany:string,company:Company){
    return this.http.put<any>(this.apiUrl+idCompany,company);
  }

  getData(){
    return this.http.get<any[]>("https://prueba-concepto-qr.azurewebsites.net/api/v1/commercial-segments");
  }



}
