export interface PageResult<Type> {
  page: number;
  totalRecords: number;
  totalPages: number;
  data: Type[];
}
