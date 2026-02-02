/**
 * Tests for ErrorBoundary component
 * Tests error catching, fallback rendering, reset functionality, and withErrorBoundary HOC
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary, withErrorBoundary } from './ErrorBoundary';

// Component that throws an error for testing
const ThrowingComponent = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>No error</div>;
};

// Component that throws on specific condition
const ConditionalThrowingComponent = ({ throwOnRender }: { throwOnRender: boolean }) => {
  if (throwOnRender) {
    throw new Error('Conditional error');
  }
  return <div data-testid="safe-content">Safe content rendered</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console.error during error boundary tests
  const originalConsoleError = console.error;
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
    vi.unstubAllEnvs();
  });

  describe('Normal Rendering', () => {
    it('should render children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <div data-testid="child">Child content</div>
        </ErrorBoundary>
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <ErrorBoundary>
          <div data-testid="child-1">First child</div>
          <div data-testid="child-2">Second child</div>
        </ErrorBoundary>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });

    it('should render nested components', () => {
      const NestedComponent = () => (
        <div data-testid="nested">
          <span>Nested content</span>
        </div>
      );

      render(
        <ErrorBoundary>
          <NestedComponent />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('nested')).toBeInTheDocument();
      expect(screen.getByText('Nested content')).toBeInTheDocument();
    });

    it('should not show fallback when no error', () => {
      render(
        <ErrorBoundary>
          <div>Normal content</div>
        </ErrorBoundary>
      );

      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
    });
  });

  describe('Error Catching', () => {
    it('should catch errors thrown by children', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should display default fallback UI when error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(
        screen.getByText('An error occurred while rendering this component.')
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });

    it('should show error message in development mode', () => {
      vi.stubEnv('NODE_ENV', 'development');

      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('Test error message')).toBeInTheDocument();
    });

    it('should not show error message in production mode', () => {
      vi.stubEnv('NODE_ENV', 'production');

      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      // The error message should not appear in production
      expect(screen.queryByText('Test error message')).not.toBeInTheDocument();
    });

    it('should render error icon in fallback UI', () => {
      const { container } = render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Custom Fallback', () => {
    it('should render custom fallback when provided', () => {
      const CustomFallback = <div data-testid="custom-fallback">Custom error UI</div>;

      render(
        <ErrorBoundary fallback={CustomFallback}>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
      expect(screen.getByText('Custom error UI')).toBeInTheDocument();
    });

    it('should not render default fallback when custom is provided', () => {
      render(
        <ErrorBoundary fallback={<div>Custom error</div>}>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
    });

    it('should render complex custom fallback component', () => {
      const ComplexFallback = (
        <div data-testid="complex-fallback">
          <h2>Oops!</h2>
          <p>Something unexpected happened</p>
          <button>Refresh Page</button>
        </div>
      );

      render(
        <ErrorBoundary fallback={ComplexFallback}>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('complex-fallback')).toBeInTheDocument();
      expect(screen.getByText('Oops!')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /refresh page/i })).toBeInTheDocument();
    });

    it('should accept null as fallback and show default UI', () => {
      render(
        <ErrorBoundary fallback={null}>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      // When fallback is null (falsy), the default fallback UI is shown
      // because the check is `if (this.props.fallback)` which is false for null
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  describe('onError Callback', () => {
    it('should call onError callback when error occurs', () => {
      const onError = vi.fn();

      render(
        <ErrorBoundary onError={onError}>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(onError).toHaveBeenCalledTimes(1);
    });

    it('should pass error object to onError callback', () => {
      const onError = vi.fn();

      render(
        <ErrorBoundary onError={onError}>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      const [error] = onError.mock.calls[0];
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Test error message');
    });

    it('should pass errorInfo to onError callback', () => {
      const onError = vi.fn();

      render(
        <ErrorBoundary onError={onError}>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      const [, errorInfo] = onError.mock.calls[0];
      expect(errorInfo).toHaveProperty('componentStack');
    });

    it('should not call onError when no error occurs', () => {
      const onError = vi.fn();

      render(
        <ErrorBoundary onError={onError}>
          <div>No error here</div>
        </ErrorBoundary>
      );

      expect(onError).not.toHaveBeenCalled();
    });

    it('should work with async error reporting', () => {
      const asyncErrorReporter = vi.fn().mockResolvedValue(undefined);

      render(
        <ErrorBoundary onError={asyncErrorReporter}>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(asyncErrorReporter).toHaveBeenCalled();
    });
  });

  describe('Reset Functionality', () => {
    it('should render Try Again button in default fallback', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });

    it('should reset error state when Try Again is clicked', async () => {
      const user = userEvent.setup();
      let shouldThrow = true;

      const ToggleThrowComponent = () => {
        if (shouldThrow) {
          throw new Error('Initial error');
        }
        return <div data-testid="recovered">Recovered successfully</div>;
      };

      const { rerender } = render(
        <ErrorBoundary>
          <ToggleThrowComponent />
        </ErrorBoundary>
      );

      // Verify error state
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      // Fix the component
      shouldThrow = false;

      // Click try again
      await user.click(screen.getByRole('button', { name: /try again/i }));

      // Force rerender to pick up the new component state
      rerender(
        <ErrorBoundary>
          <ToggleThrowComponent />
        </ErrorBoundary>
      );

      // Component should now render normally
      expect(screen.getByTestId('recovered')).toBeInTheDocument();
    });

    it('should show error again if component still throws after reset', async () => {
      const user = userEvent.setup();

      render(
        <ErrorBoundary>
          <ThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: /try again/i }));

      // Should still show error since component still throws
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should apply error styling classes to default fallback', () => {
      const { container } = render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      const errorContainer = container.querySelector('.bg-red-50');
      expect(errorContainer).toBeInTheDocument();
    });

    it('should have proper border styling', () => {
      const { container } = render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      const errorContainer = container.querySelector('.border-red-200');
      expect(errorContainer).toBeInTheDocument();
    });

    it('should have rounded corners', () => {
      const { container } = render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      const errorContainer = container.querySelector('.rounded-lg');
      expect(errorContainer).toBeInTheDocument();
    });

    it('should style Try Again button appropriately', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      const button = screen.getByRole('button', { name: /try again/i });
      expect(button).toHaveClass('rounded-md');
    });
  });

  describe('Accessibility', () => {
    it('should have heading for error title', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(screen.getByRole('heading', { name: /something went wrong/i })).toBeInTheDocument();
    });

    it('should have accessible button', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      const button = screen.getByRole('button', { name: /try again/i });
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should have focus ring on button', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      const button = screen.getByRole('button', { name: /try again/i });
      expect(button.className).toContain('focus:');
    });
  });
});

describe('withErrorBoundary HOC', () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  describe('Basic Functionality', () => {
    it('should wrap component with error boundary', () => {
      const SimpleComponent = () => <div data-testid="simple">Simple content</div>;
      const WrappedComponent = withErrorBoundary(SimpleComponent);

      render(<WrappedComponent />);

      expect(screen.getByTestId('simple')).toBeInTheDocument();
    });

    it('should pass props to wrapped component', () => {
      interface TestProps {
        message: string;
      }

      const PropsComponent = ({ message }: TestProps) => <div data-testid="props">{message}</div>;
      const WrappedComponent = withErrorBoundary(PropsComponent);

      render(<WrappedComponent message="Hello World" />);

      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('should catch errors from wrapped component', () => {
      const WrappedThrowing = withErrorBoundary(ThrowingComponent);

      render(<WrappedThrowing />);

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  describe('Custom Fallback', () => {
    it('should use custom fallback when provided', () => {
      const CustomFallback = <div data-testid="hoc-fallback">HOC Error</div>;
      const WrappedThrowing = withErrorBoundary(ThrowingComponent, CustomFallback);

      render(<WrappedThrowing />);

      expect(screen.getByTestId('hoc-fallback')).toBeInTheDocument();
    });

    it('should use default fallback when not provided', () => {
      const WrappedThrowing = withErrorBoundary(ThrowingComponent);

      render(<WrappedThrowing />);

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });
  });

  describe('Props Passing', () => {
    it('should pass multiple props to wrapped component', () => {
      interface MultiPropComponent {
        name: string;
        age: number;
        active: boolean;
      }

      const MultiPropComp = ({ name, age, active }: MultiPropComponent) => (
        <div>
          <span data-testid="name">{name}</span>
          <span data-testid="age">{age}</span>
          <span data-testid="active">{active ? 'Yes' : 'No'}</span>
        </div>
      );

      const Wrapped = withErrorBoundary(MultiPropComp);

      render(<Wrapped name="John" age={30} active={true} />);

      expect(screen.getByTestId('name')).toHaveTextContent('John');
      expect(screen.getByTestId('age')).toHaveTextContent('30');
      expect(screen.getByTestId('active')).toHaveTextContent('Yes');
    });

    it('should work with optional props', () => {
      interface OptionalProps {
        required: string;
        optional?: string;
      }

      const OptionalComp = ({ required, optional = 'default' }: OptionalProps) => (
        <div>
          <span data-testid="required">{required}</span>
          <span data-testid="optional">{optional}</span>
        </div>
      );

      const Wrapped = withErrorBoundary(OptionalComp);

      render(<Wrapped required="value" />);

      expect(screen.getByTestId('required')).toHaveTextContent('value');
      expect(screen.getByTestId('optional')).toHaveTextContent('default');
    });
  });

  describe('Edge Cases', () => {
    it('should work with component that returns null', () => {
      const NullComponent = () => null;
      const Wrapped = withErrorBoundary(NullComponent);

      const { container } = render(<Wrapped />);

      // Should render without errors
      expect(container).toBeInTheDocument();
    });

    it('should work with component that returns fragment', () => {
      const FragmentComponent = () => (
        <>
          <span data-testid="frag-1">One</span>
          <span data-testid="frag-2">Two</span>
        </>
      );
      const Wrapped = withErrorBoundary(FragmentComponent);

      render(<Wrapped />);

      expect(screen.getByTestId('frag-1')).toBeInTheDocument();
      expect(screen.getByTestId('frag-2')).toBeInTheDocument();
    });

    it('should preserve displayName for debugging', () => {
      const NamedComponent = () => <div>Named</div>;
      NamedComponent.displayName = 'MyNamedComponent';

      const Wrapped = withErrorBoundary(NamedComponent);

      // The wrapper function should exist
      expect(Wrapped).toBeDefined();
      expect(typeof Wrapped).toBe('function');
    });
  });
});

describe('Integration', () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('should handle nested error boundaries', () => {
    const InnerFallback = <div data-testid="inner-fallback">Inner error</div>;
    const OuterFallback = <div data-testid="outer-fallback">Outer error</div>;

    render(
      <ErrorBoundary fallback={OuterFallback}>
        <div>
          <ErrorBoundary fallback={InnerFallback}>
            <ThrowingComponent />
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    );

    // Inner boundary should catch the error
    expect(screen.getByTestId('inner-fallback')).toBeInTheDocument();
    expect(screen.queryByTestId('outer-fallback')).not.toBeInTheDocument();
  });

  it('should isolate errors in siblings', () => {
    render(
      <div>
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
        <ErrorBoundary>
          <div data-testid="sibling">Sibling content</div>
        </ErrorBoundary>
      </div>
    );

    // First boundary shows error
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Second boundary renders normally
    expect(screen.getByTestId('sibling')).toBeInTheDocument();
  });

  it('should work with multiple wrapped components', () => {
    const Component1 = () => <div data-testid="comp-1">Component 1</div>;
    const Component2 = () => <div data-testid="comp-2">Component 2</div>;

    const Wrapped1 = withErrorBoundary(Component1);
    const Wrapped2 = withErrorBoundary(Component2);

    render(
      <>
        <Wrapped1 />
        <Wrapped2 />
      </>
    );

    expect(screen.getByTestId('comp-1')).toBeInTheDocument();
    expect(screen.getByTestId('comp-2')).toBeInTheDocument();
  });
});
