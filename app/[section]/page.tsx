import { HomeContent } from '@/components/home';
import { Card } from '@/components/ui/card';

interface HomeProps {
  params: {
    section: string;
  };
}

const Home = async ({ params: { section } }: HomeProps) => {
  return (
    <main className='flex flex-col items-center justify-between'>
      <Card className='w-full border-0 border-b-2 border-t-2 border-black md:border-4'>
        <HomeContent section={section} />
      </Card>
    </main>
  );
};

export default Home;
