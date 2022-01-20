import { AutenticacaoFirebaseService } from './../servicosInterface/autenticacao-firebase.service';
import { LoginComponent } from './../login/login.component';
import { NavegacaoService } from './../servicosInterface/navegacao.service';
import { MenuNavegador } from './../modelosInterface/menu-navegador';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, catchError, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.scss']
})
export class NavegacaoComponent {
  usuario$ = this.autenticacaoFireBaseService.usuarioLogado$;
  // itens do menu principal
  tituloNav = 'BookShelf v1';
  // itens de ícones
  iconeGeral = '../../assets/img/ShelfBook.png';
  lIcone = 80;
  aIcone = 80;

  itemsMenu$: Observable<MenuNavegador[]>

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public telaLogin: MatDialog,
    private rotas: Router,
    private autenticacaoFireBaseService: AutenticacaoFirebaseService,
    private navegacaoService: NavegacaoService,
    ) {

      this.itemsMenu$ = navegacaoService.listagemMenu()
      .pipe(
        catchError(error => {
          return of([]);
        })
      )
    }

    abrirLogin(erroMsg: string){
      this.telaLogin.open(LoginComponent, {
        data:erroMsg
      })
    }

    sairUsuario(){
      this.autenticacaoFireBaseService.sairLogin().subscribe(() => {
        this.rotas.navigate([''])
      })
    }
}
