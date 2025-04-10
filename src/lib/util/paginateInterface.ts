export interface Paginate {
    total: number;
    current_page: number;
    limit: number;
    next: number| null;
    prev: number | null;
    pages: number[];
}