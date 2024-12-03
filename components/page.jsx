import Head from 'next/head';
import Appbar from '../components/appbar'; // Adjusted path if necessary
import BottomNav from '../components/bottom-nav';

const Page = ({ title, children }) => (
  <>
    {title ? (
      <Head>
        <title>Rice Bowl | {title}</title>
      </Head>
    ) : null}

    <Appbar />

    <main className='mx-auto max-w-screen-md pt-20 pb-16 px-safe sm:pb-0 bg-transparent'>
      <div className='p-6'>{children}</div>
    </main>

    <BottomNav />
  </>
);

export default Page;