import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { MENU_ITEMS, MenuTitle } from './feature-menu';

@Component({
  selector: 'app-feature',
  template: `
    <app-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-one-column-layout>
  `,
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {

  menu: NbMenuItem[] = [];

  constructor() {
  }

  ngOnInit() {
    this.resolveSideBarRoutes();
  }

  private resolveSideBarRoutes(): void {
    this.menu = [];
    this.menuPush([MenuTitle.DASHBOARD]);
    // TODO: Add Menus based on User Types
  }

  private menuPush(menuTitle: string[]): void {
    menuTitle.forEach(t => this.menu.push(MENU_ITEMS.get(t)));
  }

}
