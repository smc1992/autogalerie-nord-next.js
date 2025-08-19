
import Link from 'next/link';
import QuickSearch from '../components/QuickSearch';
import GoogleReviews from '../components/GoogleReviews';
import HomeClient from './HomeClient';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HomeClient />
    </div>
  );
}
