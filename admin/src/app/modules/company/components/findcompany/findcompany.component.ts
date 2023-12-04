import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../material/material.module';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { graphqlProvider } from '../../../../graphql.provider';
import { FormsModule } from '@angular/forms';



export interface Element {
  nit: string;
  empresa: string;
  dominioempresarial: string;
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
  imports: [CommonModule, MaterialModule, FormsModule, MatPaginatorModule],
  providers: [graphqlProvider],
  templateUrl: './findcompany.component.html',
  styleUrl: './findcompany.component.css'
})



export class FindcompanyComponent implements OnInit, OnDestroy {

  commercialSegments: client1[] = [
    { name: 'Colchones', id: '1' },
    { name: 'Zapatos', id: '2' },
    { name: 'Carros', id: '3' },
  ];



  private querySubscription: Subscription = new Subscription;
  filter: string = '';
  
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  ELEMENT_DATA: Element[] = [];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  isLoading: boolean = false;
  posts: any;
  displayedColumns: string[] = ['nit', 'empresa', 'dominioempresarial', 'tipocliente', 'estado', 'accion'];
  


  constructor(private modalService: NgbModal, private apollo: Apollo) {
    this.getConsultaData("");
  }

  /*ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;    
  }*/
  
  ngOnInit() {
    //this.dataSource.paginator = this.paginator; // Asigna el paginador después de la inicialización de la vista
    //this.getData();

  }




  abrirModal(modalContent: any, data: any) {   
    this.modalService.open(modalContent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // Aquí puedes manejar lo que sucede después de cerrar la modal (si lo necesitas)
    }, (reason) => {
      // Aquí puedes manejar lo que sucede si se cierra la modal de manera diferente (si lo necesitas)
    });
  }

  eliminar(element: Element) {
    // Lógica para eliminar un elemento
  }



  applyFilter(event: Event) {
    //const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  opcion1() {

  }

  opcion2() {

  }


  getConsultaData(data:string){   
    this.filter = data; 
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
          console.log(result);
          if (result['data']) {
            result['data'].companies.forEach((item: any) => {
              let data = item;
              let commercialSegment = item.commercialSegment;
              const prueba: Element = { nit: data.legalIdentifier, empresa: data.name, dominioempresarial: data.hostname, tipocliente: commercialSegment.name, estado: data.state, accion: '' };
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
              const prueba: Element = { nit: data.legalIdentifier, empresa: data.name, dominioempresarial: data.hostname, tipocliente: commercialSegment.name, estado: data.state, accion: '' };
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
