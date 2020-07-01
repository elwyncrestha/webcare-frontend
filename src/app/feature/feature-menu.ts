import { NbMenuItem } from '@nebular/theme';

export class MenuTitle {
  public static DASHBOARD = 'Dashboard';
  public static USER = 'User';
  public static DEPARTMENT = 'Department';
  public static INVENTORY = 'Inventory';
}

export const MENU_ITEMS: Map<string, NbMenuItem> = new Map([
  [MenuTitle.DASHBOARD, {
    title: MenuTitle.DASHBOARD,
    icon: 'home-outline',
    link: '/feature/dashboard',
    home: true,
  }],
  [MenuTitle.USER, {
    title: MenuTitle.USER,
    icon: 'people-outline',
    link: '/feature/users',
  }],
  [MenuTitle.DEPARTMENT, {
    title: MenuTitle.DEPARTMENT,
    icon: 'grid-outline',
    link: '/feature/departments'
  }],
  [MenuTitle.INVENTORY, {
    title: MenuTitle.INVENTORY,
    icon: 'shopping-cart-outline',
    link: '/feature/inventory'
  }],
]);
