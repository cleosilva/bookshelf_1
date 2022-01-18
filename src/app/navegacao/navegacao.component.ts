import { NavegacaoService } from './../servicosInterface/navegacao.service';
import { MenuNavegador } from './../modelosInterface/menu-navegador';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, catchError, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.scss']
})
export class NavegacaoComponent {

  // itens do menu principal
  tituloNav = 'BookShelf v1';
  usuario = {username: 'Victor', userIcon:'remember_me'}
  // itens da Barra superior
  tituloBarra = '[Sua estante virtual]';
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
    private navegacaoService: NavegacaoService
    ) {

      this.itemsMenu$ = navegacaoService.listagemMenu()
      .pipe(
        catchError(error => {
          return of([]);
        })
      )
    }
}
