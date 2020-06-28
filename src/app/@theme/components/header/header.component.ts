import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbSidebarService, NbThemeService, NbMenuService } from '@nebular/theme';

import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LocalStorageUtils } from 'src/app/@core/utils';
import { Router } from '@angular/router';
import { UserType } from 'src/app/@core/enums';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  static LOGOUT = 'Log out';
  static PROFILE = 'Profile';

  userPictureOnly = false;
  currentTheme = 'default';
  contextMenuTag = 'user-context-menu';
  private destroy$: Subject<void> = new Subject<void>();
  public loggedInUser: {
    userId: number,
    userFullName: string,
    userType: string,
  };
  public userMenu = [
    { title: HeaderComponent.PROFILE },
    { title: HeaderComponent.LOGOUT },
  ];
  private UserType = UserType;

  constructor(
    private sidebarService: NbSidebarService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private menuService: NbMenuService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.loggedInUser = {
      userId: Number(LocalStorageUtils.getStorage().userId),
      userFullName: LocalStorageUtils.getStorage().userFullName,
      userType: this.UserType[LocalStorageUtils.getStorage().userType],
    };

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick().pipe(
      filter(({ tag }) => tag === this.contextMenuTag),
      map(({ item: { title } }) => title),
      filter((title) =>
        title === HeaderComponent.LOGOUT ||
        title === HeaderComponent.PROFILE
      ),
    ).subscribe((value) => {
      if (value === HeaderComponent.LOGOUT) {
        this.logout();
      } else if (value === HeaderComponent.PROFILE) {
        this.router.navigate(['/pages/profile']);
      }
    });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  logout() {
    LocalStorageUtils.clearStorage();
    this.router.navigate(['/login']);
  }
}
