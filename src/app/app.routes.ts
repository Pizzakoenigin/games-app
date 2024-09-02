import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
    {path: 'game-detail/:id', component: GameComponent},
    {path: '', component: GamesListComponent}
];
