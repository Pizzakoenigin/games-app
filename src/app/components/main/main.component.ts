import { Component } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { GamesListComponent } from '../games-list/games-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [GameComponent, GamesListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
