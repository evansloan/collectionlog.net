import './Header.scss';

const Header = () => (
  <div id='header' className='d-flex justify-content-around text-center'>
    <a href='/'>Home</a>
    <a href='/hiscores/unique/1'>Unique Hiscores</a>
    <a href='/hiscores/total/1'>Total Hiscores</a>
    <a id='discord-invite' href='https://discord.gg/cFVa9BRSEN'>
      <img src='/img/discord.svg'></img>
      Join the Log Hunters Discord Server
    </a>
  </div>
);

export default Header;
