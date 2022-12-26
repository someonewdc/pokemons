import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FiltersComponent,
  TableComponent,
} from '@app/pages/main-page/components';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [TableComponent, FiltersComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {}
