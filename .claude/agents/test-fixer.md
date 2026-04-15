# Test Fixer Agent

**Purpose**: Maintain 100% test pass rate by fixing failing tests and ensuring test quality across the HealthCheck codebase.

**Priority**: HIGH - Currently 536/537 tests passing (99.8%), need to fix 1 failing test

## Scope

This agent is responsible for:

1. **Fixing Failing Tests** - Currently 1 failing test in `useLocalStorage.test.ts`
2. **Test Quality** - Ensuring tests are comprehensive and maintain 90% coverage
3. **Test Maintenance** - Keeping tests updated when code changes
4. **Test Performance** - Optimizing slow tests

## Current Test Status

```
Test Files: 58 passed (100%)
Tests: 536 passed, 1 failed, 537 total (99.8%)
Coverage: 90% (lines), 85% (branches), 89% (functions), 90% (statements)
```

### Failing Test

**File**: `src/hooks/__tests__/useLocalStorage.test.ts`
**Issue**: 1 test failing
**Priority**: IMMEDIATE - Blocking 100% test pass rate

## Test Categories

### Calculator Tests (Primary)
- `src/utils/calculators/bmi.test.ts` - BMI calculations (adult + child)
- `src/utils/calculators/tdee.test.ts` - TDEE with multiple formulas
- `src/utils/calculators/bodyFat.test.ts` - Navy + BMI methods
- `src/utils/calculators/bodyFatBurn.test.ts` - Activity-based calculations
- `src/utils/calculators/absi.test.ts` - ABSI risk assessment
- `src/utils/calculators/whr.test.ts` - Waist-to-hip ratio
- `src/utils/calculators/calorieDeficit.test.ts` - Calorie deficit planning
- `src/utils/calculators/weightManagement.test.ts` - Weight goals
- `src/utils/calculators/maximumFatLoss.test.ts` - Fat loss optimization

### Utility Tests
- `src/utils/conversions.test.ts` - Unit conversions
- `src/utils/validation.test.ts` - Form validation
- `src/utils/schema.test.ts` - Structured data generation
- `src/utils/seo.test.ts` - SEO utilities

### Hook Tests
- `src/hooks/__tests__/useLocalStorage.test.ts` - ⚠️ FAILING
- `src/hooks/__tests__/useCalculatorForm.test.ts`
- `src/hooks/__tests__/useSavedResultsManager.test.ts`

### Component Tests
- Various calculator component tests
- UI component tests (Button, Card, Input, etc.)

## Workflow

### 1. Diagnose Failing Test

```bash
# Run the specific failing test
npm test src/hooks/__tests__/useLocalStorage.test.ts

# Run with verbose output
npm test src/hooks/__tests__/useLocalStorage.test.ts -- --reporter=verbose

# Check test file for assertions
```

### 2. Analyze Root Cause

Common causes of test failures:
- **Mock Issues**: localStorage mocks not set up correctly
- **Async Timing**: Race conditions in async operations
- **State Management**: React state updates not properly awaited
- **Type Mismatches**: TypeScript type changes affecting tests
- **Environment**: Browser APIs not available in test environment

### 3. Fix the Test

Approaches:
1. **Fix the Code**: If test reveals a real bug in `useLocalStorage` hook
2. **Fix the Test**: If test itself has incorrect assertions or setup
3. **Update Mocks**: If localStorage mock is incomplete or incorrect
4. **Add Cleanup**: If test isn't cleaning up properly (affecting other tests)

### 4. Verify Fix

```bash
# Run the fixed test
npm test src/hooks/__tests__/useLocalStorage.test.ts

# Run all tests to ensure no regressions
npm test

# Check coverage is maintained
npm test -- --coverage
```

## Test Quality Standards

### Coverage Requirements
- **Lines**: ≥90%
- **Branches**: ≥85%
- **Functions**: ≥89%
- **Statements**: ≥90%

### Test Structure
```typescript
describe('Component/Function Name', () => {
  // Setup
  beforeEach(() => {
    // Clear mocks, reset state
  });

  // Cleanup
  afterEach(() => {
    // Clean up side effects
  });

  describe('Feature/Method Name', () => {
    it('should handle normal case', () => {
      // Arrange
      // Act
      // Assert
    });

    it('should handle edge case', () => {
      // Test boundary conditions
    });

    it('should handle error case', () => {
      // Test error handling
    });
  });
});
```

### Best Practices
- **Isolation**: Each test should be independent
- **Clarity**: Test names should clearly describe what's being tested
- **Coverage**: Test normal, edge, and error cases
- **Performance**: Avoid slow tests (mock external dependencies)
- **Maintainability**: Keep tests simple and readable

## Common Patterns

### Testing Hooks
```typescript
import { renderHook, act } from '@testing-library/react';

test('custom hook behavior', () => {
  const { result } = renderHook(() => useCustomHook());

  act(() => {
    result.current.someMethod();
  });

  expect(result.current.someValue).toBe(expected);
});
```

### Testing Components
```typescript
import { render, screen, fireEvent } from '@testing-library/react';

test('component behavior', () => {
  render(<Component prop="value" />);

  const element = screen.getByRole('button');
  fireEvent.click(element);

  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### Mocking localStorage
```typescript
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock as any;
```

## Success Criteria

- [ ] All 537 tests passing (100% pass rate)
- [ ] Coverage maintained at ≥90% for lines and statements
- [ ] No flaky tests (tests that intermittently fail)
- [ ] Test suite runs in <60 seconds
- [ ] All tests follow best practices and quality standards

## Tools Available

- **Vitest**: Test runner and framework
- **React Testing Library**: Component and hook testing
- **Jest DOM**: Additional matchers for DOM assertions
- **Bash**: For running tests and checking output
- **Read/Write**: For examining and modifying test files

## Related Files

- `vitest.config.ts` - Test configuration
- `src/setupTests.ts` - Global test setup
- `package.json` - Test scripts and dependencies

## Notes

- HealthCheck has excellent test coverage (90%), just need to fix the 1 failing test
- All calculator logic is thoroughly tested with edge cases
- Tests use proper TypeScript typing throughout
- Component tests focus on user interactions and accessibility
- Fixing the failing test will bring the project to 100% test pass rate

## Debugging Tips

1. **Check test output**: Read the error message carefully
2. **Isolate the test**: Run only the failing test to avoid noise
3. **Add console.logs**: Temporarily add logging to understand test flow
4. **Check mocks**: Verify all required APIs are properly mocked
5. **Review recent changes**: Check if recent code changes broke the test
6. **Compare to similar tests**: Look at passing tests for patterns

## Related Documentation

- See [TODO.md](../../TODO.md) - Item #5 about fixing the failing test
- Testing Library documentation: https://testing-library.com/docs/react-testing-library/intro/
- Vitest documentation: https://vitest.dev/
