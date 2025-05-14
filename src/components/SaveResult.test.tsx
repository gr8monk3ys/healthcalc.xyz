import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SaveResult, { SavedResultsList } from './SaveResult';

vi.mock('@/context/LocaleContext', () => ({
  useLocale: () => ({
    locale: 'en',
    setLocale: vi.fn(),
    localizePath: (path: string) => path,
    t: (key: string) => {
      const messages: Record<string, string> = {
        'savedResults.button.saved': 'Saved',
        'savedResults.button.save': 'Save Result',
        'savedResults.button.loginToSave': 'Log in to Save',
        'savedResults.helper.loginInstruction':
          'Sign in from the top-right account button to save and sync results on this browser.',
        'savedResults.confirm.clearAll': 'Are you sure you want to clear all saved results?',
        'savedResults.list.emptyTitle': 'Saved Results',
        'savedResults.list.emptyBody': "You haven't saved any calculator results yet.",
        'savedResults.list.title': 'Saved Results',
        'savedResults.list.clearAll': 'Clear All',
        'savedResults.list.deleteAria': 'Delete result',
        'savedResults.list.goToCalculator': 'Go to calculator',
      };
      return messages[key] ?? key;
    },
  }),
}));

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

// Mutable mock state that tests can override
const mockState = {
  saveResult: vi.fn(),
  removeResultByData: vi.fn(),
  isResultSaved: vi.fn().mockReturnValue(false),
  removeResult: vi.fn(),
  clearAllResults: vi.fn(),
  formatDate: vi.fn((d: string) => d),
  canSaveResults: true,
  savedResults: [] as Array<{
    id: string;
    calculatorType: string;
    calculatorName: string;
    date: string;
    data: Record<string, unknown>;
  }>,
  message: '',
  showMessage: false,
  showNotification: vi.fn(),
};

vi.mock('@/hooks/useSavedResultsManager', () => ({
  useSavedResultsManager: () => mockState,
}));

describe('SaveResult', () => {
  const defaultProps = {
    calculatorType: 'bmi',
    calculatorName: 'BMI Calculator',
    data: { bmi: 22.5, category: 'Normal' },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockState.isResultSaved.mockReturnValue(false);
    mockState.canSaveResults = true;
    mockState.savedResults = [];
    mockState.message = '';
    mockState.showMessage = false;
  });

  describe('Rendering', () => {
    it('should render Save Result button when not saved', () => {
      render(<SaveResult {...defaultProps} />);
      expect(screen.getByRole('button', { name: /save result/i })).toBeInTheDocument();
    });

    it('should render Saved button when already saved', () => {
      mockState.isResultSaved.mockReturnValue(true);
      render(<SaveResult {...defaultProps} />);
      expect(screen.getByRole('button', { name: /delete result/i })).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<SaveResult {...defaultProps} className="mt-4" />);
      expect(container.firstChild).toHaveClass('mt-4');
    });
  });

  describe('Interactions', () => {
    it('should call saveResult on save button click', () => {
      render(<SaveResult {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: /save result/i }));
      expect(mockState.saveResult).toHaveBeenCalledWith('bmi', 'BMI Calculator', {
        bmi: 22.5,
        category: 'Normal',
      });
    });

    it('should call removeResultByData on saved button click', () => {
      mockState.isResultSaved.mockReturnValue(true);
      render(<SaveResult {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: /delete result/i }));
      expect(mockState.removeResultByData).toHaveBeenCalledWith('bmi', {
        bmi: 22.5,
        category: 'Normal',
      });
    });
  });

  describe('Auth state', () => {
    it('should show "Log in to Save" when user cannot save', () => {
      mockState.canSaveResults = false;
      render(<SaveResult {...defaultProps} />);
      expect(screen.getByText(/log in to save/i)).toBeInTheDocument();
    });

    it('should show sign-in hint when user cannot save', () => {
      mockState.canSaveResults = false;
      render(<SaveResult {...defaultProps} />);
      expect(screen.getByText(/sign in from the top-right/i)).toBeInTheDocument();
    });
  });

  describe('Notifications', () => {
    it('should display message when showMessage is true', () => {
      mockState.showMessage = true;
      mockState.message = 'Result saved successfully';
      render(<SaveResult {...defaultProps} />);
      expect(screen.getByRole('alert')).toHaveTextContent('Result saved successfully');
    });

    it('should not display message when showMessage is false', () => {
      mockState.showMessage = false;
      render(<SaveResult {...defaultProps} />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});

describe('SavedResultsList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockState.savedResults = [];
    mockState.canSaveResults = true;
  });

  it('should show empty state when no results', () => {
    render(<SavedResultsList />);
    expect(screen.getByText(/you haven't saved any calculator results yet/i)).toBeInTheDocument();
  });

  it('should render saved results', () => {
    mockState.savedResults = [
      {
        id: 'bmi-123',
        calculatorType: 'bmi',
        calculatorName: 'BMI Calculator',
        date: '2024-01-15T00:00:00Z',
        data: { bmi: 22.5 },
      },
    ];

    render(<SavedResultsList />);
    expect(screen.getByText('BMI Calculator')).toBeInTheDocument();
  });

  it('should have Clear All button when results exist', () => {
    mockState.savedResults = [
      {
        id: 'bmi-123',
        calculatorType: 'bmi',
        calculatorName: 'BMI Calculator',
        date: '2024-01-15T00:00:00Z',
        data: { bmi: 22.5 },
      },
    ];

    render(<SavedResultsList />);
    fireEvent.click(screen.getByText('Clear All'));
    expect(mockState.clearAllResults).toHaveBeenCalled();
  });

  it('should call removeResult when delete button clicked in expanded group', () => {
    mockState.savedResults = [
      {
        id: 'bmi-123',
        calculatorType: 'bmi',
        calculatorName: 'BMI Calculator',
        date: '2024-01-15T00:00:00Z',
        data: { bmi: 22.5 },
      },
    ];

    render(<SavedResultsList />);
    // Expand the group first
    fireEvent.click(screen.getByText('BMI Calculator'));
    const deleteBtn = screen.getByRole('button', { name: /delete result/i });
    fireEvent.click(deleteBtn);
    expect(mockState.removeResult).toHaveBeenCalledWith('bmi-123');
  });

  it('should show group section with result count', () => {
    mockState.savedResults = [
      {
        id: 'bmi-123',
        calculatorType: 'bmi',
        calculatorName: 'BMI Calculator',
        date: '2024-01-15T00:00:00Z',
        data: { bmi: 22.5 },
      },
    ];

    render(<SavedResultsList />);
    expect(screen.getByText('BMI Calculator')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should display result data when group is expanded', () => {
    mockState.savedResults = [
      {
        id: 'bmi-123',
        calculatorType: 'bmi',
        calculatorName: 'BMI Calculator',
        date: '2024-01-15T00:00:00Z',
        data: { bmi: 22.5 },
      },
    ];

    render(<SavedResultsList />);
    // Expand the group
    fireEvent.click(screen.getByText('BMI Calculator'));
    expect(screen.getByText('22.5')).toBeInTheDocument();
  });
});
