import { NbMenuItem } from '@nebular/theme';

export class MenuTitle {
  public static DASHBOARD = 'Dashboard';
  public static USER = 'User';
  public static USER_ALL = 'All';
  public static DEPARTMENT = 'Department';
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
    children: [
      {
        title: MenuTitle.USER_ALL,
        icon: 'people-outline',
        link: '/feature/users/all',
      },
    ]
  }],
  [MenuTitle.DEPARTMENT, {
    title: MenuTitle.DEPARTMENT,
    icon: 'grid-outline',
    link: '/feature/departments'
  }],
]);
