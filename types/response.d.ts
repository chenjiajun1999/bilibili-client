export interface Response<T> {
	success: boolean;
	errCode: string;
	errMessage: string;
	data?: T;
}

export interface DataTable<T> {
	array: T[];
	total: number;
}
