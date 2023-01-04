import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FiltersComponent,
  TableComponent,
} from '@app/pages/main-page/components';
import {
  MainPageFacadeService,
  MainPageApiService,
} from '@app/pages/main-page/services';
import { map, Observable, switchMap, tap } from 'rxjs';
import { PokemonTable } from '@app/pages/main-page/main-page.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [TableComponent, FiltersComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MainPageFacadeService, MainPageApiService],
})
export class MainPageComponent {
  public list$!: Observable<PokemonTable[]>;

  constructor(private facade: MainPageFacadeService) {
    this.list$ = this.facade.filtersWithPage$.pipe(
      tap(data => console.log(data)),
      switchMap(({ page, ...filters }) =>
        this.facade.fetchCards$(page, filters)
      ),
      map(response => response.cards)
    );
  }
}
