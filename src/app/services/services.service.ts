import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  baseUrl = 'https://data.covid19india.org/v4/min/'
  constructor(private http : HttpClient) { }

  fetchEntireData(){
    return this.http.get(this.baseUrl+'data.min.json')
  }

  fetchLogs(){
    return this.http.get(this.baseUrl+'updatelog/log.json');
  }

}
