import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawgService } from '../../services/rawg.service';
import { Game } from '../../interfaces/game';
import { RouterLink } from '@angular/router';
import {PageEvent, MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { PaginatorComponent } from '../paginator/paginator.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MenuService } from '../../services/menu.service';


@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    MatPaginatorModule, 
    MatPaginator,
    MatIconModule,
    MatButtonModule, 
    PaginatorComponent,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css'
})
export class GamesListComponent implements OnInit{
  constructor(public rawgService: RawgService, public menuService: MenuService) {}

  ngOnInit(): void {
    if(this.rawgService.developerSearchMode == false && this.rawgService.publisherSearchMode == false && this.rawgService.searchMode == false) {
    // console.log('check');
    
      this.rawgService.loadGames()      
    }   

  }

}
