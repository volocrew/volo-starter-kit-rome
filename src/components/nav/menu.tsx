import { MenuType } from 'models/nav';

export const navItems: MenuType[] = [
  {
    itemKey: 0,
    icon: 'desktop',
    title: 'Dashboard',
    name: 'dashboard',
    link: '/dashboard',
    items: []
  },
  {
    itemKey: 1,
    icon: 'clipboard-list',
    title: 'Control Board',
    name: 'control-board',
    link: '/control-board',
    items: []
  },
  {
    itemKey: 2,
    type: 'divider',
    title: ''
  },
  {
    itemKey: 3,
    title: 'SETTINGS',
    size: 'small',
    type: 'text',
    items: []
  },
  {
    itemKey: 4,
    icon: 'cog',
    title: 'Main settings',
    name: 'mainSettings',
    link: '/control-board/settings',
    items: []
  },
  {
    itemKey: 5,
    icon: 'bell',
    title: 'Notifications',
    name: 'notifications',
    link: '/notifications',
    items: []
  },
  {
    itemKey: 6,
    icon: 'palette',
    title: 'Preferences',
    name: 'preferences',
    link: '/preferences',
    items: []
  }
];
