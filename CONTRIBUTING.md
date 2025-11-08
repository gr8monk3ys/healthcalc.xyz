# Contributing to HealthCheck

Thank you for your interest in contributing to HealthCheck! This document provides guidelines and instructions for contributing to the project.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/heathcheck.info.git
   cd heathcheck.info
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Copy the environment variables template:
   ```bash
   cp .env.example .env.local
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming

Use descriptive branch names:
- `feature/add-bmi-calculator` - for new features
- `fix/calculation-error` - for bug fixes
- `docs/update-readme` - for documentation updates
- `refactor/api-structure` - for refactoring

### Code Style

We use ESLint and Prettier to maintain consistent code style:

```bash
# Check code formatting
npm run format:check

# Auto-fix formatting issues
npm run format

# Run linter
npm run lint
```

### TypeScript

- All new code must be written in TypeScript
- Strict mode is enabled
- Add proper type definitions for all functions and components
- Types should be defined in `src/types/` when shared across multiple files

### Component Guidelines

1. **Use functional components** with React Hooks
2. **Extract reusable logic** into custom hooks (`src/hooks/`)
3. **Keep components small** and focused on a single responsibility
4. **Use TypeScript interfaces** for props and state
5. **Follow existing naming conventions**:
   - Components: PascalCase (e.g., `CalculatorForm.tsx`)
   - Utilities: camelCase (e.g., `convertHeight()`)
   - Types: PascalCase (e.g., `BMIFormData`)

### Calculator Guidelines

When adding a new calculator:

1. Create types in `src/types/[calculator-name].ts`
2. Add calculation logic in `src/utils/calculators/[calculator-name].ts`
3. Add constants in `src/constants/[calculator-name].ts`
4. Create route folder: `src/app/[calculator-name]/`
5. Add `page.tsx` and `metadata.ts`
6. Create calculator components in `src/components/calculators/[calculator-name]/`
7. Add API re-export in `src/app/api/[calculator-name].ts`

### Calculation Functions

- **Accuracy first**: Use scientifically validated formulas
- **Add references**: Include comments with formula sources
- **Support both units**: Handle metric and imperial systems
- **Type safety**: Proper input/output types
- **Error handling**: Validate inputs and handle edge cases

### SEO Requirements

Every new page must include:
- Proper metadata (title, description, keywords)
- OpenGraph tags for social sharing
- Canonical URL
- Breadcrumbs (for calculator pages)
- Structured data (JSON-LD) where applicable

## Testing

Currently, we don't have automated tests. When adding tests:

1. Place unit tests next to the file being tested
2. Use descriptive test names
3. Test edge cases and error conditions
4. Focus on calculation accuracy

## Commit Messages

Follow conventional commit format:

```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(bmi): add children BMI percentile calculation
fix(tdee): correct calorie calculation for sedentary activity
docs(readme): update installation instructions
refactor(api): migrate calculation logic to utils
```

## Pull Request Process

1. **Update your branch** with the latest from `master`:
   ```bash
   git pull origin master
   ```

2. **Ensure code quality**:
   - Run `npm run lint` and fix any errors
   - Run `npm run format` to format code
   - Test your changes locally

3. **Create a pull request**:
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes
   - List any breaking changes

4. **Address review feedback**:
   - Respond to comments promptly
   - Make requested changes
   - Re-request review when ready

## Code Review Guidelines

Reviewers should check:
- Code follows project conventions
- TypeScript types are properly defined
- Calculations are accurate and referenced
- SEO metadata is complete
- No console errors or warnings
- Responsive design works on mobile/tablet/desktop

## Questions?

If you have questions about contributing, please:
- Check existing issues and discussions
- Review the [CLAUDE.md](CLAUDE.md) for architecture details
- Open an issue with the `question` label

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).
