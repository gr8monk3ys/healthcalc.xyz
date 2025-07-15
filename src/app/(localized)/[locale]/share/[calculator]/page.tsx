import type { Metadata } from 'next';
import SharePage, {
  generateMetadata as generateDefaultShareMetadata,
} from '../../../../(default)/share/[calculator]/page';

type SharePageProps = Parameters<typeof SharePage>[0];

export async function generateMetadata(props: SharePageProps): Promise<Metadata> {
  return generateDefaultShareMetadata(props);
}

export default SharePage;
