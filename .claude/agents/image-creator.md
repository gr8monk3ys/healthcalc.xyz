# Image Creator Agent

**Purpose**: Create professional OpenGraph images (1200x630px) for all HealthCheck calculator pages and blog posts using the Canva MCP server.

**Priority**: CRITICAL - This is a BLOCKING issue for production launch (16 missing images)

## Scope

This agent is responsible for creating the following OpenGraph images:

### Calculator Images (10 required)

1. BMI Calculator - `/public/images/og/bmi.png`
2. TDEE Calculator - `/public/images/og/tdee.png`
3. Body Fat Calculator - `/public/images/og/body-fat.png`
4. Body Fat Burn Calculator - `/public/images/og/body-fat-burn.png`
5. ABSI Calculator - `/public/images/og/absi.png`
6. WHR Calculator - `/public/images/og/whr.png`
7. Calorie Deficit Calculator - `/public/images/og/calorie-deficit.png`
8. Weight Management Planner - `/public/images/og/weight-management.png`
9. Maximum Fat Loss Calculator - `/public/images/og/maximum-fat-loss.png`
10. Unit Conversions - `/public/images/og/conversions.png`

### Blog Post Images (6 required)

1. Understanding ABSI - `/public/images/blog/understanding-absi.png`
2. Waist-to-Hip Ratio Guide - `/public/images/blog/waist-to-hip-ratio-guide.png`
3. Understanding Body Fat Percentage - `/public/images/blog/understanding-body-fat-percentage.png`
4. TDEE Explained - `/public/images/blog/tdee-explained.png`
5. Measuring Body Fat - `/public/images/blog/measuring-body-fat.png`
6. Calorie Deficit Myths - `/public/images/blog/calorie-deficit-myths.png`

## Design Requirements

### Dimensions

- **Size**: 1200x630 pixels (OpenGraph standard)
- **Aspect Ratio**: 1.91:1
- **Format**: PNG with optimization

### Branding

- **Domain**: HealthCheck (note: domain is healthcalc.xyz)
- **Color Scheme**: Neumorphic design with clean, modern aesthetic
- **Typography**: Professional, readable fonts
- **Logo**: Include HealthCheck branding prominently

### Content Guidelines

- **Title**: Calculator or blog post name clearly visible
- **Subtitle**: Brief description or value proposition
- **Visual Elements**: Health/fitness icons, charts, or illustrations
- **Call to Action**: Subtle encouragement (e.g., "Calculate Your Health Metrics")

### Accessibility

- High contrast for text readability
- Clean background (avoid busy patterns)
- Text size: Large enough to read in social media thumbnails

## Workflow

### Prerequisites

1. Ensure Canva MCP server is installed:
   ```bash
   claude mcp add --transport http canva https://mcp.canva.com/mcp
   ```
2. Authenticate with Canva MCP using `/mcp` command
3. Create `/public/images/og/` and `/public/images/blog/` directories if they don't exist

### Image Creation Process

For each image:

1. **Design Creation**
   - Use Canva MCP to create 1200x630px design
   - Apply HealthCheck branding and color scheme
   - Add calculator/blog post title and description
   - Include relevant health/fitness visual elements

2. **Export & Optimization**
   - Export as PNG
   - Optimize file size (aim for <200 KB)
   - Save to appropriate directory

3. **Verification**
   - Check dimensions (must be exactly 1200x630px)
   - Verify file size (<200 KB preferred)
   - Preview in OpenGraph debugger tools

4. **Update Metadata**
   - Verify metadata in calculator `layout.tsx` files reference the new image
   - Check that paths are correct: `/images/og/[calculator-name].png`

## Testing

After creating images, verify:

1. **File Existence**: All 16 images exist in correct locations
2. **Metadata References**: All `layout.tsx` files have correct image paths
3. **OpenGraph Preview**: Test with [Twitter Card Validator](https://cards-dev.twitter.com/validator) and [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
4. **Performance**: Ensure images load quickly and don't impact page performance

## Success Criteria

- [ ] All 10 calculator OpenGraph images created and saved
- [ ] All 6 blog post OpenGraph images created and saved
- [ ] All images are exactly 1200x630 pixels
- [ ] File sizes optimized (<200 KB each)
- [ ] Consistent branding across all images
- [ ] Metadata correctly references all images
- [ ] Images display correctly in social media previews

## Tools Available

- **Canva MCP**: For professional image design
- **File operations**: Read, Write for saving images
- **Bash**: For directory operations and optimization tools (like imagemagick if available)

## Notes

- This is the #1 BLOCKING issue for production launch
- Once complete, HealthCheck will be 100% production-ready
- All other aspects of the site are complete and ready for deployment
- Image creation should maintain visual consistency across all calculators
- Consider creating a template design to speed up the process

## Related Documentation

- See [MCP_SETUP.md](../MCP_SETUP.md) for Canva MCP installation instructions
- See [TODO.md](../../TODO.md) for overall launch checklist
- OpenGraph image metadata is in each calculator's `src/app/[calculator]/layout.tsx`
