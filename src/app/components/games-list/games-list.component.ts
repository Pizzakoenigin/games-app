import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawgService } from '../../services/rawg.service';
import { Game } from '../../interfaces/game';
import { RouterLink } from '@angular/router';
import {PageEvent, MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { PaginatorComponent } from '../paginator/paginator.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    MatPaginatorModule, 
    MatPaginator, 
    PaginatorComponent,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css'
})
export class GamesListComponent implements OnInit{
  constructor(public rawgService: RawgService) {}


  

  ngOnInit(): void {
    this.rawgService.getGames().subscribe(data => {
      this.rawgService.games = data.results
      this.rawgService.paginatorLength = data.count;
      
    })
    // this.loadGames()
  }
}
