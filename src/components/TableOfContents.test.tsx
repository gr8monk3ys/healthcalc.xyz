import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import TableOfContents from './TableOfContents';

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe = mockObserve;
  unobserve = vi.fn();
  disconnect = mockDisconnect;
}

describe('TableOfContents', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    // Clean up DOM safely
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  function setupDOM(headings: { tag: string; text: string; id?: string }[]): void {
    const container = document.createElement('div');
    container.className = 'prose';
    headings.forEach(({ tag, text, id }) => {
      const el = document.createElement(tag);
      el.textContent = text;
      if (id) el.id = id;
      container.appendChild(el);
    });
    document.body.appendChild(container);
  }

  /** Helper to get the TOC nav element for scoped queries */
  function getTocNav(): HTMLElement {
    return screen.getByRole('navigation', { name: /table of contents/i });
  }

  describe('Rendering', () => {
    it('should return null when no headings found', () => {
      const { container } = render(<TableOfContents />);
      expect(container.textContent).toBe('');
    });

    it('should render TOC items from headings', () => {
      setupDOM([
        { tag: 'h2', text: 'Overview', id: 'overview' },
        { tag: 'h2', text: 'Results', id: 'results' },
      ]);

      render(<TableOfContents />);
      const nav = getTocNav();

      expect(within(nav).getByText('Overview')).toBeInTheDocument();
      expect(within(nav).getByText('Results')).toBeInTheDocument();
    });

    it('should render default title', () => {
      setupDOM([{ tag: 'h2', text: 'Section', id: 'section' }]);
      render(<TableOfContents />);
      expect(screen.getByText('Table of Contents')).toBeInTheDocument();
    });

    it('should render custom title', () => {
      setupDOM([{ tag: 'h2', text: 'Section', id: 'section' }]);
      render(<TableOfContents title="On This Page" />);
      expect(screen.getByText('On This Page')).toBeInTheDocument();
    });

    it('should have nav with aria-label', () => {
      setupDOM([{ tag: 'h2', text: 'Section', id: 'section' }]);
      render(<TableOfContents />);
      expect(screen.getByRole('navigation', { name: /table of contents/i })).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      setupDOM([{ tag: 'h2', text: 'Section', id: 'section' }]);
      const { container } = render(<TableOfContents className="sticky top-0" />);
      expect(container.firstChild).toHaveClass('sticky');
      expect(container.firstChild).toHaveClass('top-0');
    });
  });

  describe('Heading levels', () => {
    it('should include h2 and h3 by default', () => {
      setupDOM([
        { tag: 'h2', text: 'Main Section', id: 'main' },
        { tag: 'h3', text: 'Sub Section', id: 'sub' },
      ]);

      render(<TableOfContents />);
      const nav = getTocNav();

      expect(within(nav).getByText('Main Section')).toBeInTheDocument();
      expect(within(nav).getByText('Sub Section')).toBeInTheDocument();
    });

    it('should respect maxLevel prop', () => {
      setupDOM([
        { tag: 'h2', text: 'Level 2', id: 'l2' },
        { tag: 'h3', text: 'Level 3', id: 'l3' },
        { tag: 'h4', text: 'Level 4', id: 'l4' },
      ]);

      render(<TableOfContents maxLevel={2} />);
      const nav = getTocNav();

      // TOC should only include h2 (level 2)
      expect(within(nav).getByText('Level 2')).toBeInTheDocument();
      expect(within(nav).queryByText('Level 3')).not.toBeInTheDocument();
      expect(within(nav).queryByText('Level 4')).not.toBeInTheDocument();
    });

    it('should indent h3+ items', () => {
      setupDOM([
        { tag: 'h2', text: 'Parent', id: 'parent' },
        { tag: 'h3', text: 'Child', id: 'child' },
      ]);

      render(<TableOfContents />);
      const nav = getTocNav();

      const childLink = within(nav).getByText('Child');
      const childItem = childLink.closest('li');
      expect(childItem).toHaveClass('ml-4');
    });
  });

  describe('ID generation', () => {
    it('should auto-generate IDs for headings without them', () => {
      setupDOM([{ tag: 'h2', text: 'My Section Title' }]);

      render(<TableOfContents />);

      const heading = document.querySelector('.prose h2');
      expect(heading?.id).toBe('my-section-title');
    });

    it('should preserve existing heading IDs', () => {
      setupDOM([{ tag: 'h2', text: 'Section', id: 'custom-id' }]);

      render(<TableOfContents />);

      const heading = document.querySelector('.prose h2');
      expect(heading?.id).toBe('custom-id');
    });
  });

  describe('Navigation', () => {
    it('should render anchor links with href', () => {
      setupDOM([{ tag: 'h2', text: 'Section', id: 'section' }]);

      render(<TableOfContents />);
      const nav = getTocNav();

      const link = within(nav).getByText('Section').closest('a');
      expect(link).toHaveAttribute('href', '#section');
    });

    it('should call scrollIntoView on click', () => {
      setupDOM([{ tag: 'h2', text: 'Section', id: 'section' }]);
      const mockScrollIntoView = vi.fn();
      const heading = document.getElementById('section');
      if (heading) heading.scrollIntoView = mockScrollIntoView;

      render(<TableOfContents />);
      const nav = getTocNav();

      const link = within(nav).getByText('Section').closest('a')!;
      fireEvent.click(link);

      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });
  });

  describe('Custom selectors', () => {
    it('should use custom contentSelector', () => {
      const container = document.createElement('div');
      container.className = 'custom-content';
      const h2 = document.createElement('h2');
      h2.textContent = 'Custom Section';
      h2.id = 'custom';
      container.appendChild(h2);
      document.body.appendChild(container);

      render(<TableOfContents contentSelector=".custom-content" />);
      const nav = getTocNav();

      expect(within(nav).getByText('Custom Section')).toBeInTheDocument();
    });

    it('should use custom headingSelector', () => {
      setupDOM([
        { tag: 'h2', text: 'Included', id: 'inc' },
        { tag: 'h3', text: 'Also Included', id: 'also' },
      ]);

      render(<TableOfContents headingSelector="h2" />);
      const nav = getTocNav();

      expect(within(nav).getByText('Included')).toBeInTheDocument();
      // h3 should NOT be in the TOC since headingSelector is only "h2"
      expect(within(nav).queryByText('Also Included')).not.toBeInTheDocument();
    });
  });

  describe('IntersectionObserver', () => {
    it('should set up observer for heading elements', () => {
      setupDOM([
        { tag: 'h2', text: 'Section 1', id: 'section-1' },
        { tag: 'h2', text: 'Section 2', id: 'section-2' },
      ]);

      render(<TableOfContents />);

      expect(mockObserve).toHaveBeenCalledTimes(2);
    });

    it('should disconnect observer on unmount', () => {
      setupDOM([{ tag: 'h2', text: 'Section', id: 'section' }]);

      const { unmount } = render(<TableOfContents />);
      unmount();

      expect(mockDisconnect).toHaveBeenCalled();
    });
  });
});
