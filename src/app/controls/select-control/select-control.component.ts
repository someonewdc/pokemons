import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectOptionComponent } from '@app/controls/select-option/select-option.component';
import { IsValueInListPipe } from '@app/shared/pipes';
import { DisplayListPipe } from '@app/shared/pipes/display-list.pipe';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-select-control',
  standalone: true,
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectControlComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    SelectOptionComponent,
    IsValueInListPipe,
    DisplayListPipe,
  ],
  animations: [
    trigger('optionsInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.15s ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('.15s ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectControlComponent implements ControlValueAccessor {
  public value!: string[];
  public onChange!: (value: string[]) => void;
  public isOptionsOpen = false;

  private elementRef = inject(ElementRef);

  @Input() options!: string[];
  @Input() label!: string;

  @HostListener('document:click', ['$event'])
  listClickHandler(event: Event) {
    const isCLickOnList = this.elementRef.nativeElement.contains(event.target);
    if (!isCLickOnList) {
      this.isOptionsOpen = false;
    }
  }

  writeValue(value: string[]): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  selectOption(value: string): void {
    const listWithoutSelectedValue = this.value.filter(
      option => option !== value
    );
    const isValueAlreadySelected =
      listWithoutSelectedValue.length < this.value.length;

    if (isValueAlreadySelected) {
      this.value = listWithoutSelectedValue;
    }

    if (!isValueAlreadySelected) {
      this.value = [...this.value, value];
    }

    this.onChange(this.value);
  }
}
