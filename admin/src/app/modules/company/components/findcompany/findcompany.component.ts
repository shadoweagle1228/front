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
import { ConsultaCompany, Data } from '../../../../infrastructure/model/company.model';
import Swal from 'sweetalert2';
import { CompanyComponent } from '../company/company.component';
import { AuthorizedAgent } from '../../../../infrastructure/model/authorizedAgent.model';
import { Identity } from '../../../../infrastructure/model/identity.model';


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

interface client {
  value: string;
  viewValue: string;
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

  tipoNits: client[] = [
    { viewValue: 'CC', value: '1' },
    { viewValue: 'CE', value: '1' },
    { viewValue: 'PP', value: '3' },
  ];

  private querySubscription: Subscription = new Subscription;
  filter: string = '';


  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  @ViewChild('editar') editarModal!: ElementRef;


  ELEMENT_DATA: ConsultaCompany[] = [];
  dataSource = new MatTableDataSource<ConsultaCompany>(this.ELEMENT_DATA);
  isLoading: boolean = false;
  posts: any;
  displayedColumns: string[] = ['nit', 'empresa', 'dominioempresarial', 'tipocliente', 'estado', 'accion'];
  companyForm: FormGroup; // Definir el FormGroup


  constructor(private modalService: NgbModal, private apollo: Apollo, private companyService: CompanyService, private formBuilder: FormBuilder) {
    this.companyForm = this.formBuilder.group({
      idCompany: [''],
      legalIdentifierCompany: [''],      
      commercialSegment: ['', Validators.required],
      hostnameCompany: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$')]],
      /*authorizedAgentName: ['', Validators.required],
      authorizedAgentSurname: ['', Validators.required],
      authorizedAgentIdentityDocumentType: ['', Validators.required],
      authorizedAgentlegalIdentifier: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      authorizedAgentMail: ['', [Validators.required, Validators.email]]*/
      authorizedAgentName: ['', Validators.required],
      authorizedAgentSurname: ['', Validators.required],
      authorizedAgentIdentityDocumentType: ['', Validators.required],
      authorizedAgentlegalIdentifier: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      authorizedAgentMail: ['', [Validators.required, Validators.email]],
      state: ['']
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

  isChecked: boolean = false;

  onToggleChange(event: any) {
    this.isChecked = event.checked;
    let state = this.isChecked ? 'ENABLE' : 'DISABLE';
    this.companyForm.get('state')?.patchValue(state);
    console.log('Slide toggle checked:', this.isChecked);
  }

  public empresa:string = "";
  public nit:string ="";
  abrirModal(element: any) {
    this.empresa = element.name;
    this.nit = element.legalIdentifier;    
    this.companyForm.get('idCompany')?.patchValue(element.id);
    this.companyForm.get('commercialSegment')?.patchValue(element['commercialSegment'].id);
    this.companyForm.get('hostnameCompany')?.patchValue(element.hostname);
    this.companyForm.get('legalIdentifierCompany')?.patchValue(element.legalIdentifier);
    

    const authorizedAgent = element['authorizedAgent'];
    this.companyForm.get('authorizedAgentName')?.patchValue(authorizedAgent.name);
    this.companyForm.get('authorizedAgentSurname')?.patchValue(authorizedAgent.surname);
    this.companyForm.get('authorizedAgentIdentityDocumentType')?.patchValue(authorizedAgent['identity'].documentType);
    this.companyForm.get('authorizedAgentlegalIdentifier')?.patchValue(authorizedAgent['identity'].legalIdentifier);
    this.companyForm.get('authorizedAgentMail')?.patchValue(authorizedAgent.email);
    this.companyForm.get('state')?.patchValue(element.state);
    let checked = element.state;
    this.isChecked = checked == 'ENABLE' ? true : false;    
    this.modalService.open(this.editarModal, { ariaLabelledBy: 'modal-basic-title' })
  }

  eliminar(element: Element) {
    // Lógica para eliminar un elemento
  }


  @ViewChild(CompanyComponent) dfor!: CompanyComponent;


  async actualizar() {
    this.isLoading = true;

    const authorizedAgentIdentity: Identity = new Identity(this.companyForm.get('authorizedAgentIdentityDocumentType')?.value, this.companyForm.get('authorizedAgentlegalIdentifier')?.value);

    const authorizedAgentInstance = new AuthorizedAgent(this.companyForm.get('authorizedAgentName')?.value,
      this.companyForm.get('authorizedAgentSurname')?.value,
      this.companyForm.get('authorizedAgentMail')?.value, authorizedAgentIdentity);


    const data: Data = new Data(
      this.companyForm.get('hostnameCompany')?.value, 
      this.companyForm.get('commercialSegment')?.value,
      this.companyForm.get('state')?.value,
      authorizedAgentInstance
      )


    const companyPatch$ = this.companyService.patchCompany(this.companyForm.get('idCompany')?.value, data); 
    const company = await lastValueFrom(companyPatch$).then(result => {   
      Swal.fire({
        icon: 'success',
        title: 'Confirmación',
        text: 'Guardado correctamente',
      })
      this.filter= this.companyForm.get('legalIdentifierCompany')?.value;      
      this.modalService.dismissAll(this.editarModal);
      this.companyForm.reset;      
    }).catch((e) => {
      this.isLoading = false;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e['error'].message,
      });
    }).finally(()=> {     
        this.ELEMENT_DATA = [];
        this.isLoading = true;
        this.getConsultaData();              
    })
  }



  applyFilter(event: Event) {
    //const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  opcion1() {

  }

  opcion2() {

  }


  getConsultaData(dataEnv?: string) {    
    console.log("Buscar");
    if(dataEnv){
      this.filter = dataEnv;
    }    
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
          authorizedAgent{
            identity{
              documentType
              legalIdentifier
            }
            name
            surname
            email
          }
        }
      }
    `;
    this.apollo.query<any>({
      query: GET_POSTS,
      variables: {
        data: this.filter // Usa this.filter directamente aquí
      },
      fetchPolicy: 'no-cache'
    }).subscribe({
      next:
        (result: any) => { 
          this.isLoading = true;
          if (result['data']) {
            this.ELEMENT_DATA = result['data'].companies;
            /*result['data'].companies.forEach((item: any) => {
             let data = item;
              let commercialSegment = item.commercialSegment;
              const prueba: Element = { id: data.id, nit: data.legalIdentifier, empresa: data.name, dominioempresarial: data.hostname, idTipoCliente: commercialSegment.id, tipocliente: commercialSegment.name, estado: data.state, accion: '' };
              this.ELEMENT_DATA.push(prueba);

            });*/
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;

          }
          this.isLoading = false;
        }
    });
  }


  getData() {
  console.log(this.filter);
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
              // this.ELEMENT_DATA.push(prueba);
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
