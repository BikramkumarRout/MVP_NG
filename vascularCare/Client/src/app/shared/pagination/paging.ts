export class Paging {
    public filter: string = null;
    public Sorting: string = null;
    public SortingType: string = "Asc";
    public MaxResultCount: number = 20;
    public skipCount: number = 0;
    public recordsPerPage;
    public startValue = 0;
    public lastValue = 20;
    public defaultHeight: string = "720px";
    public enhancedHeight: string = "100%";
}


