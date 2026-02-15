import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search, { SearchPage } from './Search';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    className,
    onClick,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

// Mock logger
vi.mock('@/utils/logger', () => ({
  createLogger: () => ({
    logError: vi.fn(),
    logWarn: vi.fn(),
    logInfo: vi.fn(),
  }),
}));

// Mock locale context (Search uses useLocale for strings + localized routing)
vi.mock('@/context/LocaleContext', () => ({
  useLocale: () => ({
    locale: 'en',
    setLocale: vi.fn(),
    localizePath: (path: string) => path,
    t: (key: string) => key,
  }),
}));

// Mock fetch for search index
const mockSearchIndex = {
  bmi: {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index',
    url: '/bmi',
    type: 'calculator' as const,
    category: 'Body Composition',
    tags: ['bmi', 'weight', 'health'],
    content: 'Body mass index calculator for adults and children',
  },
  tdee: {
    title: 'TDEE Calculator',
    description: 'Calculate Total Daily Energy Expenditure',
    url: '/tdee',
    type: 'calculator' as const,
    category: 'Metabolism',
    tags: ['tdee', 'calories', 'metabolism'],
  },
  blogPost: {
    title: 'Best BMI Scales',
    description: 'Top rated scales for BMI tracking',
    url: '/blog/best-bmi-scales',
    type: 'article' as const,
    category: 'Reviews',
    tags: ['bmi', 'scales', 'review'],
  },
  privacyPage: {
    title: 'Privacy Policy',
    description: 'How we collect and use information',
    url: '/privacy',
    type: 'page' as const,
    category: 'Legal',
    tags: ['privacy', 'policy'],
  },
};

type SearchProps = React.ComponentProps<typeof Search>;

async function renderSearch(props: SearchProps = {}) {
  const result = render(<Search {...props} />);
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith('/search-index.json');
  });
  return result;
}

describe('Search', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.pushState({}, '', '/');
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockSearchIndex),
    });
  });

  describe('Rendering', () => {
    it('should render search input', async () => {
      await renderSearch();
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('should render with custom placeholder', async () => {
      await renderSearch({ placeholder: 'Find a calculator...' });
      expect(screen.getByPlaceholderText('Find a calculator...')).toBeInTheDocument();
    });

    it('should render default placeholder', async () => {
      await renderSearch();
      expect(screen.getByPlaceholderText('Search calculators, articles...')).toBeInTheDocument();
    });

    it('should render search icon by default', async () => {
      const { container } = await renderSearch();
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should hide search icon when showIcon is false', async () => {
      const { container } = await renderSearch({ showIcon: false });
      // The only SVGs should not include the search icon in the input area
      const searchForm = container.querySelector('form');
      const iconContainer = searchForm?.querySelector('.pointer-events-none svg');
      expect(iconContainer).toBeNull();
    });

    it('should render with initial query', async () => {
      await renderSearch({ initialQuery: 'bmi' });
      expect(screen.getByRole('searchbox')).toHaveValue('bmi');
    });

    it('should apply custom className', async () => {
      const { container } = await renderSearch({ className: 'w-full' });
      expect(container.firstChild).toHaveClass('w-full');
    });

    it('should have search role on form', async () => {
      await renderSearch();
      expect(screen.getByRole('search')).toBeInTheDocument();
    });

    it('should have aria-label on input', async () => {
      await renderSearch();
      expect(screen.getByLabelText('Search')).toBeInTheDocument();
    });
  });

  describe('Search behavior', () => {
    it('should not show results for single character input', async () => {
      await renderSearch();
      const input = screen.getByRole('searchbox');

      fireEvent.change(input, { target: { value: 'b' } });

      await waitFor(() => {
        expect(screen.queryByText('BMI Calculator')).not.toBeInTheDocument();
      });
    });

    it('should show results for queries >= 2 characters', async () => {
      await renderSearch();
      const input = screen.getByRole('searchbox');

      fireEvent.change(input, { target: { value: 'bmi' } });

      await waitFor(() => {
        expect(screen.getByText('BMI Calculator')).toBeInTheDocument();
      });
    });

    it('should clear results when input is cleared', async () => {
      await renderSearch();
      const input = screen.getByRole('searchbox');

      fireEvent.change(input, { target: { value: 'bmi' } });
      await waitFor(() => {
        expect(screen.getByText('BMI Calculator')).toBeInTheDocument();
      });

      fireEvent.change(input, { target: { value: '' } });
      await waitFor(() => {
        expect(screen.queryByText('BMI Calculator')).not.toBeInTheDocument();
      });
    });

    it('should call onSearch callback with results', async () => {
      const onSearch = vi.fn();
      await renderSearch({ onSearch });
      const input = screen.getByRole('searchbox');

      fireEvent.change(input, { target: { value: 'bmi' } });

      await waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith('bmi', expect.any(Array));
      });
    });

    it('should include page-type results in the dropdown', async () => {
      await renderSearch();
      const input = screen.getByRole('searchbox');

      fireEvent.change(input, { target: { value: 'privacy' } });

      await waitFor(() => {
        expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
      });
    });

    it('should re-open results on input focus when query is still valid', async () => {
      await renderSearch();
      const input = screen.getByRole('searchbox');

      fireEvent.change(input, { target: { value: 'bmi' } });
      await waitFor(() => {
        expect(screen.getByText('BMI Calculator')).toBeInTheDocument();
      });

      fireEvent.mouseDown(document.body);
      await waitFor(() => {
        expect(screen.queryByText('BMI Calculator')).not.toBeInTheDocument();
      });

      fireEvent.focus(input);
      await waitFor(() => {
        expect(screen.getByText('BMI Calculator')).toBeInTheDocument();
      });
    });
  });

  describe('Form submission', () => {
    it('should navigate to search page on submit', async () => {
      await renderSearch();
      const input = screen.getByRole('searchbox');

      fireEvent.change(input, { target: { value: 'bmi' } });
      fireEvent.submit(input.closest('form')!);

      expect(mockPush).toHaveBeenCalledWith('/search?q=bmi');
    });

    it('should not navigate when query is too short', async () => {
      await renderSearch();
      const input = screen.getByRole('searchbox');

      fireEvent.change(input, { target: { value: 'b' } });
      fireEvent.submit(input.closest('form')!);

      expect(mockPush).not.toHaveBeenCalled();
    });

    it('should URL-encode the query', async () => {
      await renderSearch();
      const input = screen.getByRole('searchbox');

      fireEvent.change(input, { target: { value: 'body fat %' } });
      fireEvent.submit(input.closest('form')!);

      expect(mockPush).toHaveBeenCalledWith('/search?q=body%20fat%20%25');
    });
  });

  describe('Result display', () => {
    it('should show result descriptions', async () => {
      await renderSearch();
      const input = screen.getByRole('searchbox');

      fireEvent.change(input, { target: { value: 'bmi' } });

      await waitFor(() => {
        expect(screen.getByText('Calculate your Body Mass Index')).toBeInTheDocument();
      });
    });

    it('should show category badges', async () => {
      await renderSearch();
      const input = screen.getByRole('searchbox');

      fireEvent.change(input, { target: { value: 'bmi' } });

      await waitFor(() => {
        expect(screen.getByText('Body Composition')).toBeInTheDocument();
      });
    });

    it('should show "View all results" link when results exist', async () => {
      await renderSearch();
      const input = screen.getByRole('searchbox');

      fireEvent.change(input, { target: { value: 'bmi' } });

      await waitFor(() => {
        expect(screen.getByText(/view all results/i)).toBeInTheDocument();
      });
    });

    it('should navigate when a dropdown result is clicked', async () => {
      await renderSearch();
      const input = screen.getByRole('searchbox');

      fireEvent.change(input, { target: { value: 'bmi' } });

      await waitFor(() => {
        expect(screen.getByText('BMI Calculator')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: /BMI Calculator/i }));
      expect(mockPush).toHaveBeenCalledWith('/bmi');
    });
  });

  describe('Click outside', () => {
    it('should close results when clicking outside', async () => {
      render(
        <div>
          <Search />
          <div data-testid="outside">Outside</div>
        </div>
      );
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/search-index.json');
      });
      const input = screen.getByRole('searchbox');

      fireEvent.change(input, { target: { value: 'bmi' } });
      await waitFor(() => {
        expect(screen.getByText('BMI Calculator')).toBeInTheDocument();
      });

      fireEvent.mouseDown(screen.getByTestId('outside'));
      await waitFor(() => {
        expect(screen.queryByText('BMI Calculator')).not.toBeInTheDocument();
      });
    });
  });

  describe('Error handling', () => {
    it('should handle fetch error gracefully', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      render(<Search />);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });

      // Component should still be functional with empty index
      const input = screen.getByRole('searchbox');
      fireEvent.change(input, { target: { value: 'bmi' } });

      // Should not crash
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });
  });
});

describe('SearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.pushState({}, '', '/');
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockSearchIndex),
    });
  });

  it('renders loading state initially', async () => {
    window.history.pushState({}, '', '/search?q=bmi');
    render(<SearchPage />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/search-index.json');
    });

    expect(screen.getByText('Search Results')).toBeInTheDocument();
    expect(screen.queryByText(/Found .* for "bmi"/)).not.toBeInTheDocument();
  });

  it('renders search results after entering a query', async () => {
    window.history.pushState({}, '', '/search?q=starter');
    render(<SearchPage />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/search-index.json');
    });

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'bmi search' } });

    await waitFor(() => {
      expect(screen.getByText(/Found .* for "bmi search"/)).toBeInTheDocument();
    });

    expect(screen.getAllByText('BMI Calculator').length).toBeGreaterThan(0);
  });

  it('renders no-results fallback with popular calculator links', async () => {
    window.history.pushState({}, '', '/search?q=starter');
    render(<SearchPage />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/search-index.json');
    });

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'zzzzz' } });

    await waitFor(() => {
      expect(screen.getByText('No results found for "zzzzz"')).toBeInTheDocument();
    });

    expect(screen.getByText('Popular Calculators')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'TDEE Calculator' })).toBeInTheDocument();
  });
});
