import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
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
  // controle de rotas do menu
  itemsMenu = [
    {linkMenu: '/cdd', labelMenu: 'Classes Dewey', hab: true},
    {linkMenu: '/feed', labelMenu: 'Fedd Notícias', hab: true},
    {linkMenu: '/clube', labelMenu: 'Página Usuário', hab: false},
    {linkMenu: '/leitura', labelMenu: 'Clubes de Leitura', hab: false},
    {linkMenu: '/estante', labelMenu: 'Estante Particular', hab: false},
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

}
