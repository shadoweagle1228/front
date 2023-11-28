import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyService } from '../../../../infrastructure/services/company.service';
import { lastValueFrom } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Company } from '../../../../infrastructure/model/company.model';
import { Identity } from '../../../../infrastructure/model/identity.model';
import { AuthorizedAgent } from '../../../../infrastructure/model/authorizedAgent.model';


interface client {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule,FormsModule, HttpClientModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit{
  isLoading = false;
  companyForm: FormGroup; // Definir el FormGroup

  constructor(private companyService: CompanyService, private formBuilder: FormBuilder){
    this.companyForm = this.formBuilder.group({
      nameCompany: ['', Validators.required],
      legalIdentifierCompany: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      commercialSegment:['', Validators.required],
      hostnameCompany: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$')]],
      authorizedAgentName: ['', Validators.required],
      authorizedAgentSurname: ['', Validators.required],
      authorizedAgentIdentityDocumentType: ['', Validators.required],
      authorizedAgentlegalIdentifier: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      authorizedAgentMail: ['', [Validators.required, Validators.email]]
    });
  }

  public commercialSegments: any[] = [];



  ngOnInit() {
    this.companyService.getData().subscribe(x=>{
      console.log(x);
      this.commercialSegments = x;
    })
  }



  async save(){
    this.isLoading = true;
    let idCompany:string="";



    if(this.companyForm.valid){





      const categoriesPost$ = this.companyService.createCompany();
      const categories = await lastValueFrom(categoriesPost$).then(async x=>{
      idCompany = x.companyId;
      const  authorizedAgentIdentity :Identity = new Identity(this.companyForm.get('authorizedAgentIdentityDocumentType')?.value, this.companyForm.get('authorizedAgentlegalIdentifier')?.value);

      const authorizedAgentInstance = new AuthorizedAgent(this.companyForm.get('authorizedAgentName')?.value,
                                                          this.companyForm.get('authorizedAgentSurname')?.value,
                                                          this.companyForm.get('authorizedAgentMail')?.value, authorizedAgentIdentity);


      const companyInstance = new Company(
          this.companyForm.get('nameCompany')?.value,
          this.companyForm.get('legalIdentifierCompany')?.value,
          this.companyForm.get('commercialSegment')?.value,
          this.companyForm.get('hostnameCompany')?.value,
          authorizedAgentInstance
      );

      const categoriesUpdate$ = this.companyService.updateCompany(idCompany, companyInstance);
      const categoriesUpdate = await lastValueFrom(categoriesUpdate$).then(result=>{
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'confirmación',
          text: 'Guardado correctamente',
        });
        console.log(result);
      }).catch((e) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: 'Se presento un Error',
        });
    });
    });
    }

  }

  // commercialSegments: client[] = [
  //   {viewValue: 'Colchones', value: '1'},
  //   {viewValue: 'Zapatos', value: '2'},
  //   {viewValue: 'Carros', value: '3'},
  // ];

  tipoNits: client[] = [
    {viewValue: 'CC', value: '1'},
    {viewValue: 'CE', value: '1'},
    {viewValue: 'PP', value: '3'},
  ];

  public mostrarUsuario:boolean=false;

  agregarUsuario(){

    if (
      this.companyForm.get('nameCompany')?.valid &&
      this.companyForm.get('legalIdentifierCompany')?.valid &&
      this.companyForm.get('commercialSegment')?.valid &&
      this.companyForm.get('hostnameCompany')?.valid
    ) {
      this.mostrarUsuario=true;
    } else {
      this.mostrarUsuario=false;
    }

  }
}
