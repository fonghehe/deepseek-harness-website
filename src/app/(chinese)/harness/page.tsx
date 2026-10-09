import { LandingPage } from '@/components/landing-page';
import { websiteMetadata } from '@/lib/website-metadata';

export const dynamic = 'force-dynamic';
export const generateMetadata = () => websiteMetadata('zh');
export default function Page() {
  return <LandingPage locale="zh" />;
}
