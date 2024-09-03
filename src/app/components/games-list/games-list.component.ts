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
  constructor(public rawgService: RawgService) {}

  ngOnInit(): void {
    this.rawgService.loadGames()
  }

  // loadGames() {
  //   if(this.rawgService.searchMode == false && this.rawgService.developerSearchMode == false) {
  //   this.rawgService.getGames().subscribe(data => {
  //     this.rawgService.games = data.results
  //     this.rawgService.paginatorLength = data.count;
  //    })       
  //   }      
  // }

  returnToMain() {
    this.rawgService.gameSlug = ''; 
    this.rawgService.searchMode = false; 
    this.rawgService.developerSearchMode = false;
    this.rawgService.publisherSearchMode = false;
    this.rawgService.developer = []
    this.rawgService.publisher = []
    this.rawgService.games = []
    this.rawgService.game = [] 
    this.rawgService.loadGames()
  }
}
