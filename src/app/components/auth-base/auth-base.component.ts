import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-base',
  templateUrl: './auth-base.component.html',
  styleUrls: ['./auth-base.component.scss']
})
export class AuthBaseComponent implements OnInit {
  currentYear: number;

  constructor() { }

  ngOnInit(): void {
    this.currentYear = Date.now();
  }

}
