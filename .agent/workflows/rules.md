---
description: Rules CMS
---

You are coding for a Korean client’s CMS using only HTML + CSS.

IMPORTANT: Follow these rules strictly for every single task.

### [1] PIXEL-PERFECT IMPLEMENTATION

- When a design image/screenshot is provided, reproduce it 100% accurately (spacing, alignment, proportions, typography hierarchy, image placement, borders, background areas, and visual balance).
- Do NOT redesign, simplify, or reinterpret the layout unless explicitly requested.
- Prioritize pixel-perfect HTML/CSS implementation based on the provided design.
- If any part is unclear, infer the most visually accurate structure possible from the design.

### [2] HTML OUTPUT SCOPE

- Write HTML ONLY inside the existing wrapper:
    <div class="con-box">…</div>
- The final HTML must be inserted directly inside <div class="con-box">.

### [3] TYPOGRAPHY RULES (MOST IMPORTANT)

- Do NOT arbitrarily create font-size, font-weight, line-height, letter-spacing, or any text-related values if existing typography classes in @base.css can be used.
- Always inspect and rely on classes defined in @base.css first.
- Prefer these common classes:
  - Heading: <h4 class="h4-tit01"></h4>
  - Paragraph: <p class="con-p"></p>
- Reuse existing typography classes as much as possible to maintain consistency across the CMS.
- Only add custom text styling when absolutely no suitable class exists, and keep it minimal and aligned with the existing system.

### [3.1] TYPOGRAPHY CLASS / TAG MATCHING RULES

- Typography classes must only be used with the exact HTML tag they are designed for.
- Example:
  - "h4-tit01" can ONLY be used with <h4>:
    <h4 class="h4-tit01"></h4>
- Never do this:
  - <h5 class="h4-tit01"></h5>
  - <div class="h4-tit01"></div>
  - <h6 class="h4-tit01"></h6>
- Always preserve both the correct class and the correct semantic tag.

### [3.2] HEADING LEVEL PRIORITY RULES

- Always start with <h4> as the primary heading.
- Do NOT use <h5> or <h6> if the entire page/section has no headings yet.
- Only use <h5> or <h6> when a clear sub-heading hierarchy is required after <h4> has already been used.
- Never introduce h5 or h6 as the first heading level on any new page or section.

### [4] IMAGE RULES

- Every image MUST include a meaningful alt attribute in Korean.
- Alt text must accurately describe the image content.
- If Korean text appears in the design, reuse or adapt it for the alt attribute when appropriate.
- Leave src empty (CMS will replace it later):
  <img src="" alt="...">

### [5] RESPONSIVE RULES

- Always build fully responsive layouts.
- Breakpoints:
  - Tablet: max-width 1024px
  - Mobile: max-width 768px
  - Mobile (for iPhone SE): max-width 400px
- Desktop follows the design exactly.
- On tablet, adjust spacing, widths, and scaling appropriately.
- On mobile, stack vertical when needed, ensure readable spacing, and prevent any horizontal scrolling unless the design explicitly requires it.

### [6] CSS RULES

- Write clean, maintainable, scoped CSS for the current section only.
- Prefer class-based styling.
- Do NOT overwrite global styles unnecessarily.
- Do NOT hard-code width unless absolutely required by the design.
- Prefer flexible units: width: 100%, max-width, flex, grid.
- Do NOT use inline styles unless explicitly requested.
- All styling (including colors) must be written in the CSS output.
- Do NOT rely on color utility classes from @base.css — define colors directly in the section CSS.

### [7] STRUCTURE & SEMANTICS

- Use semantic tags where appropriate (h\*, p, ul, li, a, etc.).
- Never use the <section> tag.
- Default container is <div>.
- Keep markup minimal, lightweight, and CMS-friendly.
- Do not add unnecessary wrappers.

### [8] DIVIDER / SEPARATOR RULES

- Do NOT create empty elements just for dividers:
  <!-- WRONG -->
  <div class="line"></div>
- Create dividers using border-top or border-bottom on existing content elements.
- Control spacing with padding/margin on those elements.

### [9] ACCESSIBILITY & CLEAN DOM RULES

- Avoid any unnecessary empty or decorative elements.
- Every <a> tag MUST include a meaningful title attribute (never empty).
- Keep the DOM as clean and semantic as possible for better maintainability and assistive technologies.

### [10] SPACING & MARGIN RULES

- To create any spacing between sections, boxes, or elements, you MUST use the appropriate con-box variant classes: con-box02, con-box03, con-box04, etc.
- When nesting inside an existing con-box, always use con-box02 / con-box03 (or higher) for inner spacing.
- The .no-pd class MUST be added ONLY to the very last box in the entire series (con-box, con-box02, con-box03, …).
- Rule for .no-pd:
  - Add .no-pd only when there is NO other element (no other con-box, no div, no anything) after it.
  - If there is any element following the box (even a plain <div>), do NOT add .no-pd to that box.
  - Only the absolute final box in the structure receives .no-pd.
- Correct structure examples:
  con-box
  con-box
  con-box.no-pd ← last one, nothing after

  con-box02
  con-box02
  con-box02.no-pd ← last one, nothing after

  con-box03
  con-box03
  con-box03.no-pd ← last one, nothing after

### [11] UNORDERED LIST RULES

- Whenever you use the <ul> tag, you MUST apply the class "ul-type-dot" from @base.css.
- Do NOT use plain <ul> without this class under any circumstances.
- Correct usage:
  <ul class="ul-type-dot">
    <li>…</li>
    <li>…</li>
  </ul>

### [12] RESPONSIVE PADDING & SPACING RULES (NEW)

- On tablet (max-width: 1024px) and mobile (max-width: 768px) and mobile (for iPhone SE) (max-width: 400px), ALWAYS reduce padding and spacing values proportionally to prevent elements from feeling too large, cramped, or disproportionate.
- Example:
  - Desktop: padding: 40px
  - Tablet: reduce to 30px~32px
  - Mobile: reduce to 20px~24px
  - Mobile (for iPhone SE): reduce to 10px~12px
- Apply this rule to all padding, inner spacing, section gaps, and any con-box / con-box02 / con-box03 padding.
- Goal: Maintain visual balance and comfortable readability across all devices.
- Never keep desktop padding unchanged on smaller screens.

**END OF RULES**
