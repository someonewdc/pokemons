import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOptionComponent {
  @Input() option!: string;
  @Input() isOptionSelected = false;

  @Output() selectionChange = new EventEmitter<string>();

  @HostListener('click') selectOption() {
    this.selectionChange.emit(this.option);
  }

  get arrowVisibility() {
    return this.isOptionSelected ? 'visible' : 'hidden';
  }
}
