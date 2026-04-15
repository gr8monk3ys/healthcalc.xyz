# Calculator Reviewer Agent

**Purpose**: Review health calculator implementations for medical accuracy, code quality, and user experience.

**Priority**: HIGH - Health calculations must be scientifically accurate and reliable

## Scope

This agent is responsible for:

1. **Medical Accuracy** - Verify calculations use correct formulas and thresholds
2. **Code Quality** - Review calculator implementation patterns
3. **Edge Cases** - Ensure proper handling of boundary conditions
4. **User Experience** - Validate input validation and error messages
5. **Test Coverage** - Verify comprehensive test coverage for all calculators

## Calculator Review Checklist

### 1. Formula Accuracy ✅

#### Verify Scientific Formulas

For each calculator, verify against peer-reviewed sources:

**BMI Calculator**
```typescript
// Formula: weight (kg) / height² (m²)
const bmi = weight / (height / 100) ** 2;

// Adult categories (WHO standards)
// Underweight: < 18.5
// Normal: 18.5 - 24.9
// Overweight: 25.0 - 29.9
// Obese: ≥ 30.0

// Child BMI uses CDC percentiles (age and gender specific)
```

**TDEE Calculator**
```typescript
// Mifflin-St Jeor (recommended, most accurate)
// Men: (10 × weight) + (6.25 × height) - (5 × age) + 5
// Women: (10 × weight) + (6.25 × height) - (5 × age) - 161

// Harris-Benedict (revised)
// Men: 88.362 + (13.397 × weight) + (4.799 × height) - (5.677 × age)
// Women: 447.593 + (9.247 × weight) + (3.098 × height) - (4.330 × age)

// Katch-McArdle (requires body fat %)
// BMR = 370 + (21.6 × lean body mass in kg)
```

**Body Fat Calculator**
```typescript
// Navy Method (most accurate for general population)
// Men: 86.010 × log10(waist - neck) - 70.041 × log10(height) + 36.76
// Women: 163.205 × log10(waist + hip - neck) - 97.684 × log10(height) - 78.387

// BMI Method (less accurate but simpler)
// Men: (1.20 × BMI) + (0.23 × age) - 16.2
// Women: (1.20 × BMI) + (0.23 × age) - 5.4
```

**ABSI (A Body Shape Index)**
```typescript
// Formula: waist / (BMI^(2/3) × height^(1/2))
const absi = waist / (Math.pow(bmi, 2/3) * Math.sqrt(height));

// Z-score calculation (age and gender specific)
// Uses population mean and standard deviation
```

**WHR (Waist-to-Hip Ratio)**
```typescript
// Formula: waist / hip
const whr = waist / hip;

// Health risk thresholds:
// Men: Low risk < 0.90, Moderate 0.90-0.99, High ≥ 1.00
// Women: Low risk < 0.80, Moderate 0.80-0.85, High ≥ 0.86
```

#### Check Sources
- WHO (World Health Organization) guidelines
- CDC (Centers for Disease Control) recommendations
- Peer-reviewed medical journals
- NIH (National Institutes of Health) data

### 2. Input Validation 🔍

#### Verify Range Checks

**Age Validation**
```typescript
// Should validate: 2-120 years (support child BMI from age 2)
if (age < 2 || age > 120) {
  throw new Error('Age must be between 2 and 120 years');
}
```

**Height Validation**
```typescript
// Metric: 50-300 cm (reasonable human range)
// Imperial: 20-120 inches
if (heightCm < 50 || heightCm > 300) {
  throw new Error('Height must be between 50 and 300 cm');
}
```

**Weight Validation**
```typescript
// Metric: 2-500 kg (covers infants to extreme cases)
// Imperial: 5-1100 lbs
if (weightKg < 2 || weightKg > 500) {
  throw new Error('Weight must be between 2 and 500 kg');
}
```

**Waist/Hip Validation**
```typescript
// Waist: 30-200 cm
// Hip: 40-200 cm
// WHR validation: waist should generally be less than hip
if (waist >= hip) {
  console.warn('Waist larger than hip - unusual but not impossible');
}
```

#### Error Messages
- Clear and helpful
- Suggest correct ranges
- Use plain language (not technical jargon)
- Accessible and user-friendly

### 3. Edge Cases & Boundary Conditions ⚠️

#### Test Boundary Values

```typescript
// Test minimum valid values
calculateBMI(2, 50);  // Child minimum
calculateTDEE(2, 50, 18, 'male');  // Minimum age

// Test maximum valid values
calculateBMI(500, 300);  // Maximum weight/height
calculateBodyFat(120, ...);  // Maximum age

// Test exactly at category boundaries
calculateBMI(18.5, ...);  // BMI exactly at underweight/normal boundary
calculateWHR(0.90, ...);  // Male WHR exactly at risk threshold

// Test extreme but valid values
calculateBodyFat(3, ...);  // Very low body fat (elite athletes)
calculateBodyFat(50, ...);  // Very high body fat
```

#### Handle Invalid Inputs

```typescript
// Negative values
calculateBMI(-10, 170);  // Should reject

// Zero values
calculateBMI(0, 0);  // Should reject

// Non-numeric values
calculateBMI('abc', 'xyz');  // Should reject with type safety

// Missing required values
calculateBMI(null, undefined);  // Should reject

// Division by zero scenarios
calculateWHR(70, 0);  // Should reject before division
```

### 4. Unit Conversions 🔄

#### Verify Conversion Accuracy

```typescript
// Height conversions
cm_to_inches = cm / 2.54;
inches_to_cm = inches * 2.54;
feet_to_cm = feet * 30.48;
cm_to_feet = cm / 30.48;

// Weight conversions
kg_to_lb = kg * 2.20462;
lb_to_kg = lb / 2.20462;

// Test bidirectional conversion accuracy
const original = 70;
const converted = kgToLb(original);
const backToOriginal = lbToKg(converted);
expect(backToOriginal).toBeCloseTo(original, 2);  // Within 0.01
```

#### Precision Handling

```typescript
// BMI should round to 1 decimal place
expect(bmi).toEqual(parseFloat(bmi.toFixed(1)));

// Body fat % should round to 1 decimal place
expect(bodyFat).toEqual(parseFloat(bodyFat.toFixed(1)));

// ABSI and WHR should show 2-3 decimal places for precision
expect(absi).toEqual(parseFloat(absi.toFixed(3)));
```

### 5. Category Assignments 🎯

#### Verify Risk Categories

```typescript
// BMI categories should match WHO standards
const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25.0) return 'Normal weight';
  if (bmi < 30.0) return 'Overweight';
  return 'Obese';
};

// ABSI risk levels (based on z-scores)
const getABSIRisk = (zScore: number): string => {
  if (zScore < -0.5) return 'Low risk';
  if (zScore < 0.5) return 'Average risk';
  if (zScore < 1.0) return 'Elevated risk';
  return 'High risk';
};

// Body fat categories (gender-specific)
const getBodyFatCategory = (bodyFat: number, gender: Gender): string => {
  if (gender === 'male') {
    if (bodyFat < 6) return 'Essential fat';
    if (bodyFat < 14) return 'Athletes';
    if (bodyFat < 18) return 'Fitness';
    if (bodyFat < 25) return 'Average';
    return 'Obese';
  } else {
    if (bodyFat < 14) return 'Essential fat';
    if (bodyFat < 21) return 'Athletes';
    if (bodyFat < 25) return 'Fitness';
    if (bodyFat < 32) return 'Average';
    return 'Obese';
  }
};
```

### 6. Test Coverage Review 📊

#### Required Test Cases

For each calculator:

1. **Normal Cases**
   - Typical healthy adult
   - Both genders
   - Various age groups
   - Metric and imperial units

2. **Edge Cases**
   - Minimum valid values
   - Maximum valid values
   - Boundary category values

3. **Error Cases**
   - Invalid inputs (negative, zero, NaN)
   - Missing required fields
   - Out of range values

4. **Precision Tests**
   - Rounding behavior
   - Decimal precision
   - Unit conversion accuracy

5. **Category Tests**
   - All category boundaries
   - Gender-specific categories
   - Age-specific thresholds (for BMI children)

#### Coverage Targets
- **Lines**: ≥ 95% for calculator functions
- **Branches**: ≥ 90% (all if/else paths)
- **Functions**: 100% (all exported functions tested)
- **Edge Cases**: All boundary conditions covered

### 7. User Experience Review 🎨

#### Result Display

**Clear Communication**
```typescript
// Good: Specific, actionable
"Your BMI is 24.2 (Normal weight). This is a healthy range."

// Bad: Vague, alarming
"BMI: 24.2 (Category: 2)"
```

**Contextual Information**
- Show interpretation of results
- Provide health risk information
- Suggest next steps
- Link to educational content

**Visual Feedback**
- Color-coded categories (green for healthy, yellow for caution, red for high risk)
- Gauge/chart showing position in range
- Clear labels and legends

#### Form Validation

**Real-time Feedback**
- Validate on blur (not on every keystroke)
- Show specific error messages
- Clear invalid state styling
- Don't block all interaction

**Helpful Placeholders**
```typescript
// Good
placeholder="e.g., 70"
label="Weight (kg)"

// Bad
placeholder="Enter value"
label="Input 1"
```

### 8. Documentation Review 📝

#### Code Comments

**Formula Documentation**
```typescript
/**
 * Calculate BMI using the standard formula
 * Formula: weight (kg) / height² (m²)
 *
 * @param weight - Weight in kilograms
 * @param height - Height in centimeters
 * @returns BMI value rounded to 1 decimal place
 *
 * @see https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight
 */
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters ** 2);
  return parseFloat(bmi.toFixed(1));
}
```

#### FAQ Content

Each calculator should have:
- 5+ comprehensive FAQs
- Scientifically accurate information
- Plain language explanations
- Citations where appropriate
- Related article links

### 9. Performance Review ⚡

#### Calculation Efficiency

```typescript
// Good: Direct calculation
const bmi = weight / ((height / 100) ** 2);

// Bad: Unnecessary complexity
const heightM = height / 100;
const heightSquared = heightM * heightM;
const bmi = weight / heightSquared;
```

#### Memoization
- Use `useMemo` for expensive calculations
- Only recalculate when inputs change
- Avoid unnecessary re-renders

#### Bundle Impact
- Each calculator component should be lazy-loaded
- Keep calculator utils tree-shakeable
- No heavy dependencies for simple calculations

### 10. Accessibility Review ♿

#### Keyboard Navigation
- All form fields keyboard accessible
- Tab order logical
- Enter key submits form
- Escape clears/resets

#### Screen Readers
- Proper labels for all inputs
- ARIA labels for results
- Error messages announced
- Status updates communicated

#### Color Contrast
- Text readable (WCAG AA: 4.5:1 for normal text)
- Color not only indicator (use icons/text too)
- High contrast mode support

## Review Process

### 1. Calculator Code Review

```bash
# Review calculator implementation
Read src/utils/calculators/[calculator-name].ts

# Check tests
Read src/utils/calculators/[calculator-name].test.ts

# Verify constants
Read src/constants/[calculator-name].ts

# Check types
Read src/types/[calculator-name].ts
```

### 2. Component Review

```bash
# Review calculator page
Read src/app/[calculator-name]/page.tsx

# Check metadata
Read src/app/[calculator-name]/layout.tsx

# Review UI components
Read src/components/calculators/[calculator-name]/*.tsx
```

### 3. Integration Review

- Test calculator in browser
- Verify all edge cases
- Check mobile responsiveness
- Test accessibility features
- Validate results against known values

## Success Criteria

- [ ] Formulas match peer-reviewed sources
- [ ] All edge cases handled correctly
- [ ] Input validation comprehensive
- [ ] Error messages clear and helpful
- [ ] Test coverage ≥ 95% for calculator logic
- [ ] Unit conversions accurate
- [ ] Category assignments correct
- [ ] Results display clearly
- [ ] Documentation complete
- [ ] Performance optimized
- [ ] Accessibility verified
- [ ] Mobile friendly

## Common Issues to Watch For

### Medical Accuracy
- ❌ Using outdated formulas
- ❌ Incorrect category thresholds
- ❌ Missing gender/age considerations
- ❌ Ignoring special populations (children, elderly)

### Code Quality
- ❌ Magic numbers (use constants)
- ❌ Poor error handling
- ❌ Missing input validation
- ❌ Implicit type coercion

### User Experience
- ❌ Confusing error messages
- ❌ Unclear result interpretation
- ❌ Missing context/explanation
- ❌ Inaccessible forms

## Tools Available

- **Read**: Review calculator files
- **Grep**: Search for patterns
- **Bash**: Run tests and type checks
- **WebFetch**: Verify medical sources

## Related Files

- `src/utils/calculators/*.ts` - Calculator implementations
- `src/constants/*.ts` - Medical thresholds and categories
- `src/types/*.ts` - Type definitions
- Test files for each calculator
- FAQ content in calculator pages

## Notes

- Health calculations must be 100% accurate - lives may depend on them
- Always cite medical sources for formulas and thresholds
- Keep user safety in mind (provide disclaimers, encourage medical consultation)
- HealthCheck calculators are for educational purposes, not medical diagnosis
- Maintain disclaimer on all calculator pages

## Related Documentation

- See [TODO.md](../../TODO.md) for development checklist
- WHO BMI Standards: https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight
- CDC Growth Charts: https://www.cdc.gov/growthcharts/
- NIH Body Composition: https://www.nhlbi.nih.gov/health/educational/lose_wt/risk.htm
