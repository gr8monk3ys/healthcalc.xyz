# HealthCheck Specialized Agents

This directory contains specialized AI agents tailored to HealthCheck's specific workflow and needs.

## Available Agents

### 🎨 [image-creator.md](./image-creator.md)
**Purpose**: Create professional OpenGraph images for social media sharing

**Use When**:
- Need to create the 16 missing OpenGraph images (BLOCKING production launch)
- Updating calculator thumbnails
- Creating blog post preview images
- Refreshing social media assets

**Requirements**:
- Canva MCP server installed and authenticated
- Design specifications: 1200x630px PNG format
- HealthCheck branding guidelines

**How to Use**:
```
> Use the image-creator agent to generate OpenGraph images for all 10 calculators
```

**Output**:
- 10 calculator OpenGraph images in `/public/images/og/`
- 6 blog post images in `/public/images/blog/`
- Optimized PNGs (<200 KB each)

---

### 🧪 [test-fixer.md](./test-fixer.md)
**Purpose**: Maintain 100% test pass rate and ensure test quality

**Use When**:
- Tests are failing (currently 1/537 failing)
- Adding new calculator features
- Refactoring existing code
- Coverage drops below 90%

**Requirements**:
- Vitest test framework
- React Testing Library
- Test files in `src/**/__tests__/` or `*.test.ts`

**How to Use**:
```
> Use the test-fixer agent to fix the failing useLocalStorage test
```

**Output**:
- All 537 tests passing (100%)
- Coverage maintained at ≥90%
- Test quality improvements

---

### 🔒 [type-safety.md](./type-safety.md)
**Purpose**: Eliminate `any` types and maintain strict TypeScript safety

**Use When**:
- Adding new features that need type safety
- Found `any` types in code review
- TypeScript errors during development
- Want to improve type inference

**Requirements**:
- TypeScript strict mode enabled
- `npm run type-check` passing

**How to Use**:
```
> Use the type-safety agent to remove the remaining 2 any types
```

**Output**:
- Zero `any` types in production code
- Improved type definitions
- Better IDE autocomplete and error detection

---

### 🚀 [deployment-checker.md](./deployment-checker.md)
**Purpose**: Comprehensive pre-launch validation for production readiness

**Use When**:
- Preparing for production deployment
- Before creating a release
- After major feature additions
- Regular production readiness audits

**Requirements**:
- All MCP servers configured (Sentry, etc.)
- Environment variables set
- Domain and SSL configured

**How to Use**:
```
> Use the deployment-checker agent to verify production readiness
```

**Output**:
- Complete pre-launch checklist
- List of any blocking issues
- Production readiness score
- Deployment recommendations

---

### ⚕️ [calculator-reviewer.md](./calculator-reviewer.md)
**Purpose**: Review health calculator implementations for medical accuracy and quality

**Use When**:
- Adding a new calculator
- Updating calculation formulas
- Reviewing pull requests with calculator changes
- Ensuring medical accuracy before launch

**Requirements**:
- Access to peer-reviewed medical sources
- Understanding of health metrics (BMI, TDEE, etc.)
- Calculator test files

**How to Use**:
```
> Use the calculator-reviewer agent to review the TDEE calculator implementation
```

**Output**:
- Formula accuracy verification
- Code quality assessment
- Edge case coverage analysis
- Medical accuracy certification

---

## Agent Usage Patterns

### Sequential Workflow

For production launch, use agents in this order:

1. **calculator-reviewer** - Ensure all calculators are medically accurate
2. **type-safety** - Remove remaining `any` types
3. **test-fixer** - Get to 100% test pass rate
4. **image-creator** - Create missing OpenGraph images (BLOCKING)
5. **deployment-checker** - Final validation before launch

### Parallel Workflow

Some agents can run in parallel:

```
> Use the test-fixer and type-safety agents in parallel to improve code quality
```

This works when agents don't modify overlapping files.

### Focused Workflow

Use a single agent for specific tasks:

```
> Use the calculator-reviewer agent to verify the new body fat calculator
```

## Agent Best Practices

### 1. Be Specific in Your Request

**Good**:
```
> Use the image-creator agent to create OpenGraph images for the BMI and TDEE calculators
```

**Bad**:
```
> Make images
```

### 2. Provide Context

**Good**:
```
> Use the test-fixer agent to fix the failing useLocalStorage test. The test is failing because localStorage mock isn't set up correctly.
```

**Bad**:
```
> Fix tests
```

### 3. Set Clear Success Criteria

**Good**:
```
> Use the deployment-checker agent and ensure all checks pass before we deploy to production
```

**Bad**:
```
> Check if ready
```

### 4. One Agent, One Task

**Good**:
```
> Use the type-safety agent to remove any types from the CalculatorForm component
```

**Bad**:
```
> Use the type-safety agent to fix types, run tests, and deploy to production
```

## Integration with MCP Servers

Several agents require MCP servers to be installed:

| Agent | Required MCP Servers | Setup Instructions |
|-------|---------------------|-------------------|
| image-creator | Canva MCP | See [MCP_SETUP.md](../MCP_SETUP.md) |
| deployment-checker | Sentry MCP (optional) | See [MCP_SETUP.md](../MCP_SETUP.md) |
| test-fixer | None | Built-in tools only |
| type-safety | None | Built-in tools only |
| calculator-reviewer | None | Built-in tools only |

## Agent Customization

### Creating New Agents

To create a new specialized agent:

1. **Create agent file**: `.claude/agents/my-agent.md`
2. **Define purpose**: Clear, specific scope
3. **Document workflow**: Step-by-step process
4. **List requirements**: Tools, MCP servers, dependencies
5. **Provide examples**: Usage patterns and expected outputs
6. **Update this README**: Add entry to Available Agents section

### Agent Template

```markdown
# Agent Name

**Purpose**: Single sentence describing what this agent does

**Priority**: CRITICAL | HIGH | MEDIUM | LOW

## Scope

What this agent is responsible for:
1. Primary responsibility
2. Secondary responsibility
3. Related tasks

## Workflow

Step-by-step process the agent follows

## Requirements

- Tool requirements
- MCP server requirements
- File dependencies

## Success Criteria

- [ ] Measurable outcome 1
- [ ] Measurable outcome 2
- [ ] Measurable outcome 3

## Tools Available

- List of tools this agent can use

## Related Documentation

- Links to related files and docs
```

## Troubleshooting

### Agent Not Working as Expected

1. **Check MCP servers**: Ensure required MCP servers are installed and authenticated
2. **Verify file access**: Agent may need specific files that don't exist
3. **Review requirements**: Check if all prerequisites are met
4. **Simplify request**: Break down complex tasks into smaller agent requests

### Agent Conflicts

If multiple agents modify the same files:

1. **Run sequentially**: Use agents one at a time
2. **Review changes**: Check git diff between agent runs
3. **Test after each agent**: Run tests and type-check between agents

## Performance Considerations

### Agent Execution Time

| Agent | Typical Duration | Notes |
|-------|-----------------|-------|
| image-creator | 30-60 min | Depends on Canva MCP response time |
| test-fixer | 5-15 min | Depends on test complexity |
| type-safety | 10-20 min | May require multiple iterations |
| deployment-checker | 15-30 min | Comprehensive validation |
| calculator-reviewer | 20-40 min | Thorough accuracy review |

### Resource Usage

- **image-creator**: High (external API calls to Canva)
- **test-fixer**: Medium (runs test suite)
- **type-safety**: Low (static analysis)
- **deployment-checker**: Medium (builds and runs checks)
- **calculator-reviewer**: Low (code review only)

## Current Project Status

Based on the brutal audit:

- **Tests**: 536/537 passing (99.8%) - test-fixer can fix the last one
- **Type Safety**: 2 `any` types remaining - type-safety can eliminate
- **OpenGraph Images**: 0/16 created - **BLOCKING** - image-creator must run
- **Production Ready**: 95% - deployment-checker for final validation
- **Calculator Accuracy**: ✅ All verified - calculator-reviewer for new calculators

## Priority Recommendation

For HealthCheck production launch:

1. 🚨 **CRITICAL**: Run `image-creator` to create 16 OpenGraph images (BLOCKING)
2. ⚠️ **HIGH**: Run `test-fixer` to achieve 100% test pass rate
3. 📋 **MEDIUM**: Run `type-safety` to eliminate last 2 `any` types
4. ✅ **PRE-LAUNCH**: Run `deployment-checker` for final validation
5. 🔄 **ONGOING**: Use `calculator-reviewer` for new calculator additions

## Related Documentation

- [MCP_SETUP.md](../MCP_SETUP.md) - MCP server installation and configuration
- [TODO.md](../../TODO.md) - Overall project launch checklist
- [CLAUDE.md](../../CLAUDE.md) - Project overview and development guide
- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Contribution guidelines

## Questions?

If you're unsure which agent to use:

1. **For images**: Use `image-creator`
2. **For failing tests**: Use `test-fixer`
3. **For type errors**: Use `type-safety`
4. **Before deployment**: Use `deployment-checker`
5. **For calculators**: Use `calculator-reviewer`

When in doubt, start with `deployment-checker` to get a complete assessment of what needs to be done.
