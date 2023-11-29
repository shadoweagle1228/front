import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../material/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


export interface Element {
  nit: string;
  empresa: string;
  dominioempresarial:string;
  tipocliente:string;
  estado:string;
  accion:string;
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

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

const ELEMENT_DATA1: Element[] = [
    { nit: '111111-1', empresa: 'Colchones Dormir', dominioempresarial:'colchonesdormir.com', tipocliente:'Colchones', estado:'Activo', accion:'' },
    { nit: '222222-0', empresa: 'Colchones Dormir', dominioempresarial:'colchonesdormir.com', tipocliente:'Colchones', estado:'Activo', accion:'' },
   
  ]
 

@Component({
  selector: 'app-findcompany',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './findcompany.component.html',
  styleUrl: './findcompany.component.css'
})



export class FindcompanyComponent {

  commercialSegments: client1[] = [
    {name: 'Colchones', id: '1'},
    {name: 'Zapatos', id: '2'},
    {name: 'Carros', id: '3'},
  ];

  constructor(private modalService: NgbModal) {    

  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataSource:any;
  displayedColumns: string[] = [];
  
  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Paginado';
    this.displayedColumns = ['nit', 'empresa', 'dominioempresarial', 'tipocliente' , 'estado', 'accion'];
    this.dataSource = new MatTableDataSource(ELEMENT_DATA1);
    this.dataSource.paginator = this.paginator;
  }

  abrirModal(modalContent: any, data:any) {
    console.log(data.empresa);
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
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  opcion1(){

  }

  opcion2(){
    
  }

}
