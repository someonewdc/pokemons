import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-buttons-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-buttons-control.component.html',
  styleUrls: ['./radio-buttons-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonsControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonsControlComponent implements ControlValueAccessor {
  public value!: string;
  public onChange!: (value: string) => void;

  @Input() options!: readonly string[];

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  writeValue(value: string): void {
    this.value = value;
  }

  public selectButton(value: string) {
    this.value = value;
    this.onChange(value);
  }
}
