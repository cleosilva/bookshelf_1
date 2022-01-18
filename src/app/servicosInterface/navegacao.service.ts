import { delay, first, tap } from 'rxjs';
import { MenuNavegador } from './../modelosInterface/menu-navegador';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavegacaoService {
  private readonly uriApi = '../../assets/menuNavegador.json'

  constructor( private menuDados: HttpClient) { }

  listagemMenu(){
    return this.menuDados.get<MenuNavegador[]>(this.uriApi)
    .pipe(
      first(),
      tap(apiMenu => console.log(apiMenu))
    )
  }
}

