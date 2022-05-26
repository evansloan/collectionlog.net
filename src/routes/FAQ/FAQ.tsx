import { Container } from '@components/layout';

const FAQ = () => (
  <Container bgColor='bg-primary'>
    <div className='flex flex-col border-4 border-black'>
      <div className='w-full border-b-4 border-black'>
        <h1 className='p-4 text-center'>Frequently Asked Questions</h1>
      </div>
      <div className='flex flex-row flex-wrap justify-around'>
        <div className='w-1/2'>
          <h2 className='text-yellow'>Why is my log data incorrect/not updating?</h2>
          <ul className='mx-4 p-[15px] text-[18px] text-white list-disc'>
            <li>Make sure you have the "Upload collection log data" config enabled in the Runelite plugin.</li>
            <li>Click through your collection log in game to ensure the plugin has updated collection log data.</li>
            <li>Click the "Recalculate totals" button in the plugin sidebar.</li>
            <li>
              If all else fails, delete your character's collection log save file by clicking the "Reset collection log data" button in the plugin sidebar.
              Repeat the initial setup steps to get a fresh copy of your collection log data.
            </li>
          </ul>
        </div>
        <div className='w-1/2'>
          <h2 className='text-yellow'>Have a question or problem?</h2>
          <ul className='mx-4 p-[15px] text-[18px] text-white list-disc'>
            <li>Join the <a className='text-orange text-center' href='https://discord.gg/cFVa9BRSEN'>Log hunters Discord server</a></li>
            <li>Submit an issue on <a className='text-orange text-center' href='https://github.com/evansloan/collectionlog.net/issues'>GitHub</a></li>
          </ul>
        </div>
      </div>
    </div>
  </Container>
);

export default FAQ;
