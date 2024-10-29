import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { RawgService } from '../../services/rawg.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginator, CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(public rawgService: RawgService) { }
  // pageEvent!: PageEvent;

  ngOnInit(): void {

  }


  handlePageEvent(e: PageEvent) {
    this.rawgService.paginatorPageSize = e.pageSize;
    this.rawgService.paginatorPage = e.pageIndex
    this.rawgService.loadGames()
  }
}
