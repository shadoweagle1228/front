import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ResultCompany } from '../model/resultCompany.model';
import { Company, Data } from '../model/company.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) {
  }

  createCompany(){
    const headers = new HttpHeaders().set('Accept-Language', 'es');
    return this.http.post<ResultCompany>(this.apiUrl+'companies',null);
  }

  updateCompany(idCompany:string,company:Company){
    return this.http.put<any>(this.apiUrl+'companies/'+idCompany,company);
  }

  getData(){
    console.log(this.apiUrl+'commercial-segments');
    return this.http.get<any[]>(this.apiUrl+'commercial-segments');
  }

  patchCompany(idCompany:string,company:Data){
      console.log(company);   
    return this.http.patch<any[]>(this.apiUrl+'companies/'+idCompany,company);
  }



}
