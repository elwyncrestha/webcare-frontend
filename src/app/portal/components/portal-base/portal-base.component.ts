import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal-base',
  templateUrl: './portal-base.component.html',
  styleUrls: ['./portal-base.component.scss']
})
export class PortalBaseComponent implements OnInit {
  currentYear: number;

  constructor() { }

  ngOnInit(): void {
    this.currentYear = Date.now();
  }

}
