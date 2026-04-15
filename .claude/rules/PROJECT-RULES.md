# Project Rules

This file defines project-specific rules that Claude should follow when working in this repository. Similar to `.cursorrules` or `.editorconfig`, these rules customize Claude's behavior for this specific project.

## How to Use

1. Copy this file to your project root as `.claude/rules/PROJECT-RULES.md`
2. Customize the rules for your project
3. Claude will read and follow these rules

---

## Code Style Rules

### TypeScript

```yaml
typescript:
  strict: true
  no_any: true
  explicit_return_types: true
  prefer_const: true
  no_unused_vars: error
```

### Formatting

```yaml
formatting:
  indent: 2 spaces
  quotes: single
  semicolons: true # .prettierrc has "semi": true
  trailing_comma: es5
  max_line_length: 100
  arrow_parens: avoid
```

### Naming Conventions

```yaml
naming:
  components: PascalCase
  functions: camelCase
  constants: SCREAMING_SNAKE_CASE
  files:
    components: PascalCase.tsx
    utilities: camelCase.ts
    types: camelCase.ts in src/types/
    tests: *.test.ts adjacent to source
```

## Architecture Rules

### File Organization

```yaml
structure:
  components: src/components/
  hooks: src/hooks/
  utils: src/utils/ # calculation logic, validation, conversions
  lib: src/lib/ # db, supabase, blog registry, monitoring
  constants: src/constants/
  types: src/types/
  api: src/app/(default)/api/
  pages: src/app/(default)/ and src/app/(localized)/
```

### Component Rules

```yaml
components:
  max_lines: 200 # target for new components; legacy violations listed under Exceptions
  single_responsibility: true
  props_interface: required
  default_exports: false # exception: Next.js page/layout/route files require default exports
  memo_threshold: 50_lines
```

### API Rules

```yaml
api:
  validation: zod_required
  error_format: '{ error: string, success: false }'
  success_format: '{ data: T, success: true }'
  auth_middleware: required_for_protected
```

## Framework-Specific Rules

### Next.js

```yaml
nextjs:
  version: 16
  router: app
  prefer_server_components: true # calculator pages are client components by design
  use_server_actions: false # mutations go through API route handlers
  image_component: next/image
```

### React

```yaml
react:
  hooks_only: true
  no_class_components: true
  use_memo_when: expensive_computation
  use_callback_when: passed_to_memoized_child
```

## Testing Rules

### Unit Tests

```yaml
testing:
  framework: vitest
  coverage_minimum: 80%
  test_file_location: adjacent
  mock_external_deps: true
```

### Test Structure

```yaml
test_structure:
  describe_component: true
  group_by_behavior: true
  use_testing_library: true
  no_implementation_details: true
```

## Security Rules

### General

```yaml
security:
  no_secrets_in_code: true
  validate_all_inputs: true
  sanitize_outputs: true
  use_https_only: true
```

### Authentication

```yaml
auth:
  provider: supabase_magic_link # email OTP, no passwords stored
  rls_required: true # user_saved_results rows are RLS-protected
  service_role_key: never_in_app_code # only the anon key is used client/server-side
  anonymous_sessions: httponly_cookie # _hc_anon for unauthenticated saved results
```

## Documentation Rules

### Code Comments

```yaml
comments:
  when: non_obvious_logic_only
  format: jsdoc_for_public_apis
  no_commented_out_code: true
  no_todo_without_issue: true
```

### README

```yaml
readme:
  required_sections:
    - installation
    - usage
    - configuration
    - contributing
```

## Git Rules

### Commits

```yaml
commits:
  conventional_commits: true
  max_subject_length: 72
  require_body_for_features: true
  sign_commits: preferred
```

### Branches

```yaml
branches:
  main: protected
  naming: feature/*, bugfix/*, hotfix/*
  delete_after_merge: true
```

## Performance Rules

### General

```yaml
performance:
  lazy_load_routes: true
  optimize_images: true
  minimize_bundle: true
  cache_static_assets: true
```

### Database

```yaml
database:
  no_n_plus_one: true
  use_indexes: true
  paginate_lists: true
  connection_pooling: true
```

---

## Rule Priorities

When rules conflict, follow this priority:

1. Security rules (highest)
2. Correctness rules
3. Performance rules
4. Style rules (lowest)

## Exceptions

Document any exceptions to rules here:

```yaml
exceptions:
  - files:
      [
        src/components/calculators/bmi/BMICalculatorClient.tsx,
        src/components/Search.tsx,
        src/components/EmbedWidgetPicker.tsx,
        src/components/CalculatorPageLayout.tsx,
        src/components/calculators/CalculatorForm.tsx,
      ]
    rules_ignored: [max_lines]
    reason: Pre-date the component-size rule; split when next touched (tracked in TODO.md)
  - files: [src/app/**/page.tsx, src/app/**/layout.tsx, src/app/**/route.ts]
    rules_ignored: [default_exports]
    reason: Next.js App Router requires default exports for these files
```

---

## Custom Rules

Add project-specific rules here:

```yaml
custom:
  # Example:
  # always_use_feature_flags: true
  # require_analytics_events: true
```
