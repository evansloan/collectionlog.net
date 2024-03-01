import renderer from 'react-test-renderer';

import NavLink from '@/components/nav-link';
import { DISCORD_URL } from '@/lib/constants';

import HomeIcon from '@/assets/images/home.png';
import HiscoresIcon from '@/assets/images/stats.png';
import DiscordIcon from '@/assets/images/discord.png';

describe(`${NavLink.displayName} component`, () => {
  const links = [
    {
      name: 'Home',
      icon: HomeIcon,
      href: '/home',
    }, {
      name: 'Hiscores',
      icon: HiscoresIcon,
      href: '/hiscores',
    }, {
      name: 'Join the Log Hunters Discord server',
      icon: DiscordIcon,
      href: DISCORD_URL,
    },
  ];

  test.each(links)(
    'should render with name "$name", icon $icon, href "$href"',
    ({ name, icon, href }) => {
      const render = renderer.create(
        <NavLink icon={icon} href={href}>{name}</NavLink>
      ).toJSON();
      expect(render).toMatchSnapshot();
    });
});