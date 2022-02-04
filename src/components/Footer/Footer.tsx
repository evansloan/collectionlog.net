import './Footer.scss';

const Footer = () => (
  <div id='footer' className='d-flex flex-column flex-sm-row justify-content-center justify-content-sm-around text-center'>
    <p>Oldschool RuneScape is a trademark of <a href='https://www.jagex.com/en-GB/'>Jagex Ltd.</a></p>
    <p>Images provided by <a href='https://www.osrsbox.com/'>OSRSBox</a></p>
    <p>Install the <a href='https://runelite.net/plugin-hub/show/collection-log'>Collection Log plugin</a> on <a href='https://runelite.net'>Runelite</a></p>
    <p>Have a problem? Submit an issue on <a href='https://github.com/evansloan/collectionlog.net/issues/new/choose'>GitHub</a></p>
    <p><a href='/faq'>FAQ</a></p>
  </div>
);

export default Footer;
