import { QueryKey, UseQueryOptions } from '@tanstack/react-query';

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
}

export type FetchFunction<T> = (page: number, pageSize: number) => Promise<PaginatedResponse<T>>;

export interface QueryOptions<T> {
  queryKey: string | string[];
  queryFn: FetchFunction<T>;
  options?: Omit<UseQueryOptions<PaginatedResponse<T>, Error, PaginatedResponse<T>, QueryKey>, 'queryKey' | 'queryFn'>;
}
