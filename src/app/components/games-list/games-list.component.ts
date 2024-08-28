import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawgService } from '../../services/rawg.service';
import { Game } from '../../interfaces/game';
import { RouterLink } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatPaginatorModule],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css'
})
export class GamesListComponent implements OnInit{



  constructor(public rawgService: RawgService) {}

  ngOnInit(): void {
    this.rawgService.getGames().subscribe(data => {
      this.rawgService.games = data.results
      // console.log(data);
      
    })
  }
}
