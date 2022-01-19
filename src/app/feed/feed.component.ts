import { Dashboard } from './../modelosInterface/dashboard';
import { DashboardService } from './../servicosInterface/dashboard.service';
import { Component } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards$: Observable<Dashboard[]>

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          ];
      }

      return this.cards$;
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dashboardService: DashboardService
    ) {
      this.cards$ = dashboardService.listagemCards()
      .pipe(
        catchError(error => {
          return of([])
        })
      )
    }
}
