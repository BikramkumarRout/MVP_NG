import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Paginator } from 'primeng/paginator/paginator';
import { Table } from 'primeng/table';

export class PrimengTableHelper {
    predefinedRecordsCountPerPage = [10, 20, 30, 50, 100, 250, 500];
    defaultRecordsCountPerPage = 20;
    defaultRecordsCountPerPagepopup = 10;
    page = 1;
    isResponsive = true;
    resizableColumns: false;
    resizableColumnsTrue: true;
    totalRecordsCount;
    records: any[];
    isLoading = false;

    showLoadingIndicator(): void {
        setTimeout(() => {
            this.isLoading = true;
        }, 0);
    }

    hideLoadingIndicator(): void {
        setTimeout(() => {
            this.isLoading = false;
        }, 0);
    }

    getSorting(table: Table): string {
        let sorting;
        if (table.sortField) {
            sorting = table.sortField;
            if (table.sortOrder === 1) {
                sorting += ' ASC';
            } else if (table.sortOrder === -1) {
                sorting += ' DESC';
            }
        }
        return sorting;
    }

    getMaxResultCount(paginator: Paginator, event: LazyLoadEvent): number {
        if (paginator.rows) {
            return paginator.rows;
        }
        if (!event) {
            return 0;
        }
        return event.rows;
    }

    getSkipCount(paginator: Paginator, event: LazyLoadEvent): number {
        if (paginator.first) {
            return paginator.first;
        }
        if (!event) {
            return 0;
        }
        return event.first;
    }

    shouldResetPaging(event: LazyLoadEvent): boolean {
        if (!event /*|| event.sortField*/) { // if you want to reset after sorting, comment out parameter
            return true;
        }
        return false;
    }
}
