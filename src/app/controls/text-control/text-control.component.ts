import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-control',
  standalone: true,
  templateUrl: './text-control.component.html',
  styleUrls: ['./text-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextControlComponent implements ControlValueAccessor {
  public value!: string;
  public onChange!: (value: string) => void;

  @Input() label!: string;

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  writeValue(value: string): void {
    this.value = value;
  }

  inputChange(event: Event) {
    const element = event.target as HTMLInputElement;
    this.value = element.value;
    this.onChange(this.value);
  }
}
