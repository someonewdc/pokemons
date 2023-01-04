import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PokemonTable } from '@app/pages/main-page/main-page.models';
import { MainPageFacadeService } from '@app/pages/main-page/services/main-page-facade.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
})
export class TableComponent {
  public readonly mockListForSkeleton = Array.from({ length: 5 });

  public isListLoading$: Observable<boolean>;

  @Input() list!: PokemonTable[];

  constructor(private facade: MainPageFacadeService) {
    this.isListLoading$ = this.facade.isListLoading$;
  }

  public get currentPage() {
    return this.facade.page;
  }

  public get isLeftArrowActive() {
    return this.facade.page > 1 && !this.facade.isListLoading;
  }

  public get isRightArrowActive() {
    const MAX_TABLE_SIZE = 5;
    return this.list?.length === MAX_TABLE_SIZE && !this.facade.isListLoading;
  }

  public changePage(difference: 1 | -1) {
    const isMovingOutOfRange =
      (!this.isLeftArrowActive && difference === -1) ||
      (!this.isRightArrowActive && difference === 1);

    if (isMovingOutOfRange) {
      return;
    }

    this.facade.changePage(difference);
  }
}
