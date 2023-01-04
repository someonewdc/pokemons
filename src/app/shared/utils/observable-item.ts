import { BehaviorSubject, Observable } from 'rxjs';

export class ObservableItem<T> {
  private readonly subj$: BehaviorSubject<T>;

  constructor(initialValue: T) {
    this.subj$ = new BehaviorSubject<T>(initialValue);
  }

  public getValue$() {
    return this.subj$ as Observable<T>;
  }

  public getValue() {
    return this.subj$.value;
  }

  public setValue(value: T) {
    this.subj$.next(value);
  }
}
