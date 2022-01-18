import { AppDialogosComponent } from './../../app-compartilhado/app-dialogos/app-dialogos.component';
import { GenerosService } from './../service/generos.service';
import { Generos } from './../modelos/generos';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  
  livrosGeneros$: Observable<Generos[]>

  visaoColunas=['_idGenero','nomeGenero', 'decimalGenero']

  constructor(
    private generoService: GenerosService,
    public dialogo: MatDialog
    ) {

      this.livrosGeneros$ = generoService.listagemGeneros()
      .pipe(
        catchError(error => {
          this.abrirDialogoErro('Erro ao carregar tabela #BS -' + error.status)
          return of([])
        })
      )
  }

  abrirDialogoErro(erroMsg: string){
    this.dialogo.open(AppDialogosComponent, {
      data:erroMsg
    })
  }

  ngOnInit(): void {}

}
