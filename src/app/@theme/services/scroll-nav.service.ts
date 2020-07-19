import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollNavService {
  constructor() {}

  public scrollNavigateTo(elementRef: ElementRef): void {
    elementRef.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'start',
    });
  }
}
