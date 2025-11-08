# Security Policy

## Supported Versions

We actively support and provide security updates for the following versions of HealthCheck:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in HealthCheck, please report it responsibly:

1. **DO NOT** create a public GitHub issue
2. Email security concerns to: [security contact] or create a private security advisory on GitHub
3. Include detailed information about the vulnerability:
   - Description of the issue
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

We will respond to security reports within 48 hours and provide a timeline for fixes.

## Known Vulnerabilities

### Development Dependencies (Non-Production Impact)

The following vulnerabilities exist in development dependencies and **DO NOT affect production builds or runtime security**:

#### As of 2025-11-06

**6 vulnerabilities** (4 moderate, 2 critical) in development dependencies:

- **Package**: `esbuild`, `vite`, `vitest`
- **Severity**: Moderate (4), Critical (2)
- **Impact**: Development server and testing infrastructure only
- **Production Impact**: **NONE** - These packages are only used during development and testing
- **Status**: Tracked upstream; awaiting package maintainer updates

### Why These Are Not Critical

1. **Development-Only**: These vulnerabilities exist in packages used exclusively during development:
   - `esbuild`: Build tooling
   - `vite`: Development server
   - `vitest`: Test runner

2. **Not in Production Bundle**: None of these packages are included in the production build that users interact with

3. **Local Development**: These tools only run in trusted local development environments, not on user devices or production servers

4. **No Auto-Fix Available**: Running `npm audit fix` cannot automatically resolve these issues as they require major version bumps that may introduce breaking changes

### Mitigation Strategy

- **Monitor** upstream repositories for security patches
- **Update** when compatible versions become available
- **Review** package changelogs before major version upgrades
- **Test** thoroughly after dependency updates

### Package Update Timeline

We check for security updates on a monthly basis and update dependencies quarterly (or immediately for critical production vulnerabilities).

## Security Best Practices

### For Contributors

1. **Never commit secrets** (API keys, tokens, passwords) to the repository
2. **Use \`.env.local\`** for local secrets (never commit \`.env.local\`)
3. **Review dependencies** before adding new packages
4. **Update dependencies** regularly via \`npm update\` and \`npm audit\`
5. **Run security checks** before pull requests:
   \`\`\`bash
   npm audit
   npm run lint
   npm run type-check
   npm test
   \`\`\`

### For Users

1. **Keep your deployment** up to date with the latest releases
2. **Use environment variables** for sensitive configuration
3. **Enable HTTPS** for all production deployments
4. **Review privacy settings** for analytics and tracking
5. **Monitor** your application logs for suspicious activity

## Security Features

### Built-In Security

- **Content Security Policy (CSP)**: Configured via middleware
- **HTTPS Redirect**: Automatic upgrade to HTTPS in production
- **No Sensitive Data Storage**: User data stays on device (localStorage only)
- **Input Validation**: All calculator inputs are validated and sanitized
- **Type Safety**: TypeScript ensures type-safe code
- **Error Handling**: Comprehensive error boundaries prevent information leakage

### Third-Party Services

This application uses the following third-party services (optional, can be disabled):

- **Google Analytics**: For usage analytics (no PII collected)
- **Google AdSense**: For advertisement serving
- **Sentry**: For error monitoring and debugging
- **Vercel Analytics**: For performance monitoring

All third-party integrations can be disabled via environment variables.

## Vulnerability Disclosure Timeline

1. **Day 0**: Vulnerability reported
2. **Day 1-2**: Initial assessment and response
3. **Day 3-7**: Fix development and testing
4. **Day 7-14**: Release and disclosure (coordinated)
5. **Day 14+**: Public disclosure (if reporter agrees)

## Security Updates

Security updates are released as:
- **Patch versions** (1.0.x) for low-severity issues
- **Minor versions** (1.x.0) for moderate-severity issues
- **Immediate hotfixes** for critical vulnerabilities

Subscribe to releases on GitHub to stay informed.

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- [NPM Security Best Practices](https://docs.npmjs.com/security-best-practices)
- [Vercel Security](https://vercel.com/docs/security)

## Contact

For security-related questions or concerns:
- **GitHub**: Create a private security advisory
- **Email**: [Your security contact email]

---

**Last Updated**: 2025-11-06
**Next Review**: 2025-12-06
