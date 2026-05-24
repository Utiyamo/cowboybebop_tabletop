export interface ResultState<T> {
    statusCode: number;
    error?: string | null;
    success?: string | null;
    isSuccess: boolean;
    data?: T | null;
}