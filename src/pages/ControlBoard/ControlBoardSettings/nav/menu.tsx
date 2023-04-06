import React from 'react';
import { ReactComponent as EmailPushSvg } from 'static/images/icons/email-push.svg';
import { ReactComponent as FtpPushSvg } from 'static/images/icons/ftp-push.svg';
import FlextradePushIcon from 'static/images/icons/flextrade-push.png';
import { MenuType } from 'models/nav';

export const navItems: MenuType[] = [
  {
    itemKey: 0,
    title: 'Push Settings',
    link: '/control-board/settings/settings-push',
    items: [
      {
        itemKey: 0,
        icon: <EmailPushSvg />,
        title: 'Email',
        link: '/control-board/settings/settings-push/push-email',
        items: []
      },
      {
        itemKey: 1,
        icon: <FtpPushSvg />,
        title: 'Slack',
        link: '/control-board/settings/settings-push/slack',
        items: [],
        disabled: true
      },
      {
        itemKey: 2,
        icon: <FtpPushSvg />,
        title: 'Microsoft Teams',
        link: '/control-board/settings/settings-push/microsoft-teams',
        items: [],
        disabled: true
      }
    ],
    isActive: true
  },
  {
    itemKey: 1,
    title: 'Limit Settings',
    link: '/control-board/settings/settings-limit',
    items: [
      {
        itemKey: 0,
        title: 'Coming Soon',
        link: '/control-board/settings/settings-limit/come',
        items: [],
        disabled: true
      }
    ]
  },
  {
    itemKey: 2,
    title: 'Other Settings',
    link: '/control-board/settings/settings-other',
    items: [
      {
        itemKey: 0,
        title: 'Coming Soon',
        link: '/control-board/settings/settings-other/come',
        items: [],
        disabled: true
      }
    ]
  }
];
