import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  private loginEvent = new BehaviorSubject<string>('');
  public apiNotify: BehaviorSubject<boolean> = new BehaviorSubject(false);

  emitChildEvent(name: string) {
    this.loginEvent.next(name);
  }

  childEventListner() {
    return this.loginEvent.asObservable();
  }
}
