import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pageable } from 'src/app/@core/models';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() pageable: Pageable;
  @Output() changePage = new EventEmitter<number>();

  page = 1;

  constructor() { }

  ngOnInit(): void {
  }

  public pageChanged(page: number) {
    this.page = page;
    this.changePage.emit(this.page);
  }

}
