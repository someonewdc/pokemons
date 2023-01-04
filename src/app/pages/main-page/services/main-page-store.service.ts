import { Injectable } from '@angular/core';
import { ObservableItem } from '@app/shared/utils';
import {
  FiltersWithPage,
} from '@app/pages/main-page/main-page.models';
import { INITIAL_FILTERS } from '@app/pages/main-page/main-page.constants';

@Injectable({
  providedIn: 'root',
})
export class MainPageStoreService {
  public isListLoading = new ObservableItem(true);
  public filtersWithPage = new ObservableItem<FiltersWithPage>({
    ...INITIAL_FILTERS,
    page: 1,
  });
}
