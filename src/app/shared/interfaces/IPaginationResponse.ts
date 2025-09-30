export interface IPaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
}
