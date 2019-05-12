/** Angular */
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

	constructor() { }

	public getItem(field: string) { return localStorage.getItem(field); }

	public removeItem(field: string) { return localStorage.removeItem(field); }

	public setItem(key: string, value: any) { localStorage.setItem(key, value); }

	public clear() { localStorage.clear(); }
}