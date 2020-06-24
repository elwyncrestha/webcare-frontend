import { NbMenuItem } from '@nebular/theme';

export class MenuTitle {
  public static DASHBOARD = 'Dashboard';
}

export const MENU_ITEMS: Map<string, NbMenuItem> = new Map([
  [MenuTitle.DASHBOARD, {
    title: MenuTitle.DASHBOARD,
    icon: 'home-outline',
    link: '/feature/dashboard',
    home: true,
  }],
]);
