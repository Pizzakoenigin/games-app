import { Component, OnInit } from '@angular/core';
import { RawgService } from '../../services/rawg.service';
import { Game } from '../../interfaces/game';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Achievement } from '../../interfaces/detail';
import { AchievementsService } from '../../services/achievements.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { FooterComponent } from '../footer/footer.component';
import { firstValueFrom } from 'rxjs';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginator,
    RouterLink,
    FooterComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {


  achievements: Achievement[] = []

  showAchievements: boolean = false

  constructor(public rawgService: RawgService, public achievementService: AchievementsService, private router: Router) {

  }

  ngOnInit(): void {
    this.rawgService.getGame().subscribe(data => {
      this.rawgService.game = data
      if (this.rawgService.game.description) {
        this.rawgService.game.description = this.removeHTMLTags(this.rawgService.game.description)
      }
    })

    this.getAchievements()
  }

  getAchievements(): void {
    this.achievementService.getAchievements().subscribe(data => {
      this.achievements = data.results
      this.achievementService.paginatorLength = data.count;
    })
  }



  removeHTMLTags(str: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.body.textContent || "";
  }

  handlePageEvent(e: PageEvent) {
    // this.pageEvent = e;
    // this.rawgService.paginatorLength = e.length;
    this.achievementService.paginatorPageSize = e.pageSize;
    this.achievementService.paginatorPage = e.pageIndex + 1;
    this.getAchievements()
  }
}
