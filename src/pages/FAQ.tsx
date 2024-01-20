import { pluginUrl } from '../app/constants';
import { PageTitle } from '../components/elements';
import { PageContainer } from '../components/layout';

const FAQ = () => {
  return (
    <PageContainer>
      <PageTitle title='FAQ' />
      <div className='flex justify-around text-lg p-2'>
        <div className='p-2'>
          <h3>How do I upload my collection log?</h3>
          <ol className='list-decimal text-white ml-3'>
            <li>
              <p>Install the <a href={pluginUrl}>Collection Log RuneLite plugin</a> from the RuneLite plugin hub.</p>
            </li>
            <li>
              <p>Open your collection log in-game and click through all pages in order to save a copy of your collection log.</p>
            </li>
            <li>
              <p>In the collection log plugin side panel click the "Upload collection log data" or log out of the game.</p>
            </li>
            <li>
              <p>Wait about 30 seconds for the upload to process. (Subsequent uploads will be much faster)</p>
            </li>
            <li>
              <p>Any new items received will have to have their respective collection log pages viewed in order to send the most up to date data to the website.</p>
            </li>
          </ol>
        </div>
        <div className='p-2'>
          <h3>My collection log on the site is not updating</h3>
          <ol className='list-decimal text-white ml-3'>
            <li>
              <p>In the collection log plugin side panel click the "Reset collection log data" button and click through your collection log again.</p>
            </li>
            <li>
              <p>Attempt to upload your collection log data by clicking the "Upload collection log data" button or by logging out.</p>
            </li>
            <li>
              <p>Send a message in the Log Hunters Discord server #report-a-bug chat channel detailing your issues</p>
            </li>
          </ol>
        </div>
      </div>
    </PageContainer>
  );
};

export default FAQ;
