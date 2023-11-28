import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModule } from './modules/material/material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MaterialModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  menuOpened = true;
  menuWidth = 250; // Ancho predefinido del menú en píxeles
  menu=true;
  dfor=100;

  toggleMenu() {
    this.menu = !this.menu;
    //this.menuOpened = !this.menuOpened;
    if(!this.menu){
      this.menuWidth = 60
      this.menuOpened = true;
      
    }else{
      this.menuWidth = 250
      this.menuOpened = true;
   
    }
  }
}
