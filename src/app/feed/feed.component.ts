import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'O melhor livro de janeiro',img:'../../assets/img/1.png' , cols: 1, rows: 1 },
          { title: 'Dicas dos leitores', img:'../../assets/img/2.png' , cols: 1, rows: 1 },
          { title: 'O mais comentado da semana',img:'../../assets/img/3.png' , cols: 1, rows: 1 },
          { title: 'Indicação do time BookShelf', img:'../../assets/img/4.png' , cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'O melhor livro de janeiro',img:'../../assets/img/1.png' , cols: 2, rows: 1 },
        { title: 'Dicas dos leitores', img:'../../assets/img/2.png' , cols: 1, rows: 1 },
        { title: 'O mais comentado da semana',img:'../../assets/img/3.png' , cols: 1, rows: 2 },
        { title: 'Indicação do time BookShelf', img:'../../assets/img/4.png' , cols: 1, rows: 1 }

      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
