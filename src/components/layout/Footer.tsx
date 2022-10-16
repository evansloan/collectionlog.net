const Footer = () => {
  return (
    <footer className='flex flex-wrap justify-around w-full mt-2 p-2 bg-primary border-t-4 border-t-black text-sm text-center shadow-log'>
      <p>
        Oldschool Runescape is a trademark of {' '}
        <a href='https://www.jagex.com/en-GB/'>Jagex Ltd.</a>
      </p>
      <p>
        Install the {' '}
        <a href='https://runelite.net/plugin-hub/show/collection-log'>Collection Log plugin</a> {' '}
        on {' '}
        <a href='https://runelite.net'>Runelite</a>
      </p>
      <p>
        Have a problem or found a bug? Submit an issue on {' '}
        <a href='https://github.com/evansloan/collectionlog.net/issues/new/choose'>Github</a>
      </p>
    </footer>
  );
};

export default Footer;
