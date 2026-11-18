import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AFFILIATE_DISCLOSURE } from '@/constants/affiliates';
import { BLOG_REGISTRY } from '@/lib/blog/registry';
import BlogPost from './page.client';

const params = vi.hoisted(() => ({ slug: '' }));

vi.mock('next/navigation', () => ({
  useParams: () => params,
  notFound: () => {
    throw new Error('notFound');
  },
}));

vi.mock('next/dynamic', () => ({
  default: () =>
    function PostContent() {
      return (
        <article data-testid="post-content">
          <a
            href="https://www.amazon.com/dp/B0TEST?tag=test-20"
            rel="noopener noreferrer sponsored"
          >
            Check price on Amazon
          </a>
          <a href="/bmi">BMI calculator</a>
        </article>
      );
    },
}));

vi.mock('@/components/BlogEmailCapture', () => ({ BlogEmailCapture: () => null }));

const trackEvent = vi.hoisted(() => vi.fn());

vi.mock('@/hooks/useFunnelTracking', () => ({
  useFunnelTracking: () => ({ canTrack: true, trackEvent }),
}));

const affiliatePost = BLOG_REGISTRY.find(post => post.affiliate)!;
const editorialPost = BLOG_REGISTRY.find(post => !post.affiliate)!;

function renderPost(slug: string) {
  params.slug = slug;
  return render(<BlogPost />);
}

describe('blog post shell', () => {
  it('shows the Amazon disclosure above the content of affiliate posts', () => {
    renderPost(affiliatePost.slug);

    const disclosure = screen.getByText(AFFILIATE_DISCLOSURE.short);
    const content = screen.getByTestId('post-content');

    expect(AFFILIATE_DISCLOSURE.short).toContain(
      'As an Amazon Associate I earn from qualifying purchases.'
    );
    expect(AFFILIATE_DISCLOSURE.full).toContain(
      'As an Amazon Associate I earn from qualifying purchases.'
    );
    expect(
      disclosure.compareDocumentPosition(content) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it('shows no disclosure on posts without affiliate links', () => {
    renderPost(editorialPost.slug);

    expect(screen.getByTestId('post-content')).toBeInTheDocument();
    expect(screen.queryByText(/Amazon Associate/)).toBeNull();
  });

  it('fires affiliate_click only for sponsored links in the post body', () => {
    renderPost(affiliatePost.slug);
    // jsdom does not implement navigation.
    screen.getByTestId('post-content').addEventListener('click', event => event.preventDefault());

    fireEvent.click(screen.getByText('BMI calculator'));
    expect(trackEvent).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText('Check price on Amazon'));
    expect(trackEvent).toHaveBeenCalledExactlyOnceWith('affiliate_click', {
      kind: 'blog',
      post: affiliatePost.slug,
      destination: 'https://www.amazon.com/dp/B0TEST?tag=test-20',
    });
  });
});
