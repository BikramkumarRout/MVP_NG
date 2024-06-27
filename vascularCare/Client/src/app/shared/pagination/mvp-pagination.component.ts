
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { PaginationService } from './pagination.service';

const pagesShow: number = 3;

@Component({
  selector: 'mvp-pagination',
  templateUrl: './mvp-pagination.component.html',
  styleUrls: ['./mvp-pagination.component.css']
})

export class MvpPaginationComponent implements OnChanges {

  @Output() pageChanged: EventEmitter<any> = new EventEmitter<any>();
  @Input() totalItems: number;
  @Input() currentPage: number;

  @Input() hideLeftNav = false;
  @Input() hideRightNav = false;

  // Default limit if not passed from parent
  @Input() limit: number;
  @Input() forceUpdate: any;

  showFirst: boolean;
  showLast: boolean;
  totalPages: number;
  hideBullet = false;
  hdeLeftBullet = false;
  hderightBullet = false;

  pages: number[] = [];

  constructor(private paginationService: PaginationService) {
  }

  /**
   * Send page changed event to parent component with selected page and current limit
   * @param {number} page
   */
  setPage(page: number) {
    // this.paginationService.setPage(page);
    this.pageChanged.emit({
      page: page,
      limit: this.limit
    });
  }

  /**
   * Regenerate pagination on any state change
   */
  ngOnChanges() {
    this.generatePages();
  }

  /**
   * Generate pages button data
   */
  generatePages() {

    this.pages = [];
    this.totalPages = Math.ceil(this.totalItems / this.limit);
    let startIndex = this.currentPage === 1 ? 0 : (this.totalPages === this.currentPage ? -(pagesShow - 1) : -1);
    for (let i = startIndex; i <= this.totalPages - this.currentPage; i++) {
      if (this.currentPage + i > 0) {
        this.pages.push(this.currentPage + i);
      }
      if (i >= (pagesShow - 1) + startIndex) {
        break;
      }
    }
    this.showFirst = this.pages[0] > 1;
    this.showLast = this.pages[pagesShow - 1] < this.totalPages;
    if (this.showFirst && this.showLast && this.totalPages - 2 == this.pages.length) {
      this.hideBullet = true;
    }
    else {
      this.hideBullet = false;
    }

    if (this.currentPage === 3 && this.pages[0] === 2) {
      this.hdeLeftBullet = true;
    }
    else {
      this.hdeLeftBullet = this.hideBullet;
    }
    if (this.currentPage === this.totalPages - 2 && this.pages[2] === this.totalPages - 1) {
      this.hderightBullet = true;
    }
    else {
      this.hderightBullet = this.hideBullet;
    }
  }

}
