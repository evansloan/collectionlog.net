const Header = () => (
  <div id='header' className='flex flex-wrap justify-around mx-10px text-[20px] text-center'>
    <a href='/'>Home</a>
    <a href='/hiscores/unique/1'>Unique Hiscores</a>
    <a href='/hiscores/total/1'>Total Hiscores</a>
    <a id='discord-invite' href='https://discord.gg/cFVa9BRSEN'>
      <img className='inline-block w-[30px] mt-[-6px] pr-[5px] ' src='/img/discord.svg'></img>
      Join the Log Hunters Discord Server
    </a>
  </div>
);

export default Header;
