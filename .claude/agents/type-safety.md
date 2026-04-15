# Type Safety Agent

**Purpose**: Eliminate remaining `any` types and maintain strict TypeScript type safety across the HealthCheck codebase.

**Priority**: MEDIUM - Only 2 `any` types remaining (down from 112), targeting 100% type safety

## Scope

This agent is responsible for:

1. **Eliminating `any` Types** - Remove the last 2 `any` type annotations
2. **Type Safety Audits** - Regular scans for implicit `any` usage
3. **Type Improvements** - Enhance type definitions for better DX
4. **Generic Improvements** - Add proper generic constraints where needed

## Current Type Safety Status

```
Total any types: 2 (down from 112)
TypeScript strict mode: ✅ Enabled
Type checking: ✅ Passing (npm run type-check)
```

### Remaining `any` Types

Based on the brutal audit, the 2 remaining `any` types are in:
1. **CalculatorForm component** - Generic form handling
2. **Conversions utilities** - Unit conversion edge cases

## Workflow

### 1. Locate Remaining `any` Types

```bash
# Search for explicit any types
grep -r ": any" src/ --include="*.ts" --include="*.tsx"

# Search for any in type annotations
grep -r "<any>" src/ --include="*.ts" --include="*.tsx"

# Use TypeScript compiler to find implicit any
npx tsc --noEmit --strict
```

### 2. Analyze Each `any` Type

For each `any` type, determine:
- **Purpose**: Why was `any` used?
- **Complexity**: How difficult to replace?
- **Impact**: What breaks if we change it?
- **Alternative**: What type should it be?

### 3. Replace with Proper Types

#### Common Replacements

**Instead of `any`:**
```typescript
// ❌ Bad
const handleChange = (value: any) => setValue(value);

// ✅ Good - Use generic
function handleChange<T>(value: T): void {
  setValue(value);
}

// ✅ Good - Use union type
const handleChange = (value: string | number) => setValue(value);

// ✅ Good - Use unknown for truly unknown types
const parseJSON = (json: string): unknown => JSON.parse(json);
```

**Form Handling:**
```typescript
// ❌ Bad
interface FormField {
  value: any;
  onChange: (value: any) => void;
}

// ✅ Good - Use generic
interface FormField<T = string | number> {
  value: T;
  onChange: (value: T) => void;
}
```

**Event Handlers:**
```typescript
// ❌ Bad
const handleEvent = (e: any) => console.log(e.target.value);

// ✅ Good
const handleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};
```

### 4. Update CalculatorForm Component

The CalculatorForm component likely uses `any` for its generic field handling:

**Current Issue:**
```typescript
// Probably something like this
interface CalculatorFormProps {
  fields: Array<{
    value: any;
    onChange: (value: any) => void;
  }>;
}
```

**Proposed Fix:**
```typescript
// Use discriminated unions for different field types
type FieldValue = string | number | boolean | string[];

interface BaseField {
  name: string;
  label: string;
  error?: string;
  placeholder?: string;
}

interface NumberField extends BaseField {
  type: 'number';
  value: number | '';
  onChange: (value: number | '') => void;
  min?: number;
  max?: number;
  step?: string;
  unit?: string;
  unitToggle?: () => void;
}

interface RadioField extends BaseField {
  type: 'radio';
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

interface SelectField extends BaseField {
  type: 'select';
  value: string | number;
  onChange: (value: string | number) => void;
  options: Array<{ value: string | number; label: string }>;
}

type FormField = NumberField | RadioField | SelectField;

interface CalculatorFormProps {
  title: string;
  fields: FormField[];
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}
```

### 5. Update Conversions Utilities

The conversions utilities might use `any` for handling unknown unit types:

**Current Issue:**
```typescript
// Possibly handling edge cases with any
const convertUnit = (value: number, from: any, to: any): number => {
  // conversion logic
};
```

**Proposed Fix:**
```typescript
// Define all possible unit types
type LengthUnit = 'cm' | 'in' | 'ft' | 'm';
type WeightUnit = 'kg' | 'lb' | 'g' | 'oz';
type VolumeUnit = 'ml' | 'l' | 'oz' | 'cup';
type TemperatureUnit = 'C' | 'F' | 'K';

type Unit = LengthUnit | WeightUnit | VolumeUnit | TemperatureUnit;

const convertUnit = (
  value: number,
  from: Unit,
  to: Unit
): number => {
  // Type-safe conversion logic
};

// Or use function overloads for better type inference
function convertLength(value: number, from: LengthUnit, to: LengthUnit): number;
function convertWeight(value: number, from: WeightUnit, to: WeightUnit): number;
function convertLength(value: number, from: Unit, to: Unit): number {
  // Implementation
}
```

## Type Safety Best Practices

### 1. Prefer Specific Types Over General Ones

```typescript
// ❌ Avoid
type Props = Record<string, any>;

// ✅ Prefer
interface Props {
  name: string;
  age: number;
  active: boolean;
}
```

### 2. Use `unknown` Instead of `any` for Unknown Types

```typescript
// ❌ Avoid
const parseData = (input: any) => input;

// ✅ Prefer
const parseData = (input: unknown): Data => {
  if (isValidData(input)) {
    return input;
  }
  throw new Error('Invalid data');
};
```

### 3. Leverage Type Guards

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

// Usage
const processValue = (value: unknown) => {
  if (isString(value)) {
    // TypeScript knows value is string here
    return value.toUpperCase();
  }
  if (isNumber(value)) {
    // TypeScript knows value is number here
    return value.toFixed(2);
  }
};
```

### 4. Use Generics for Reusable Components

```typescript
// ✅ Type-safe generic component
interface SelectProps<T> {
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
}

function Select<T extends string | number>(props: SelectProps<T>) {
  // Implementation
}
```

### 5. Define Strict Event Types

```typescript
// ✅ Specific event types
type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

const handleChange = (e: InputChangeEvent) => {
  // Type-safe event handling
};
```

## Tools & Commands

### Find `any` Types
```bash
# Find explicit any annotations
grep -rn ": any" src/ --include="*.ts" --include="*.tsx"

# Find any in generics
grep -rn "<any>" src/ --include="*.ts" --include="*.tsx"

# Find implicit any with TypeScript compiler
npx tsc --noEmit --noImplicitAny
```

### Type Checking
```bash
# Run type check
npm run type-check

# Watch mode for development
npx tsc --noEmit --watch
```

### IDE Support
- VS Code shows type errors inline
- Use "Go to Type Definition" to understand complex types
- Hover over variables to see inferred types

## Success Criteria

- [ ] Zero `any` types in production code (100% type safety)
- [ ] All type checks passing (`npm run type-check`)
- [ ] No implicit `any` warnings
- [ ] Proper generic constraints where applicable
- [ ] Type definitions improve developer experience (autocomplete, error detection)

## Common Type Challenges

### 1. External Library Types
```typescript
// If library lacks types, create declaration file
// src/types/external-library.d.ts
declare module 'external-library' {
  export function doSomething(param: string): Promise<Result>;
}
```

### 2. Complex Form State
```typescript
// Use discriminated unions for different form states
type FormState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
```

### 3. Dynamic Object Keys
```typescript
// Use Record or Map for dynamic keys
type DynamicObject = Record<string, number>;
// or
const dynamicMap = new Map<string, number>();
```

## Testing Type Safety

```typescript
// Use type assertions in tests to verify types
import { expectType } from 'tsd';

// This will fail compilation if types don't match
expectType<number>(calculateBMI(70, 175));
expectType<Gender>(gender); // Gender = 'male' | 'female'
```

## Related Files

- `tsconfig.json` - TypeScript configuration with strict mode enabled
- `src/types/` - All type definitions
- `src/components/calculators/CalculatorForm.tsx` - Generic form component (likely has 1 `any`)
- `src/utils/conversions.ts` - Unit conversions (likely has 1 `any`)

## Notes

- HealthCheck already has excellent type safety (only 2 `any` remaining)
- Strict mode is enabled and enforced
- All calculator types are properly defined
- Common types (Gender, ActivityLevel, etc.) are well-structured
- Removing the last 2 `any` types will achieve 100% type safety

## Related Documentation

- See [TODO.md](../../TODO.md) - Item #8 about removing remaining `any` types
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- React TypeScript Cheatsheet: https://react-typescript-cheatsheet.netlify.app/
