import { inject, Injectable } from '@angular/core';
import { MainPageStoreService } from '@app/pages/main-page/services/main-page-store.service';
import { MainPageApiService } from '@app/pages/main-page/services/main-page-api.service';
import { Filters } from '@app/pages/main-page/main-page.models';
import { createGetCardsQuery } from '@app/pages/main-page/main-page.queries';
import { delay, distinctUntilChanged, map, tap } from 'rxjs';
import { LoaderFields } from '@app/shared/types';

@Injectable()
export class MainPageFacadeService {
  private store = inject(MainPageStoreService);
  private api = inject(MainPageApiService);

  public fetchCards$(page: number, filters: Filters) {
    this.setLoader('isListLoading');
    const query = createGetCardsQuery(page, filters);
    return this.api.getCards$(query).pipe(
      delay(300),
      tap(() => this.removeLoader('isListLoading'))
    );
  }

  public get filtersWithPage$() {
    return this.store.filtersWithPage.getValue$();
  }

  public get filtersWithPage() {
    return this.store.filtersWithPage.getValue();
  }

  public setFilters(newFilters: Filters, options = { resetPage: false }) {
    const currentFiltersWithPage = this.filtersWithPage;
    if (options.resetPage) {
      this.store.filtersWithPage.setValue({
        ...currentFiltersWithPage,
        ...newFilters,
        page: 1,
      });
      return;
    }
    this.store.filtersWithPage.setValue({
      ...currentFiltersWithPage,
      ...newFilters,
    });
  }

  public get page$() {
    return this.store.filtersWithPage.getValue$().pipe(
      map(({ page }) => page),
      distinctUntilChanged()
    );
  }

  public get page() {
    return this.store.filtersWithPage.getValue().page;
  }

  public changePage(difference: 1 | -1) {
    const currentFiltersWithPage = this.filtersWithPage;
    const currentPage = this.page;
    const newPage = currentPage + difference;
    if (newPage <= 0) {
      return;
    }
    this.store.filtersWithPage.setValue({
      ...currentFiltersWithPage,
      page: newPage,
    });
  }

  public get isListLoading$() {
    return this.store.isListLoading.getValue$();
  }

  public get isListLoading() {
    return this.store.isListLoading.getValue();
  }

  private setLoader(loaderName: LoaderFields<MainPageStoreService>) {
    this.store[loaderName].setValue(true);
  }

  private removeLoader(loaderName: LoaderFields<MainPageStoreService>) {
    this.store[loaderName].setValue(false);
  }
}
