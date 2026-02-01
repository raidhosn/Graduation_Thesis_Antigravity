# Elevation Plan: Refined Academic Modernism

This plan outlines the technical steps to transform the graduation thesis website into a premium, 2026-standard digital publication while maintaining its scholarly elegance.

## Proposed Changes

### 🎨 Global Styles & System
#### [MODIFY] [index.css](file:///c:/Users/v-raidhosn/Documents/GitHub/Graduation_Thesis_Antigravity/src/index.css)
- Implement Refined Academic typography rhythm (line-height 1.75).
- Add background atmosphere: subtle warm gradients and paper-like noise texture.
- Define section divider gradients and pulse animations.
- Implement link underline animations using pseudo-elements.
- Add transition utility for card hover states.

### ✨ Visual Components
#### [MODIFY] [Index.tsx](file:///c:/Users/v-raidhosn/Documents/GitHub/Graduation_Thesis_Antigravity/src/pages/Index.tsx)
- Refine TOC Cards: rounded-xl, softer shadows, and hover lift effects.
- Apply scroll-triggered reveals to chapters and preliminary sections.
- Implement page load choreography (staggered entrance).
- Enhance Footer with bilingual "CESUPA • Brazil • 1999" labels.

#### [MODIFY] [Thesis.tsx](file:///c:/Users/v-raidhosn/Documents/GitHub/Graduation_Thesis_Antigravity/src/pages/Thesis.tsx)
- Enhance Sticky Header: backdrop-blur-sm with smooth bg transition.
- Ensure consistent content rhythm for long-form reading.

### 🧠 Logic & Interactions
#### [NEW] [useIntersectionObserver.ts](file:///c:/Users/v-raidhosn/Documents/GitHub/Graduation_Thesis_Antigravity/src/hooks/useIntersectionObserver.ts)
- Create a reusable hook to manage scroll-triggered visibility for animations.

## Verification Plan

### Automated Checks
- Verify Tailwind builds without errors.
- Check browser console for hydration or animation errors.

### Manual Verification
1. **Visual Consistency**: Compare EN/PT versions to ensure identical styling.
2. **Scroll Performance**: Verify animations trigger smoothly without layout shifting.
3. **Responsive Check**: Test TOC grid on mobile (1 col) and tablet (2 col).
4. **Accessibility**: Tab through links to verify high-contrast focus rings.
