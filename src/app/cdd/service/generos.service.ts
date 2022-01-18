import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

import { Generos } from '../modelos/generos';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  private readonly urlAPI = '/assets/generos.json';

  constructor(private dadosCliente: HttpClient) {}

  listagemGeneros(){
    return this.dadosCliente.get<Generos[]>(this.urlAPI)
    .pipe(
      delay(3000),
      first(),
      tap(apiGeneros => console.log(apiGeneros))
    )
  }
}
