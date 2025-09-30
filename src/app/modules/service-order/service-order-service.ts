import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceOrderService {
  private _http: HttpClient = inject(HttpClient);



}
