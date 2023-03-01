import { gitHubUrl, pluginUrl } from '../../constants/Urls';

const Footer = () => {
  return (
    <footer className='flex flex-wrap justify-around w-full mt-2 p-2 bg-primary border-t-4 border-t-black text-sm text-center shadow-log'>
      <p>
        Oldschool Runescape is a trademark of {' '}
        <a href='https://www.jagex.com/en-GB/'>Jagex Ltd.</a>
      </p>
      <p>
        Install the {' '}
        <a href={pluginUrl}>Collection Log plugin</a> {' '}
        on {' '}
        <a href='https://runelite.net'>RuneLite</a>
      </p>
      <p>
        Have a problem or found a bug? Submit an issue on {' '}
        <a href={gitHubUrl + '/issues/new/choose'}>GitHub</a>
      </p>
    </footer>
  );
};

export default Footer;
