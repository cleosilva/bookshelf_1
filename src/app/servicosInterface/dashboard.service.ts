import { first, tap } from 'rxjs';
import { Dashboard } from './../modelosInterface/dashboard';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly uriApi = '../../assets/dashboard.json';

  constructor( private cardsDashboard: HttpClient ) {}

  listagemCards(){
    return this.cardsDashboard.get<Dashboard[]>(this.uriApi)
    .pipe(
      first(),
      tap(apiDashboard => console.log(apiDashboard))
    )
  };
}

