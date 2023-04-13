import renderer from 'react-test-renderer';
import Button from './Button';

import discordIcon from '../../assets/images/discord.png';
import githubIcon from '../../assets/images/github.png';

describe(`${Button.name} component`, () => {
  test.each(['Search', 'Show Options'])(
    'should render with title %p',
    (title: string) => {
      const render = renderer.create(<Button title={title}/>).toJSON();
      expect(render).toMatchSnapshot();
    });

  test.each([
    ['discord', discordIcon],
    ['github', githubIcon],
  ])(
    'should render with icon %p',
    (iconAltText: string, iconBase64: string) => {
      const render = renderer.create(<Button title='test' icon={iconBase64} iconAlt={iconAltText}/>).toJSON();
      expect(render).toMatchSnapshot();
    });

  test.each(['https://runelite.net/', 'https://example.com'])(
    'should render with external link %p',
    (externalLink: string) => {
      const render = renderer.create(<Button title='test' externalLink={externalLink}/>).toJSON();
      expect(render).toMatchSnapshot();
    }
  );
});

