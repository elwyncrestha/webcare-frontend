import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { MENU_ITEMS, MenuTitle } from './feature-menu';
import { LocalStorageUtils, EnumUtils } from '../@core/utils';
import { UserType } from '../@core/enums';

@Component({
  selector: 'app-feature',
  template: `
    <app-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-one-column-layout>
  `,
  styleUrls: ['./feature.component.scss'],
})
export class FeatureComponent implements OnInit {
  menu: NbMenuItem[] = [];

  constructor() {}

  ngOnInit() {
    this.resolveSideBarRoutes();
  }

  private resolveSideBarRoutes(): void {
    this.menu = [];
    this.menuPush([MenuTitle.DASHBOARD]);
    switch (LocalStorageUtils.getStorage().userType) {
      case EnumUtils.getEnum(UserType, UserType.SUPER_ADMINISTRATOR):
      case EnumUtils.getEnum(UserType, UserType.ADMINISTRATOR):
        this.menuPush([
          MenuTitle.USER,
          MenuTitle.DEPARTMENT,
          MenuTitle.INVENTORY,
          MenuTitle.APPOINTMENT,
        ]);
        break;
      case EnumUtils.getEnum(UserType, UserType.DOCTOR):
      case EnumUtils.getEnum(UserType, UserType.RECEPTIONIST):
        this.menuPush([MenuTitle.APPOINTMENT]);
        break;
    }
  }

  private menuPush(menuTitle: string[]): void {
    menuTitle.forEach((t) => this.menu.push(MENU_ITEMS.get(t)));
  }
}
