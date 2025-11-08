# OpenGraph Images Specification for HealthCheck

**Status**: 16 Missing Images (BLOCKING Production Launch)
**Date Created**: November 7, 2025
**Image Dimensions**: 1200x630px (OpenGraph standard)
**Format**: JPG (recommended for photos/gradients) or PNG (for graphics with transparency)

---

## Executive Summary

HealthCheck is 95% production-ready but BLOCKED by 16 missing OpenGraph (OG) images. These images are critical for social media sharing on Facebook, Twitter, LinkedIn, and other platforms. Without them, shared links will appear broken or unprofessional.

**Current State**:
- Directories created: `/public/images/og/`, `/public/images/blog/`, `/public/images/calculators/`
- Existing images: 0 of 16
- Missing images: 16 (100%)

**Impact**:
- Poor social media presentation
- Reduced click-through rates on shared links
- Unprofessional appearance
- Failed OpenGraph validation tests

---

## Directory Structure

```
/public/images/
├── og/                          # General OpenGraph images
│   └── og-image.jpg            # Main homepage image
├── blog/                        # Blog post images
│   └── measuring-body-fat.jpg  # Blog: Measuring Body Fat
└── calculators/                 # Calculator-specific images (coming soon pages)
    ├── bmi-calculator-og.jpg           # BMI Calculator
    ├── tdee-calculator-og.jpg          # TDEE Calculator
    ├── calorie-deficit-calculator.jpg  # Calorie Deficit Calculator
    ├── weight-management-calculator.jpg # Weight Management Planner
    └── maximum-fat-loss-calculator.jpg # Maximum Fat Loss Calculator
```

---

## Canva MCP Installation Status

**Status**: NOT INSTALLED
**Configuration File**: `~/.config/claude/claude_desktop_config.json`
**Result**: File not found

### Installation Instructions (when ready to create images)

To install Canva MCP server for image creation:

1. **Install the MCP server**:
```bash
npm install -g @anthropic/canva-mcp-server
```

2. **Configure Claude Desktop** (`~/.config/claude/claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "canva": {
      "command": "npx",
      "args": ["-y", "@anthropic/canva-mcp-server"],
      "env": {
        "CANVA_API_KEY": "your-canva-api-key-here"
      }
    }
  }
}
```

3. **Get Canva API Key**:
   - Visit https://www.canva.com/developers/
   - Create a developer account
   - Generate an API key
   - Add to config above

4. **Restart Claude Desktop**

---

## HealthCheck Brand Guidelines

### Color Palette

**Primary Colors** (from `/src/app/globals.css` and `/tailwind.config.js`):
- **Background Light**: `#f0f2f5` (Light gray-blue)
- **Background Dark**: `#121212` (Near black)
- **Primary White**: `#ffffff`
- **Primary Gray**: `#e5e7eb`

**Accent Colors**:
- **Primary Accent**: `#4f46e5` (Indigo-500)
- **Accent Light**: `#6366f1` (Indigo-400)
- **Accent Dark**: `#4338ca` (Indigo-600)

**Semantic Colors**:
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)
- **Info**: `#3b82f6` (Blue)

### Typography
- **Font Family**: Inter (or fallback to -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- **Title Font Size**: 64-72px (bold, 900 weight)
- **Subtitle Font Size**: 28-32px (medium, 500-600 weight)
- **Body Font Size**: 20-24px (regular, 400 weight)

### Design Style
- **Style**: Neumorphic (soft shadows, subtle depth)
- **Shadows**: Soft, multi-layered
  - Light shadow: `rgba(255, 255, 255, 0.9)`
  - Dark shadow: `rgba(0, 0, 0, 0.1)`
- **Border Radius**: 16px (1rem)
- **Design Philosophy**: Clean, modern, professional, health-focused

### Logo/Branding
- **Site Name**: HealthCheck
- **Tagline Options**:
  - "Health and Fitness Calculators"
  - "Your Health, Calculated"
  - "Smart Health Metrics"
  - "Know Your Numbers"

---

## Required Images (16 Total)

### Category 1: Main Site Images (1 image)

#### 1. Homepage OpenGraph Image
- **Filename**: `og-image.jpg`
- **Directory**: `/public/images/og/`
- **Referenced in**: `/src/app/layout.tsx` (line 35)
- **Dimensions**: 1200x630px
- **Title**: "HealthCheck - Health and Fitness Calculators"
- **Subtitle**: "Your go-to resource for health and fitness calculators"
- **Visual Elements**:
  - Clean, modern background with HealthCheck brand colors
  - Icons representing different calculators (scale, heart rate, ruler, measuring tape)
  - Neumorphic design elements
  - Professional, trustworthy appearance
- **Color Scheme**: Primary indigo (#4f46e5) with white background
- **Text Placement**: Title centered or left-aligned, icons on right or bottom

---

### Category 2: Implemented Calculator Images (5 images)

#### 2. BMI Calculator
- **Filename**: `bmi-calculator-og.jpg`
- **Directory**: `/public/images/`
- **Referenced in**: `/src/app/bmi/metadata.ts` (line 18)
- **Title**: "BMI Calculator"
- **Subtitle**: "Calculate your Body Mass Index"
- **Visual Elements**:
  - Scale icon or body silhouette
  - Height/weight visualization
  - Clean, medical-professional aesthetic
- **Colors**: Indigo accent with info blue (#3b82f6)

#### 3. TDEE Calculator
- **Filename**: `tdee-calculator-og.jpg`
- **Directory**: `/public/images/`
- **Referenced in**: `/src/app/tdee/metadata.ts` (line 19)
- **Title**: "TDEE Calculator"
- **Subtitle**: "Total Daily Energy Expenditure"
- **Visual Elements**:
  - Energy/calorie icon (flame or lightning)
  - Activity level icons (sedentary to very active)
  - Numbers/metrics visualization
- **Colors**: Indigo accent with warning amber (#f59e0b)

#### 4. Body Fat Calculator
- **Filename**: Currently MISSING (no OG image defined)
- **Directory**: `/public/images/`
- **Referenced in**: `/src/app/body-fat/metadata.ts` (MISSING openGraph.images)
- **Title**: "Body Fat Calculator"
- **Subtitle**: "Calculate Your Body Fat Percentage"
- **Visual Elements**:
  - Body composition visualization
  - Measurement icons (calipers, tape measure)
  - Percentage badge
- **Colors**: Indigo accent with success green (#10b981)
- **Note**: NEEDS TO BE ADDED to metadata.ts

#### 5. Body Fat Burn Calculator
- **Filename**: Currently MISSING (no OG image defined)
- **Directory**: `/public/images/`
- **Referenced in**: `/src/app/body-fat-burn/metadata.ts` (MISSING openGraph.images)
- **Title**: "Body Fat Burn Calculator"
- **Subtitle**: "Activity & Weight Loss Planner"
- **Visual Elements**:
  - Activity icons (running, cycling, swimming)
  - Flame/burn icon
  - Timer or calendar
- **Colors**: Indigo accent with danger red (#ef4444)
- **Note**: NEEDS TO BE ADDED to metadata.ts

#### 6. ABSI Calculator
- **Filename**: Currently MISSING (no OG image defined)
- **Directory**: `/public/images/`
- **Referenced in**: `/src/app/absi/metadata.ts` (MISSING openGraph.images)
- **Title**: "ABSI Calculator"
- **Subtitle**: "A Body Shape Index Calculator"
- **Visual Elements**:
  - Body shape silhouette
  - Waist measurement visualization
  - Health risk indicator
- **Colors**: Indigo accent with info blue (#3b82f6)
- **Note**: NEEDS TO BE ADDED to metadata.ts

#### 7. WHR Calculator
- **Filename**: Currently MISSING (no OG image defined)
- **Directory**: `/public/images/`
- **Referenced in**: `/src/app/whr/metadata.ts` (MISSING openGraph.images)
- **Title**: "WHR Calculator"
- **Subtitle**: "Waist-to-Hip Ratio Calculator"
- **Visual Elements**:
  - Apple vs pear body shape icons
  - Waist and hip measurement visualization
  - Ratio badge
- **Colors**: Indigo accent with warning amber (#f59e0b)
- **Note**: NEEDS TO BE ADDED to metadata.ts

---

### Category 3: Coming Soon Calculator Images (4 images)

#### 8. Calorie Deficit Calculator
- **Filename**: `calorie-deficit-calculator.jpg`
- **Directory**: `/public/images/calculators/`
- **Referenced in**: `/src/app/calorie-deficit/layout.tsx` (line 21)
- **Title**: "Calorie Deficit Calculator"
- **Subtitle**: "Plan Your Weight Loss Journey"
- **Visual Elements**:
  - Downward trending graph
  - Calendar with timeline
  - Calorie visualization
- **Colors**: Indigo accent with success green (#10b981)

#### 9. Weight Management Planner
- **Filename**: `weight-management-calculator.jpg`
- **Directory**: `/public/images/calculators/`
- **Referenced in**: `/src/app/weight-management/layout.tsx` (line 21)
- **Title**: "Weight Management Planner"
- **Subtitle**: "Reach Your Goal Weight"
- **Visual Elements**:
  - Target/goal icon
  - Scale with arrow
  - Progress tracker visualization
- **Colors**: Indigo accent with info blue (#3b82f6)

#### 10. Maximum Fat Loss Calculator
- **Filename**: `maximum-fat-loss-calculator.jpg`
- **Directory**: `/public/images/calculators/`
- **Referenced in**: `/src/app/maximum-fat-loss/layout.tsx` (line 21)
- **Title**: "Maximum Fat Loss Calculator"
- **Subtitle**: "Optimize Your Cutting Calories"
- **Visual Elements**:
  - Muscle preservation icon
  - Optimization graph
  - Fat loss visualization
- **Colors**: Indigo accent with danger red (#ef4444)

#### 11. Unit Converter
- **Filename**: `og-image.jpg` (reusing homepage image)
- **Directory**: `/public/images/`
- **Referenced in**: `/src/app/conversions/layout.tsx` (line 21)
- **Title**: "Unit Converter"
- **Subtitle**: "Measurement Conversions"
- **Visual Elements**:
  - Conversion arrows (kg ↔ lbs, cm ↔ feet)
  - Measurement icons
  - International flags or metric/imperial symbols
- **Colors**: Indigo accent with info blue (#3b82f6)
- **Note**: Currently reuses homepage image, should have dedicated image

---

### Category 4: Blog Post Images (5 images)

#### 12. Measuring Body Fat (Blog)
- **Filename**: `measuring-body-fat.jpg`
- **Directory**: `/public/images/blog/`
- **Referenced in**: `/src/app/blog/measuring-body-fat/content.tsx` (line 58)
- **Title**: "Measuring Body Fat"
- **Subtitle**: "Pros & Cons of Different Methods"
- **Visual Elements**:
  - DEXA scan icon
  - Calipers
  - Comparison chart
- **Colors**: Indigo accent with success green (#10b981)
- **Article Style**: Educational, professional

#### 13. Calorie Deficit Myths (Blog)
- **Filename**: Currently MISSING (no OG image defined)
- **Directory**: `/public/images/blog/`
- **Referenced in**: `/src/app/blog/calorie-deficit-myths/content.tsx` (MISSING openGraph)
- **Title**: "5 Myths About Calorie Deficits"
- **Subtitle**: "Debunked"
- **Visual Elements**:
  - Myth vs fact icons
  - Scale with question mark
  - Debunking/truth revelation visual
- **Colors**: Indigo accent with warning amber (#f59e0b)
- **Note**: NEEDS TO BE ADDED to metadata

#### 14. TDEE Explained (Blog)
- **Filename**: Currently MISSING (no OG image defined)
- **Directory**: `/public/images/blog/`
- **Referenced in**: `/src/app/blog/tdee-explained/content.tsx` (MISSING openGraph)
- **Title**: "TDEE Explained"
- **Subtitle**: "How Many Calories Do You Need?"
- **Visual Elements**:
  - Energy/calorie breakdown pie chart
  - BMR, TEF, NEAT components
  - Educational diagram
- **Colors**: Indigo accent with info blue (#3b82f6)
- **Note**: NEEDS TO BE ADDED to metadata

#### 15. Understanding ABSI (Blog)
- **Filename**: Currently MISSING (no OG image defined)
- **Directory**: `/public/images/blog/`
- **Referenced in**: `/src/app/blog/understanding-absi/content.tsx` (MISSING openGraph.images)
- **Title**: "Understanding ABSI"
- **Subtitle**: "Beyond BMI for Health Risks"
- **Visual Elements**:
  - ABSI vs BMI comparison
  - Body shape visualization
  - Health risk indicator
- **Colors**: Indigo accent with danger red (#ef4444)
- **Note**: NEEDS TO BE ADDED to metadata

#### 16. Understanding Body Fat Percentage (Blog)
- **Filename**: Currently MISSING (no OG image defined)
- **Directory**: `/public/images/blog/`
- **Referenced in**: `/src/app/blog/understanding-body-fat-percentage/content.tsx` (MISSING openGraph)
- **Title**: "Understanding Body Fat Percentage"
- **Subtitle**: "What the Numbers Really Mean"
- **Visual Elements**:
  - Body composition chart
  - Percentage ranges visualization
  - Health categories
- **Colors**: Indigo accent with success green (#10b981)
- **Note**: NEEDS TO BE ADDED to metadata

#### 17. Waist-to-Hip Ratio Guide (Blog)
- **Filename**: Currently MISSING (no OG image defined)
- **Directory**: `/public/images/blog/`
- **Referenced in**: `/src/app/blog/waist-to-hip-ratio-guide/content.tsx` (MISSING openGraph.images)
- **Title**: "Waist-to-Hip Ratio Guide"
- **Subtitle**: "Understanding Your Body Shape"
- **Visual Elements**:
  - Apple vs pear body shapes
  - Measurement guide
  - Health risk zones
- **Colors**: Indigo accent with warning amber (#f59e0b)
- **Note**: NEEDS TO BE ADDED to metadata

---

## Design Template Specification

### Standard Layout Template

All images should follow this consistent layout:

```
┌─────────────────────────────────────────┐ 1200px
│                                         │
│  ┌──────────────────────────────┐      │
│  │  [HealthCheck Logo/Brand]    │      │ 100px padding top
│  └──────────────────────────────┘      │
│                                         │
│  ┌──────────────────────────────┐      │
│  │                              │      │
│  │  [MAIN TITLE]                │      │ 200px height
│  │  Bold, 64-72px               │      │
│  │                              │      │
│  └──────────────────────────────┘      │
│                                         │
│  ┌──────────────────────────────┐      │
│  │  Subtitle/Description        │      │ 80px height
│  │  Medium, 28-32px             │      │
│  └──────────────────────────────┘      │
│                                         │
│  ┌──────────────────────────────┐      │
│  │                              │      │
│  │  [Visual Element/Icon]       │      │ 200px height
│  │  Calculator-specific         │      │
│  │                              │      │
│  └──────────────────────────────┘      │
│                                         │
└─────────────────────────────────────────┘ 630px
```

### Text Specifications

**Title Text**:
- Font: Inter Bold (900 weight) or system fallback
- Size: 64-72px
- Color: `#1f2937` (dark gray) or `#ffffff` (white, depending on background)
- Max lines: 2
- Letter spacing: -1px (tight)

**Subtitle Text**:
- Font: Inter Medium (500-600 weight)
- Size: 28-32px
- Color: `#4b5563` (medium gray) or accent color
- Max lines: 2
- Letter spacing: 0

**Brand Name**:
- Font: Inter Bold (700 weight)
- Size: 24px
- Color: `#4f46e5` (primary accent)
- Position: Top-left corner (40px from edges)

### Background Options

**Option 1: Gradient Background**
- Primary: `#f0f2f5` → `#ffffff`
- Direction: Diagonal (135deg)
- Subtle, professional

**Option 2: Solid + Accent**
- Background: `#ffffff`
- Accent panel: `#4f46e5` (20% opacity)
- Creates depth

**Option 3: Neumorphic**
- Background: `#f0f2f5`
- Soft shadows: `rgba(255, 255, 255, 0.9)` and `rgba(0, 0, 0, 0.1)`
- Card-like elements with depth

### Icon/Visual Element Guidelines

- **Style**: Line art or filled icons (consistent throughout)
- **Color**: Primary accent (#4f46e5) or semantic colors (success, warning, danger, info)
- **Size**: 120-180px (width/height)
- **Position**: Center-bottom or right side
- **Stroke**: 3-4px for line icons
- **Background**: Subtle circle or square container with 10% opacity

---

## Sample Image Specifications (Detailed Examples)

### Example 1: BMI Calculator OpenGraph Image

**Filename**: `bmi-calculator-og.jpg`
**Dimensions**: 1200x630px

**Layout**:
```
Background: White (#ffffff) with subtle gradient to #f0f2f5
┌─────────────────────────────────────────┐
│  HealthCheck                            │ Top-left, 24px, Indigo
│                                         │
│                                         │
│        BMI Calculator                   │ Center, 72px, Bold, Dark Gray
│        Calculate Your Body Mass Index   │ Center, 32px, Medium Gray
│                                         │
│            [Scale Icon]                 │ Large icon, 150px, Indigo
│         Height ↔ Weight                 │ Small text below icon
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**Elements**:
- **Title**: "BMI Calculator" - 72px, Inter Bold, #1f2937
- **Subtitle**: "Calculate Your Body Mass Index" - 32px, Inter Medium, #4b5563
- **Icon**: Scale or body measurement icon, 150x150px, #4f46e5
- **Brand**: "HealthCheck" - top-left, 24px, #4f46e5
- **Background**: White with soft gradient
- **Neumorphic Card**: Optional soft shadow card containing text

### Example 2: TDEE Calculator OpenGraph Image

**Filename**: `tdee-calculator-og.jpg`
**Dimensions**: 1200x630px

**Layout**:
```
Background: Light gray (#f0f2f5)
┌─────────────────────────────────────────┐
│  HealthCheck                            │
│                                         │
│                                         │
│     TDEE Calculator                     │ 72px, Bold
│     Total Daily Energy Expenditure      │ 28px, Medium
│                                         │
│   [Flame/Energy Icon]  [Graph]         │ Icons showing energy
│      BMR + TEF + NEAT + EAT            │ Formula visualization
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**Elements**:
- **Title**: "TDEE Calculator" - 72px, Inter Bold, #1f2937
- **Subtitle**: "Total Daily Energy Expenditure" - 28px, Inter Medium, #f59e0b (amber)
- **Icons**: Flame icon + activity icons, #f59e0b
- **Formula**: "BMR + TEF + NEAT + EAT" - 20px, visual breakdown
- **Background**: Neumorphic style with soft shadows

### Example 3: Measuring Body Fat Blog Image

**Filename**: `measuring-body-fat.jpg`
**Dimensions**: 1200x630px

**Layout**:
```
Background: White to light blue gradient
┌─────────────────────────────────────────┐
│  HealthCheck Blog                       │
│                                         │
│                                         │
│  Measuring Body Fat                     │ 68px, Bold
│  Pros & Cons of Different Methods      │ 30px, Medium
│                                         │
│  [DEXA] [Calipers] [BIA] [Navy]       │ 4 method icons
│    ↓        ↓        ↓       ↓        │
│   ⭐⭐⭐⭐  ⭐⭐⭐    ⭐⭐     ⭐⭐     │ Accuracy ratings
│                                         │
└─────────────────────────────────────────┘
```

**Elements**:
- **Title**: "Measuring Body Fat" - 68px, Inter Bold, #1f2937
- **Subtitle**: "Pros & Cons of Different Methods" - 30px, Inter Medium, #4b5563
- **Icons**: 4 measurement method icons, 100x100px each, #10b981 (green)
- **Ratings**: Star ratings showing accuracy
- **Background**: Educational gradient

---

## Image Creation Workflow (Without Canva MCP)

Since Canva MCP is not currently installed, here are alternative approaches:

### Option 1: Manual Creation with Canva (Recommended)
1. Visit https://www.canva.com
2. Create custom size: 1200x630px
3. Use brand colors and fonts specified above
4. Follow layout templates
5. Download as JPG (high quality, 90-95%)
6. Save to appropriate directory

### Option 2: Figma
1. Create 1200x630px frame
2. Apply HealthCheck design system
3. Export as JPG or PNG
4. Save to appropriate directory

### Option 3: Adobe Photoshop/Illustrator
1. Create artboard: 1200x630px, 72 DPI
2. Follow design templates
3. Export for web (JPG, optimized)
4. Save to appropriate directory

### Option 4: Programmatic (Node.js + Canvas)
```javascript
// Example using node-canvas
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function createOGImage(title, subtitle) {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#f0f2f5';
  ctx.fillRect(0, 0, 1200, 630);

  // Title
  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 72px Inter';
  ctx.textAlign = 'center';
  ctx.fillText(title, 600, 250);

  // Subtitle
  ctx.fillStyle = '#4b5563';
  ctx.font = '32px Inter';
  ctx.fillText(subtitle, 600, 320);

  // Save
  const buffer = canvas.toJPEG({ quality: 0.95 });
  fs.writeFileSync('og-image.jpg', buffer);
}
```

---

## Metadata Updates Required

Several files are missing OpenGraph image metadata. These need to be updated:

### Files Requiring Updates:

1. **`/src/app/body-fat/metadata.ts`** - Add openGraph.images
2. **`/src/app/body-fat-burn/metadata.ts`** - Add openGraph.images
3. **`/src/app/absi/metadata.ts`** - Add openGraph.images
4. **`/src/app/whr/metadata.ts`** - Add openGraph.images
5. **`/src/app/blog/calorie-deficit-myths/content.tsx`** - Add openGraph metadata
6. **`/src/app/blog/tdee-explained/content.tsx`** - Add openGraph metadata
7. **`/src/app/blog/understanding-absi/content.tsx`** - Add openGraph.images
8. **`/src/app/blog/understanding-body-fat-percentage/content.tsx`** - Add openGraph metadata
9. **`/src/app/blog/waist-to-hip-ratio-guide/content.tsx`** - Add openGraph.images
10. **`/src/app/conversions/layout.tsx`** - Create dedicated image (currently reuses homepage)

### Example Fix (for body-fat/metadata.ts):

```typescript
const metadata: Metadata = {
  // ... existing fields ...
  openGraph: {
    title: 'Body Fat Calculator | Calculate Your Body Fat Percentage',
    description: '...',
    url: 'https://www.heathcheck.info/body-fat',
    siteName: 'HealthCheck',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/body-fat-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Body Fat Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Fat Calculator | Calculate Your Body Fat Percentage',
    description: '...',
    images: ['/images/body-fat-calculator-og.jpg'],
  },
  // ... rest of metadata ...
};
```

---

## Priority Order for Creation

### Phase 1: Critical (Must-Have) - 7 Images
These are referenced in existing metadata and will break social sharing:
1. `og-image.jpg` - Homepage
2. `bmi-calculator-og.jpg` - BMI Calculator
3. `tdee-calculator-og.jpg` - TDEE Calculator
4. `measuring-body-fat.jpg` - Blog post
5. `calorie-deficit-calculator.jpg` - Coming Soon page
6. `weight-management-calculator.jpg` - Coming Soon page
7. `maximum-fat-loss-calculator.jpg` - Coming Soon page

### Phase 2: Important (Should-Have) - 4 Images
These need metadata updates first:
8. `body-fat-calculator-og.jpg` - Body Fat Calculator
9. `body-fat-burn-calculator-og.jpg` - Body Fat Burn Calculator
10. `absi-calculator-og.jpg` - ABSI Calculator
11. `whr-calculator-og.jpg` - WHR Calculator

### Phase 3: Nice-to-Have - 5 Images
Blog posts (need metadata updates):
12. `calorie-deficit-myths.jpg` - Blog
13. `tdee-explained.jpg` - Blog
14. `understanding-absi.jpg` - Blog
15. `understanding-body-fat-percentage.jpg` - Blog
16. `waist-to-hip-ratio-guide.jpg` - Blog

---

## Testing & Validation

After creating images, validate with:

### 1. OpenGraph Validators
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

### 2. Local Testing
```bash
# Check file sizes (should be < 1MB each)
ls -lh /Users/gr8monk3ys/code/heathcheck.info/public/images/**/*.jpg

# Verify dimensions
file /Users/gr8monk3ys/code/heathcheck.info/public/images/og/og-image.jpg
# Should show: JPEG image data, 1200 x 630
```

### 3. Browser Testing
- Open page in browser
- View page source
- Verify `<meta property="og:image" content="...">` tags
- Right-click image → "Copy image address" → paste in browser to verify loads

---

## Next Steps

### Without Canva MCP (Manual Workflow):
1. ✅ Create directory structure (`/public/images/og/`, `/blog/`, `/calculators/`)
2. ⬜ Create 7 critical images (Phase 1) using Canva or Figma
3. ⬜ Upload images to correct directories
4. ⬜ Update 10 metadata files with missing OpenGraph image references
5. ⬜ Test with OpenGraph validators
6. ⬜ Create remaining 9 images (Phases 2-3)
7. ⬜ Final validation and deployment

### With Canva MCP (Automated Workflow):
1. ⬜ Install Canva MCP server
2. ⬜ Configure Claude Desktop with API key
3. ⬜ Restart Claude Desktop
4. ⬜ Use Canva MCP to generate all 16 images programmatically
5. ⬜ Update metadata files
6. ⬜ Validate and deploy

---

## Blockers & Issues

### Current Blockers:
1. **No Canva MCP installed** - Limits automation capabilities
2. **10 metadata files missing OpenGraph images** - Must be updated before deployment
3. **Zero images created** - 100% of images missing

### Recommendations:
1. **Short-term**: Create critical images manually using Canva (free tier)
2. **Medium-term**: Update all metadata files to reference correct image paths
3. **Long-term**: Install Canva MCP for easier future updates and variations

---

## Estimated Time to Complete

**Manual Creation (Canva)**:
- Per image: 15-20 minutes
- 16 images × 20 min = ~5.5 hours
- Metadata updates: 1.5 hours
- Testing/validation: 1 hour
- **Total: ~8 hours**

**With Canva MCP (if installed)**:
- Setup: 30 minutes
- Image generation: 1-2 hours (batch)
- Metadata updates: 1.5 hours
- Testing: 1 hour
- **Total: ~4 hours**

---

## Resources

### Design Tools:
- Canva: https://www.canva.com
- Figma: https://www.figma.com
- Adobe Express: https://www.adobe.com/express/

### OpenGraph Resources:
- OG Protocol: https://ogp.me/
- Image Specs: https://www.opengraph.xyz/
- Best Practices: https://css-tricks.com/essential-meta-tags-social-media/

### Icon Resources:
- Heroicons: https://heroicons.com/ (matches site style)
- Phosphor Icons: https://phosphoricons.com/
- Lucide Icons: https://lucide.dev/

### Color Tools:
- Coolors Palette: https://coolors.co/
- Tailwind Colors: https://tailwindcss.com/docs/customizing-colors

---

## Appendix: Image Paths Reference

| Page/Calculator | Expected Image Path | Status | Priority |
|----------------|---------------------|--------|----------|
| Homepage | `/images/og-image.jpg` | Missing | Critical |
| BMI Calculator | `/images/bmi-calculator-og.jpg` | Missing | Critical |
| TDEE Calculator | `/images/tdee-calculator-og.jpg` | Missing | Critical |
| Body Fat | `/images/body-fat-calculator-og.jpg` | Missing + Metadata | Important |
| Body Fat Burn | `/images/body-fat-burn-calculator-og.jpg` | Missing + Metadata | Important |
| ABSI | `/images/absi-calculator-og.jpg` | Missing + Metadata | Important |
| WHR | `/images/whr-calculator-og.jpg` | Missing + Metadata | Important |
| Calorie Deficit | `/images/calculators/calorie-deficit-calculator.jpg` | Missing | Critical |
| Weight Management | `/images/calculators/weight-management-calculator.jpg` | Missing | Critical |
| Max Fat Loss | `/images/calculators/maximum-fat-loss-calculator.jpg` | Missing | Critical |
| Conversions | `/images/og-image.jpg` (dedicated TBD) | Missing | Nice-to-Have |
| Blog: Measuring BF | `/images/blog/measuring-body-fat.jpg` | Missing | Critical |
| Blog: Cal Deficit | `/images/blog/calorie-deficit-myths.jpg` | Missing + Metadata | Nice-to-Have |
| Blog: TDEE | `/images/blog/tdee-explained.jpg` | Missing + Metadata | Nice-to-Have |
| Blog: ABSI | `/images/blog/understanding-absi.jpg` | Missing + Metadata | Nice-to-Have |
| Blog: Body Fat % | `/images/blog/understanding-body-fat-percentage.jpg` | Missing + Metadata | Nice-to-Have |
| Blog: WHR Guide | `/images/blog/waist-to-hip-ratio-guide.jpg` | Missing + Metadata | Nice-to-Have |

---

## Document Version
- **Version**: 1.0
- **Created**: November 7, 2025
- **Last Updated**: November 7, 2025
- **Author**: Claude (IMAGE-CREATOR Agent)
- **Status**: Complete - Ready for Implementation
