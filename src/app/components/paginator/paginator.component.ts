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
    // length = this.rawgService.paginatorLength
    console.log(this.rawgService.paginatorPage);
  }


  handlePageEvent(e: PageEvent) {
    // this.pageEvent = e;
    // this.rawgService.paginatorLength = e.length;
    console.log(e.pageIndex);
    
    this.rawgService.paginatorPageSize = e.pageSize;
    this.rawgService.paginatorPage = e.pageIndex
    console.log(this.rawgService.paginatorPage);


    this.rawgService.loadGames()
  }
}
