/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import BlogPage from './page';

let receivedPostCount = 0;
let receivedFeaturedCount = 0;

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

vi.mock('@/components/BlogIndexClient', () => ({
  default: ({ posts }: { posts: Array<{ featured?: boolean }> }) => {
    receivedPostCount = posts.length;
    receivedFeaturedCount = posts.filter(post => post.featured).length;
    return (
      <div data-testid="blog-index-client">
        post-count:{receivedPostCount};featured:{receivedFeaturedCount}
      </div>
    );
  },
}));

describe('Blog Page', () => {
  it('renders heading, RSS link, and passes post data to index client', () => {
    render(<BlogPage />);

    expect(screen.getByRole('heading', { name: 'Health & Fitness Blog' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'RSS Feed' })).toHaveAttribute('href', '/feed.xml');
    expect(screen.getByTestId('blog-index-client')).toBeInTheDocument();
    expect(receivedPostCount).toBeGreaterThan(40);
    expect(receivedFeaturedCount).toBeGreaterThan(0);
  });

  it('renders calculator cross-link section', () => {
    render(<BlogPage />);

    expect(
      screen.getByRole('heading', { name: 'Looking for Our Calculators?' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Body Fat Calculator/i })).toHaveAttribute(
      'href',
      '/body-fat'
    );
    expect(screen.getByRole('link', { name: /TDEE Calculator/i })).toHaveAttribute('href', '/tdee');
    expect(screen.getByRole('link', { name: 'View all calculators →' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
