import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface Element {
  id: string;
  name: string;
  estado:string;  
  accion:string;
}

const ELEMENT_DATA1: Element[] = [
  { id: '1', name: 'Colchones', estado:'Activo', accion:'' },
  { id: '2', name: 'Ropa', estado:'Activo', accion:'' },
 
]

@Component({
  selector: 'app-commercialsegment',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './commercialsegment.component.html',
  styleUrl: './commercialsegment.component.css'
})
export class CommercialsegmentComponent {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataSource:any;
  displayedColumns: string[] = [];

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Paginado';
    this.displayedColumns = ['id', 'name', 'estado', 'accion'];
    this.dataSource = new MatTableDataSource(ELEMENT_DATA1);
    this.dataSource.paginator = this.paginator;
  }

  editar(element: Element) {
    // Lógica para editar un elemento
  }

  eliminar(element: Element) {
    // Lógica para eliminar un elemento
  }

  opcion1(){

  }

  opcion2(){
    
  }


}
