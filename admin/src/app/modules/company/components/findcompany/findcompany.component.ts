import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../material/material.module';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Apollo, gql } from 'apollo-angular';
import { Subscription, lastValueFrom } from 'rxjs';
import { graphqlProvider } from '../../../../graphql.provider';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyService } from '../../../../infrastructure/services/company.service';
import { Company } from '../../../../infrastructure/model/company.model';
import Swal from 'sweetalert2';
import { CompanyComponent } from '../company/company.component';


export interface Element {
  id: string
  nit: string;
  empresa: string;
  dominioempresarial: string;
  idTipoCliente: string;
  tipocliente: string;
  estado: string;
  accion: string;
}

export interface client1 {
  id: string;
  name: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-findcompany',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatPaginatorModule, ReactiveFormsModule, FormsModule],
  providers: [graphqlProvider],
  templateUrl: './findcompany.component.html',
  styleUrl: './findcompany.component.css'
})



export class FindcompanyComponent implements OnInit, OnDestroy {

  public commercialSegments: any[] = [];



  private querySubscription: Subscription = new Subscription;
  filter: string = '';


  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  @ViewChild('editar') editarModal!: ElementRef;


  ELEMENT_DATA: Element[] = [];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  isLoading: boolean = false;
  posts: any;
  displayedColumns: string[] = ['nit', 'empresa', 'dominioempresarial', 'tipocliente', 'estado', 'accion'];
  companyForm: FormGroup; // Definir el FormGroup


  constructor(private modalService: NgbModal, private apollo: Apollo, private companyService: CompanyService, private formBuilder: FormBuilder) {
    this.companyForm = this.formBuilder.group({
      idCompany: [''],
      nameCompany: ['', Validators.required],
      legalIdentifierCompany: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]],
      commercialSegment: ['', Validators.required],
      hostnameCompany: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$')]],
      /*authorizedAgentName: ['', Validators.required],
      authorizedAgentSurname: ['', Validators.required],
      authorizedAgentIdentityDocumentType: ['', Validators.required],
      authorizedAgentlegalIdentifier: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      authorizedAgentMail: ['', [Validators.required, Validators.email]]*/
    });

    this.getConsultaData("");
  }

  ngOnInit() {
    this.companyService.getData().subscribe(x => {
      this.commercialSegments = x;
    })
  }

  /*ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;    
  }*/



  abrirModal(element: any) {
    console.log(element);
    this.companyForm.get('idCompany')?.patchValue(element.id);
    this.companyForm.get('nameCompany')?.patchValue(element.empresa);
    this.companyForm.get('commercialSegment')?.patchValue(element.idTipoCliente);
    this.companyForm.get('legalIdentifierCompany')?.patchValue(element.nit);
    this.companyForm.get('hostnameCompany')?.patchValue(element.dominioempresarial);
    this.modalService.open(this.editarModal, { ariaLabelledBy: 'modal-basic-title' })
  }

  eliminar(element: Element) {
    // Lógica para eliminar un elemento
  }


  @ViewChild(CompanyComponent) dfor!: CompanyComponent;


  async actualizar() {
    this.isLoading = true;    
  
    const companyInstance = new Company(
      this.companyForm.get('nameCompany')?.value,
      this.companyForm.get('legalIdentifierCompany')?.value,
      this.companyForm.get('commercialSegment')?.value,
      this.companyForm.get('hostnameCompany')?.value
    );

    const companyPatch$ = this.companyService.patchCompany(this.companyForm.get('idCompany')?.value, companyInstance);
    const company = await lastValueFrom(companyPatch$).then(result => {
      this.isLoading = false;
      Swal.fire({
        icon: 'success',
        title: 'Confirmación',
        text: 'Guardado correctamente',
      });
      this.modalService.dismissAll(this.editarModal);
      this.getConsultaData(this.companyForm.get('legalIdentifierCompany')?.value);
      this.companyForm.reset;
      console.log(result);
    }).catch((e) => {
      this.isLoading = false;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e['error'].message,
      });
    });
  }



  applyFilter(event: Event) {
    //const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  opcion1() {

  }

  opcion2() {

  }


  getConsultaData(dataEnv: string) {
    this.filter = dataEnv;
    //companies(where: { legalIdentifier: { contains: $data }}) 
    this.ELEMENT_DATA = [];
    const GET_POSTS = gql`
      query GetCompanies($data: String!) {
        companies(where: {
          or:[
            { legalIdentifier: { contains: $data } },
            { name: { contains: $data } }
          ]
        })
        {
          id
          legalIdentifier
          name
          hostname
          commercialSegment {
            id
            name
          }
          state
        }
      }
    `;
    this.apollo.query<any>({
      query: GET_POSTS,
      variables: {
        data: this.filter // Usa this.filter directamente aquí
      }
    }).subscribe({
      next:
        (result: any) => {
          this.isLoading = true;
          console.log(result);
          if (result['data']) {
            result['data'].companies.forEach((item: any) => {
              let data = item;
              let commercialSegment = item.commercialSegment;
              const prueba: Element = { id: data.id, nit: data.legalIdentifier, empresa: data.name, dominioempresarial: data.hostname, idTipoCliente: commercialSegment.id, tipocliente: commercialSegment.name, estado: data.state, accion: '' };
              this.ELEMENT_DATA.push(prueba);
            });
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;

          }
          this.isLoading = false;
        }
    });
  }


  getData() {

    //companies(where: { legalIdentifier: { contains: $data }}) 
    this.ELEMENT_DATA = [];
    const GET_POSTS = gql`
      query GetCompanies($data: String!) {
        companies(where: {
          or:[
            { legalIdentifier: { contains: $data } },
            { name: { contains: $data } }
          ]
        })
        {
          legalIdentifier
          name
          hostname
          commercialSegment {
            name
          }
          state
        }
      }
    `;
    this.apollo.query<any>({
      query: GET_POSTS,
      variables: {
        data: this.filter // Usa this.filter directamente aquí
      }
    }).subscribe({
      next:
        (result: any) => {
          this.isLoading = true;
          if (result['data']) {
            result['data'].companies.forEach((item: any) => {
              let data = item;
              let commercialSegment = item.commercialSegment;
              const prueba: Element = { id: '', nit: data.legalIdentifier, empresa: data.name, dominioempresarial: data.hostname, idTipoCliente: '', tipocliente: commercialSegment.name, estado: data.state, accion: '' };
              this.ELEMENT_DATA.push(prueba);
            });
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;

          }
          this.isLoading = false;
        }
    });
  }




  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}
