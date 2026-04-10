---
trigger: always_on
---

You are coding for a Korean client’s CMS using only HTML + CSS.

IMPORTANT: Follow these rules strictly for every single task.

### [1] PIXEL-PERFECT IMPLEMENTATION

- When a design image/screenshot is provided, reproduce it 100% accurately (spacing, alignment, proportions, typography hierarchy, image placement, borders, background areas, and visual balance).
- Do NOT redesign, simplify, or reinterpret the layout unless explicitly requested.
- Prioritize pixel-perfect HTML/CSS implementation based on the provided design.
- If any part is unclear, infer the most visually accurate structure possible from the design.

### [2] HTML STRUCTURE RULES (HIGHEST PRIORITY)

- Always check and strictly follow `templates/html-structure.html` first before writing any HTML.
- `templates/html-structure.html` is the primary source of truth for structural hierarchy, container usage, heading placement, and valid tag usage.

### [3] TYPOGRAPHY RULES

- Always inspect and reuse typography classes from `@base.css` first.
- Prefer these common defaults:
  - Section heading: `<h4 class="h4-tit01"></h4>`
  - Paragraph/body text: `<p class="con-p"></p>`
- Typography classes must only be used with their exact matching HTML tags.
- Always preserve both the correct semantic tag and the correct typography class.
- Do NOT use structural heading tags or heading classes for non-structural component text such as card titles, list labels, captions, or small UI text.
- Follow `templates/html-structure.html` as the primary source of truth for heading hierarchy, structural nesting, and valid heading usage.
- Only add custom text styling when no suitable base class exists.

### [4] IMAGE RULES

- Every `<img>` tag MUST be wrapped inside a `<div>` with the class `img-box`.
- If an `<img>` tag already has a source link (`src`) in the provided HTML/code, DO NOT delete or empty it.
- If the `src` is missing, leave it empty: `<div class="img-box"><img src="" alt="..."></div>`.
- Every image MUST include a meaningful `alt` attribute.
- The `alt` text should follow the primary language shown in the design.
- Prefer Korean when the design content is in Korean.
- If the image contains English text or the design is clearly in English, the `alt` text may be written in English to match the visible content.
- Reuse or adapt visible text from the design for the `alt` attribute when appropriate.
- Do NOT leave `alt=""` unless the image is purely decorative.
- Leave `src` empty only when no image source is provided and the CMS will replace it later:
  `<img src="" alt="...">`

### [5] RESPONSIVE RULES

- Always build fully responsive layouts.
- Breakpoints:
  - Tablet: max-width 1024px
  - Mobile: max-width 768px
  - Small Mobile: max-width 400px

- Desktop should match the provided design as closely as possible.
- On smaller screens:
  - Reduce spacing and padding proportionally.
  - Stack columns vertically when necessary.
  - Prevent horizontal overflow unless explicitly required by the design.
  - Maintain readable typography and balanced whitespace.

### [6] STRUCTURE & SEMANTICS

- Use semantic tags where appropriate (h\*, p, ul, li, a, etc.).
- Never use the <section> tag.
- Default container is <div>.

### [7] DIVIDER / SEPARATOR RULES

- Do NOT create empty elements just for dividers:
  <!-- WRONG -->
  <div class="line"></div>
- Create dividers using border-top or border-bottom on existing content elements.
- Control spacing with padding/margin on those elements.

### [8] ACCESSIBILITY & CLEAN DOM RULES

- Avoid any unnecessary empty or decorative elements.
- Every <a> tag MUST include a meaningful title attribute (never empty).
- Keep the DOM as clean and semantic as possible for better maintainability and assistive technologies.

### [9] LIST RULES

- Use semantic list tags based on the content type:
  - Use `<ul>` for unordered/bulleted lists.
  - Use `<ol>` for ordered/numbered/step-based lists.
- Never use `<ul>` for numbered content, and never use `<ol>` for purely unordered bullet content.
- Always reuse the appropriate existing list classes from `@base.css`.
- Do NOT create fake lists using `<div>`, `<p>`, `<br>`, or manually typed symbols/numbers.
- Do NOT write custom CSS for list bullets, numbering, spacing, or markers when suitable list classes already exist in `@base.css`.

#### Unordered lists

- Every unordered list must use an appropriate existing `<ul>` class from `@base.css`, such as `ul-type-dot`, `ul-type-bar`, or another approved list style.

#### Ordered lists

- Every ordered list must use an appropriate existing `<ol>` class from `@base.css`, such as `ol-type01`, `ol-type02`, or `ol-type03`.

- Correct unordered list example:
  <ul class="ul-type-dot">
    <li>...</li>
    <li>...</li>
  </ul>

- Correct ordered list example:
  <ol class="ol-type01">
    <li>...</li>
    <li>...</li>
  </ol>

### [10] TABLE RULES

- Whenever a table is required, strictly follow `templates/table-template.html`.
- Preserve the exact structure, wrapper, and class names from the template.
- Only replace the table content/data; do not invent a new table structure.
- Do NOT write custom CSS for tables.
- Always use the existing table-related classes from `@table.css`.

### [11] CSS RULES

- Write clean, maintainable, scoped CSS for the current section only.
- Prefer class-based styling.
- Do NOT overwrite global styles unnecessarily.
- Do NOT hard-code width unless absolutely required by the design.
- Prefer flexible units: `width: 100%`, `max-width`, `flex`, `grid`.
- Do NOT use inline styles unless explicitly requested.
- All custom styling must be written in `style.css`.
- You may reuse existing color utility or shared color classes from `@base.css` when they match the design appropriately.
- Do NOT redefine colors in `style.css` if a suitable existing class from `@base.css` already provides the correct result.
- If you need to override an existing class from `@base.css`, redefine that class directly in `style.css`.
- Do NOT override base classes through wrapper-based selectors such as `.my-class .h4-tit01`.
- Override the class directly instead, for example: `.h4-tit01 { ... }`.

### [12] CSS BEST PRACTICES (IMPORTANT CONTROL & CLASS STRATEGY)

- ❌ **Do NOT use `!important` under any circumstances.**
  - If a style is not applied correctly, fix it by:
    - Increasing selector specificity properly
    - Refactoring structure
    - Adjusting cascade order
  - `!important` is strictly forbidden.

- ⚠️ **Minimize creating new classes.**
  - Do NOT create unnecessary classes for individual elements.
  - Always evaluate if styling can be applied using existing structure.

- ✅ **Prefer parent-based scoping selectors**
  - Apply a class to the parent container, then target child elements via selectors.

  **GOOD**

  ```css
  .card {
    padding: 20px;
  }

  .card h3 {
    font-size: 18px;
  }

  .card p {
    color: #666;
  }
  ```

  **BAD**

  ```css
  .card-title {
    font-size: 18px;
  }

  .card-text {
    color: #666;
  }
  ```

- ✅ **Leverage HTML structure before adding classes**
  - Use tag selectors when appropriate (`.card p`, `.card ul li`)
  - Only create a new class when:
    - The element has reusable styling
    - Or cannot be targeted reliably via structure

- ❌ **Avoid over-fragmented class naming**
  - Do NOT split every element into its own class unnecessarily

**END OF RULES**
