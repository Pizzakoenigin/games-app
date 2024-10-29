import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
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
import { MenuService } from '../../services/menu.service';

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

  constructor(public rawgService: RawgService, public achievementService: AchievementsService, private router: Router, public menuService: MenuService) {

  }

  ngOnInit(): void {
    this.rawgService.getGame().subscribe(data => {
      this.rawgService.game = data;
      if (this.rawgService.game.description) {
        this.rawgService.game.description = this.removeHTMLTags(this.rawgService.game.description);
      }
    });

    this.getAchievements().then(() => {

    }).catch(error => {
      console.error('Error fetching achievements:', error);
    });

  }

  getAchievements(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.achievementService.getAchievements().subscribe({
        next: data => {
          this.achievements = data.results;
          this.achievementService.paginatorLength = data.count;
          resolve();
        },
        error: err => {
          reject(err);
        }
      });
    });
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
    this.achievementService.paginatorPage = e.pageIndex;
    this.getAchievements()
  }

  goToDeveloperPage(): void {
    this.goToDeveloperPageClearData().then(() => {
      this.rawgService.goToDevelopers()
    })
  }

  goToPublisherPage(): void {
    this.goToPublisherPageClearData().then(() => {
      this.rawgService.goToPublishers()
    })
  }

  goToDeveloperPageClearData(): Promise<void> {
    return new Promise((resolve, reject) => {
      next: {
        this.rawgService.gameSlug = '';
        this.rawgService.searchMode = false;
        this.rawgService.detailMode = false;
        this.rawgService.developerSearchMode = true;
        this.rawgService.publisherSearchMode = false;
        this.rawgService.publisher = []
        this.rawgService.games = []
        this.rawgService.game = []
        this.rawgService.paginatorPage = 0;
        resolve();
      }
      error: {
        reject()
      }
    })
  }

  goToPublisherPageClearData(): Promise<void> {
    return new Promise((resolve, reject) => {
      next: {
        this.rawgService.gameSlug = '';
        this.rawgService.searchMode = false;
        this.rawgService.detailMode = false;
        this.rawgService.developerSearchMode = false;
        this.rawgService.publisherSearchMode = true;
        this.rawgService.developer = []
        this.rawgService.games = []
        this.rawgService.game = []
        this.rawgService.paginatorPage = 0;
        resolve();
      }
      error: {
        reject()
      }
    })
  }


}
