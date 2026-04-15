# MCP Server Setup for HealthCheck

This document outlines the recommended MCP servers for the HealthCheck project based on the codebase audit.

## 🚀 Priority 0: Next.js Development & Debugging

### Next.js MCP Server
**Purpose**: Real-time Next.js debugging, route inspection, and performance monitoring
**Installation**:
```bash
npx @modelcontextprotocol/server-nextjs
```

**Usage**:
- Inspect Next.js routes and middleware
- Monitor server-side rendering performance
- Debug App Router issues
- Track build errors and warnings
- Analyze bundle sizes
- Monitor cache performance

**Note**: Automatically detects Next.js projects and provides debugging tools

### Browser Console Logger MCP
**Purpose**: Capture and analyze browser console errors in real-time
**Installation**:
```bash
# Built into Claude Code - no installation needed
# Uses WebSocket connection to capture console logs
```

**Usage**:
- Monitor client-side errors
- Track console warnings
- Capture network failures
- Debug React hydration issues
- Monitor performance metrics

---

## 🚨 Priority 1: Design & Image Generation

### Canva MCP Server
**Purpose**: Create the 16 missing OpenGraph images (BLOCKING ISSUE)
**Installation**:
```bash
claude mcp add --transport http canva https://mcp.canva.com/mcp
```

**Usage**:
- Generate 10 calculator OpenGraph images (1200x630px)
- Create 6 blog post social media images
- Maintain consistent branding across all images

**Authentication**: OAuth (use `/mcp` to authenticate)

---

## 🔥 Priority 2: Error Monitoring & Analytics

### Sentry MCP Server
**Purpose**: Set up production error monitoring (mentioned in TODO #4)
**Installation**:
```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

**Usage**:
- Monitor production errors
- Debug issues in production
- Set up error alerts
- Track error trends

**Authentication**: OAuth (use `/mcp` to authenticate)

---

## 📊 Priority 3: Analytics & Tracking

### Cloudflare MCP Server
**Purpose**: CDN analytics, performance monitoring
**Installation**:
```bash
# Install Cloudflare CLI first
npm install -g wrangler

# Claude Code can use Cloudflare CLI automatically
# Or add specific Cloudflare MCP servers - see https://developers.cloudflare.com/agents/
```

**Usage**:
- Monitor site performance
- Analyze traffic patterns
- Manage DNS and caching
- Security settings

**Note**: Requires Cloudflare account and API token

---

## 🛠️ Priority 4: Development & Security

### Socket MCP Server
**Purpose**: Security analysis for npm dependencies
**Installation**:
```bash
claude mcp add --transport http socket https://mcp.socket.dev/
```

**Usage**:
- Scan dependencies for vulnerabilities
- Check for malicious packages
- Monitor supply chain security
- Get security recommendations

**Authentication**: OAuth (use `/mcp` to authenticate)

---

## 📝 Optional: Content Management

### Notion MCP Server
**Purpose**: Manage blog content and documentation
**Installation**:
```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

**Usage**:
- Store blog post drafts
- Track content calendar
- Manage documentation
- Collaborate on content

**Authentication**: OAuth (use `/mcp` to authenticate)

---

## 🔗 Optional: Integration & Automation

### Zapier MCP Server
**Purpose**: Connect to 8,000+ apps for automation
**Installation**:
```bash
# Generate your user-specific URL at https://mcp.zapier.com
claude mcp add --transport http zapier <YOUR_ZAPIER_MCP_URL>
```

**Usage**:
- Automate social media posts when new blog content is published
- Connect analytics to Google Sheets
- Set up notification workflows
- Integrate with email marketing

**Authentication**: Generate URL at mcp.zapier.com

---

## 📦 Installation Script

Run this script to install all recommended MCP servers:

```bash
#!/bin/bash

# Priority 1: Canva (for OpenGraph images)
echo "Installing Canva MCP..."
claude mcp add --transport http canva https://mcp.canva.com/mcp

# Priority 2: Sentry (for error monitoring)
echo "Installing Sentry MCP..."
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp

# Priority 4: Socket (for security)
echo "Installing Socket MCP..."
claude mcp add --transport http socket https://mcp.socket.dev/

echo "✅ Core MCP servers installed!"
echo ""
echo "Next steps:"
echo "1. Run '/mcp' in Claude Code to authenticate with each service"
echo "2. Create OpenGraph images using Canva MCP"
echo "3. Set up Sentry error monitoring"
echo "4. Run security scan with Socket MCP"
```

---

## 🔐 Authentication

After installing MCP servers, authenticate with each service:

1. In Claude Code, run: `/mcp`
2. Select the server you want to authenticate with
3. Follow the OAuth flow in your browser
4. Return to Claude Code - the server is now connected

---

## 📋 MCP Server Usage Examples

### Create OpenGraph Images with Canva
```
> Use the Canva MCP to create an OpenGraph image for the BMI Calculator.
> Make it 1200x630px with the HealthCheck logo and title "BMI Calculator | HealthCheck"
```

### Monitor Errors with Sentry
```
> Use Sentry MCP to show me the most common errors in the last 24 hours
> Create a new Sentry project for HealthCheck production monitoring
```

### Security Scan with Socket
```
> Use Socket MCP to scan our package.json for security vulnerabilities
> Check if any of our dependencies have known issues
```

---

## 🎯 Recommended Workflow

### For Launch (Week 1):
1. **Canva MCP**: Generate all 16 OpenGraph images
2. **Sentry MCP**: Set up production error monitoring
3. **Socket MCP**: Run security audit before deployment

### Post-Launch (Week 2-4):
4. **Notion MCP**: Set up content management for blog posts
5. **Cloudflare MCP**: Monitor performance and optimize CDN
6. **Zapier MCP**: Automate social media and analytics workflows

---

## 🔧 Troubleshooting

### MCP Server Won't Start
```bash
# Check server status
claude mcp list

# Get details for specific server
claude mcp get canva

# Remove and re-add server
claude mcp remove canva
claude mcp add --transport http canva https://mcp.canva.com/mcp
```

### Authentication Issues
```bash
# Re-authenticate with server
# In Claude Code:
/mcp
# Select the server and follow OAuth flow again
```

### Connection Timeout
```bash
# Increase MCP timeout (default 5000ms)
MCP_TIMEOUT=10000 claude
```

---

## 🤖 Specialized Agents

In addition to MCP servers, this project includes specialized AI agents for common HealthCheck workflows:

### Available Agents (in `.claude/agents/`)

1. **image-creator** - Create OpenGraph images using Canva MCP (BLOCKING issue #1)
2. **test-fixer** - Fix failing tests and maintain 100% pass rate
3. **type-safety** - Eliminate `any` types and improve TypeScript safety
4. **deployment-checker** - Pre-launch validation and production readiness
5. **calculator-reviewer** - Review health calculators for medical accuracy

### Using Specialized Agents

```
> Use the image-creator agent to create all 16 missing OpenGraph images
> Use the test-fixer agent to fix the failing useLocalStorage test
> Use the deployment-checker agent to verify production readiness
```

See [agents/README.md](./agents/README.md) for complete documentation.

---

## 📚 Additional Resources

- [MCP Documentation](https://modelcontextprotocol.io)
- [Claude Code MCP Guide](https://docs.claude.com/en/mcp)
- [Available MCP Servers](https://github.com/modelcontextprotocol/servers)
- [Specialized Agents](./agents/README.md) - HealthCheck-specific workflow agents
