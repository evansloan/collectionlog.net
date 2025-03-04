/* eslint-disable react/no-unescaped-entities */
interface HomeProps {
  params: {
    section: string;
  };
}

const Home = async ({ params: { section } }: HomeProps) => {
  return (
    <main className='flex flex-col items-center justify-between'>
      <h1>collectionlog.net update</h1>
      <p>
        collectionlog.net and it's associated API have been discontinued. Due to lack of time and motivation I have failed to keep the site in good working condition.{' '}
        It became increasingly suggish and quite frankly didn't function half of the time.{' '}
        A recent necessary update made to the backend architecture turned the entire collection.net ecosystem into a trash can due to incompatibilities with several outdated and deprecated libraries the API uses.{' '}
        I simply don't have the desire or the time to get everything fixed up just for it to fall into disarray again in the next 3 or 4 months.{' '}
        I sincerely apologize to all of the developers who use the API, the people who browse collectionlog.net daily, and to anyone who submitted a GitHub issue that I ignored.{' '}
        It was a good couple years though, and I can't thank the <a href='https://discord.gg/log-hunters-922245627092541450'>Log Hunters</a> Discord server for giving the site a place to call home.{' '}
        I'm sure everyone reading this is aware, but the wiki released their own <a href='https://oldschool.runescape.wiki/w/Collection_log/Table'>collection log viewer</a>. It's better than collectionlog.net</p>
      <p>Thank you everyone who used the site and those that helped along the way.</p>
    </main>
  );
};

export default Home;
