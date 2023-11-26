import DocumentMeta from 'react-document-meta';

import { useRecentItems } from '../app/hooks/collection-log';
import { useTwitchStreams } from '../app/hooks/twitch';
import { useUserCount } from '../app/hooks/user';
import logIcon from '../assets/images/collectionlog.png';
import discordIcon from '../assets/images/discord.png';
import githubIcon from '../assets/images/github.png';
import { discordUrl, gitHubUrl, pluginUrl } from '../app/constants';
import {
  Button,
  Item,
  PageTitle,
  Spinner,
  Tabs,
} from '../components/elements';
import { PageContainer, PageHeader } from '../components/layout';
import AnalyticsService from '../services/analytics';
import { formatDate } from '../utils';

const Home = () => {
  const { recentItems, isLoading } = useRecentItems({ global: true });
  const { userCount } = useUserCount();
  const { streams } = useTwitchStreams();

  const pageTitle = 'Collection Log';

  const meta = {
    title: pageTitle,
    property: {
      'og:title': pageTitle,
      'twitter:title': pageTitle,
    },
    auto: {
      ograph: true,
    },
  };

  return (
    <PageContainer>
      <DocumentMeta {...meta} />
      <h3 className='text-yellow text-center'>
        Collection log uploads are currently disabled
      </h3>
      <PageHeader>
        <PageTitle
          title='collectionlog.net'
          description={`${userCount} users clogging`}
          icon={logIcon}
        />
      </PageHeader>
      <div className='flex flex-col md:mx-3 mb-3 md:mt-1 h-full border-2 border-t-0 border-light md:rounded-tr-[10px] md:rounded-tl-[10px] overflow-hidden'>
        <Tabs>
          <div data-tab='Recent items'>
            {isLoading ?
              <div className='flex justify-center items-center h-[90%]'>
                <Spinner />
              </div>
              :
              <div className='h-full overflow-hidden'>
                <h3 className='text-center'>Recent global items</h3>
                <p className='text-center'>Updates every 10 minutes</p>
                <div className='flex flex-col md:flex-row items-center flex-wrap h-full px-4 pb-6 overflow-y-auto'>
                  {recentItems?.map((item, i) => {
                    return (
                      <div key={`${i}-${item.id}`} className='flex items-center w-1/2 sm:1/3 md:1/4 lg:w-1/5 mb-2 md:mb-5'>
                        <Item item={item} showQuantity={false} isDetail={true} />
                        <div className='flex flex-col flex-1 items-center md:items-start'>
                          <a className='text-lg' href={`/log/${item.username}`}>{item.username}</a>
                          <p>{item.name}</p>
                          <p>{formatDate(item.obtainedAt as string)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            }
          </div>
          <div data-tab='Live streams'>
            <div className='h-full overflow-hidden'>
              {streams == undefined ?
                <div className='flex justify-center items-center h-[90%]'>
                  <Spinner />
                </div>
                :
                <div className='flex justify-evenly flex-wrap mt-2'>
                  {streams.length == 0 ?
                    <h3>No live streams</h3>
                    :
                    streams.map((stream, i) => {
                      return (
                        <a
                          key={`${stream.title}-${i}`}
                          className='w-1/4 text-center no-underline'
                          href={`https://twitch.tv/${stream.user_login}`}
                          onClick={() => AnalyticsService.twitchNavEvent(stream.user_name)}
                        >
                          <img className='m-auto' src={stream.thumbnail_url.replace(/{width}/g, '150').replace(/{height}/g, '100')} />
                          <h4 className='px-2 text-orange font-bold overflow-hidden text-ellipsis whitespace-nowrap'>{stream.title}</h4>
                          <p>{stream.user_name}</p>
                        </a>
                      );
                    })
                  }
                </div>
              }
            </div>
          </div>
          <div data-tab='FAQ'>
            <div className='flex justify-around text-lg'>
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
          </div>
          <div data-tab='Contribute'>
            <div className='flex justify-around items-center h-1/2 p-2 text-lg text-center'>
              <div className='flex-1'>
                <p>Join the Log Hunters Discord server to gain access to collection log guides and more</p>
                <Button
                  type='button'
                  icon={discordIcon}
                  className='block w-1/3 m-auto bg-[#6A5ACD] hover:bg-[#6d67b6] text-lg'
                  title='Open in Discord'
                  externalLink={discordUrl}
                  onClick={() => AnalyticsService.discordNavEvent('contribute')}
                />
              </div>
              <div className='flex-1'>
                <p>collectionlog.net is open source and open to contributions</p>
                <Button
                  type='button'
                  icon={githubIcon}
                  className='block w-1/3 m-auto bg-black hover:bg-gray-500 text-lg'
                  title='View on GitHub'
                  externalLink={gitHubUrl}
                  onClick={() => AnalyticsService.githubNavEvent('contribute')}
                />
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Home;
