import { IconName } from '@fortawesome/free-solid-svg-icons';

export type MenuType = {
  itemKey: number;
  title: string;
  name?: string;
  icon?: React.ReactNode | IconName;
  link?: string;
  items?: MenuType[];
  size?: 'small' | undefined;
  type?: 'divider' | 'text' | undefined;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};
