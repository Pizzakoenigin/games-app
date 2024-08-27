import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawgService } from '../../services/rawg.service';
import { Game } from '../../interfaces/game';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css'
})
export class GamesListComponent implements OnInit{
  games: Game[] = [];

  constructor(private rawgService: RawgService) {}

  ngOnInit(): void {
    this.rawgService.getGames().subscribe(data => {
      this.games = data.results
      console.log(data);
      
    })
  }
}
