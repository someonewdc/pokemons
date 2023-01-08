import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  RadioButtonsControlComponent,
  SelectControlComponent,
  TextControlComponent,
} from '@app/controls';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  skip,
  startWith,
  takeUntil,
} from 'rxjs';
import { MainPageFacadeService } from '@app/pages/main-page/services';
import {
  RARITY_OPTIONS,
  STAGES_OPTIONS,
} from '@app/pages/main-page/components/filters/filters.constants';
import { DestroyService } from '@app/shared/services';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TextControlComponent,
    ReactiveFormsModule,
    SelectControlComponent,
    RadioButtonsControlComponent,
  ],
  providers: [DestroyService],
})
export class FiltersComponent {
  public form = this.fb.nonNullable.group({
    name: this.facade.filtersWithPage.name,
    stages: this.fb.control(this.facade.filtersWithPage.stages, {
      nonNullable: true,
    }),
    rarity: this.facade.filtersWithPage.rarity,
  });

  public readonly stagesOptions = STAGES_OPTIONS;
  public readonly rarityOptions = RARITY_OPTIONS;

  private get nameControl() {
    return this.form.get('name')!;
  }

  private get stagesControl() {
    return this.form.get('stages')!;
  }

  private get rarityControl() {
    return this.form.get('rarity')!;
  }

  private get nameValueChanges() {
    return this.nameControl.valueChanges.pipe(
      startWith(this.nameControl.value),
      debounceTime(200),
      distinctUntilChanged()
    );
  }

  private get stagesValueChanges() {
    return this.stagesControl.valueChanges.pipe(
      startWith(this.stagesControl.value),
      debounceTime(200)
    );
  }

  private get rarityValueChanges() {
    return this.rarityControl.valueChanges.pipe(
      startWith(this.rarityControl.value),
      debounceTime(200),
      distinctUntilChanged()
    );
  }

  constructor(
    private fb: FormBuilder,
    private facade: MainPageFacadeService,
    private destroy$: DestroyService
  ) {
    combineLatest([
      this.nameValueChanges,
      this.stagesValueChanges,
      this.rarityValueChanges,
    ])
      .pipe(
        skip(1),
        map(([name, stages, rarity]) => ({ name, stages, rarity })),
        takeUntil(this.destroy$)
      )
      .subscribe(filters => {
        this.facade.setFilters(filters, { resetPage: true });
      });
  }
}
