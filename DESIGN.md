---
version: alpha
name: AFI
description: Visual direction for the AFI website
colors:
  primary: "#1e3a8a"
  primary-hover: "#172a66"
  primary-soft: "#e9edff"
  background: "#fcfcfa"
  text: "#111312"
  muted: "#687170"
  surface: "rgba(255, 255, 255, 0.92)"
  surface-strong: "#ffffff"
  surface-soft: "#f5f7fb"
  border: "rgba(17, 19, 18, 0.12)"
typography:
  heading:
    fontFamily: Raleway
    fontWeight: 400
  body:
    fontFamily: Onest
    fontSize: 1rem
  technical-label:
    fontFamily: IBM Plex Mono
    fontSize: 0.6875rem
    letterSpacing: 0.16em
rounded:
  small: 3px
  control: 6px
  panel: 8px
  workspace: 12px
spacing:
  small: 0.5rem
  medium: 1rem
  large: 1.5rem
  section: 6rem
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-strong}"
    rounded: "{rounded.control}"
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.surface-strong}"
---

## Overview

### 01. Identity and scope

AFI has a bright, orderly editorial feel, with product visuals, images, icons, and motion that make its services easier to understand. Pair large typography, whitespace, fine lines, and blue accents with illustrations or interactions that explain the content. The result should feel lively, clear, and competent.

This guide applies to the AFI website interface. The values come from the current implementation; usage rules and the checklist provide direction for future work. Local variations still exist and should not be assumed to be consistent throughout the site.

### 02. How to use this guide

1. Understand the purpose and content of the page, then inspect existing components before creating a new pattern.
2. Use the global tokens and patterns below as a starting point. Preserve variations that serve a clear purpose.
3. When changing a design decision that applies broadly, update both the implementation and this document. The YAML tokens above are documentation and are not automatically connected to the CSS.
4. Before finishing, use the checklist at the end. Do not assume new rules in this document already apply to every existing page.

**Implementation sources:** `app/globals.css` for global tokens, `app/layout.tsx` for fonts, and each component's CSS module for local variations. For Next.js UI work, also follow `AGENTS.md` and the relevant local Next.js documentation.

## Colors

### 03. Palette and roles

Use tokens according to their roles. The global CSS values are the implementation source; the YAML names are their documentation equivalents.

| Role | CSS token | Value | Use |
| --- | --- | --- | --- |
| Canvas | `--background` | `#fcfcfa` | Main paper-like background. |
| Primary text | `--text` | `#111312` | Primary text and the dark footer background. |
| Supporting text | `--muted` | `#687170` | Descriptions and metadata; check contrast against the background. |
| Accent | `--accent` | `#1e3a8a` | Actions, important links, and relevant emphasis. |
| Accent hover | `--accent-hover` | `#172a66` | Hover state for blue actions. |
| Soft accent | `--accent-soft` | `#e9edff` | Supporting backgrounds or selected states. |
| Surface | `--surface` | `rgba(255, 255, 255, 0.92)` | Slightly transparent white surface. |
| Solid surface | `--surface-strong` | `#ffffff` | Solid white panels or surfaces. |
| Soft surface | `--surface-soft` | `#f5f7fb` | Separation between groups and sections. |
| Border | `--border` | `rgba(17, 19, 18, 0.12)` | Dividers and element boundaries. |

**Rule:** Use blue as the primary accent, with neutral canvas and text colors as the foundation. Use color according to its function and check the contrast of every text and background pairing.

**Exceptions:** The footer uses a dark background with light text. Product visuals may use additional colors to distinguish data or statuses; those colors do not automatically become global accents.

## Typography

### 04. Font roles and scale

| Role | Font | Use |
| --- | --- | --- |
| Heading | Raleway | Headings and large numbers; usually weight 400, tight line height, and slightly negative letter spacing. |
| Body | Onest | Body copy, navigation, and interface text; base size `1rem`, with supporting text often at `0.875rem`. |
| Technical | IBM Plex Mono | Section labels, metadata, and numbers. Global labels use `0.6875rem`, uppercase, and `0.16em` letter spacing. |

Use the fluid scale in `app/globals.css`: display `clamp(2.25rem, 4.2vw, 4rem)`, page title `clamp(2.25rem, 4vw, 3.5rem)`, and section title `clamp(2rem, 3.2vw, 3rem)`. Special compositions may differ when the content calls for it. Do not use small, widely spaced labels for paragraphs or primary information.

## Layout

### 05. Structure and responsiveness

- Use whitespace to separate hierarchy and fine lines to organize lists or groups of information.
- On service pages, start with a maximum container width of `76rem`, horizontal padding of `2.5rem`, and section spacing of `6rem`. The main hero and header have their own dimensions.
- Choose the number of columns based on the content. Reflow to one column when space is limited; do not force content to overflow or be clipped.
- Breakpoints follow component needs. For reference, navigation changes at `1120px`; service pages use mobile adjustments at `760px`.
- Leave room for the persistent chat dock at the bottom and aim for a minimum `44px` touch target for new controls.

**Exceptions:** Heroes, product visuals, and pages with specific content needs may use different proportions or breakpoints. Ensure the result remains readable and usable on small screens.

## Elevation & Depth

### 06. Surfaces and shadows

Use borders and differences in surface color to separate groups. Add layers, surface contrast, and soft shadows to give depth to product visuals, floating elements, or areas that need emphasis. Adjust their intensity to support the hierarchy so images and key information remain prominent.

## Shapes

### 07. Radius by function

| Element | Starting point |
| --- | --- |
| Small details | `3px` |
| Controls | `6px` |
| Panels | `8px` |
| Workspace frames | `12px` |

Circular shapes may be used for controls or parts of a diagram when appropriate to their function. This scale is a starting point; preserve exceptions with a visual or functional reason.

## Components

### 08. Actions and navigation

- **Primary action:** Service pages use a blue button with white text, a minimum height of `48px`, a `6px` radius, and a darker hover state. Use labels that describe the action. The header has its own dark button variant.
- **Secondary action:** Use a text link or outlined button with a quieter hierarchy than the primary action.
- **Navigation:** Keep the fixed header, desktop menu, and mobile panel. Clearly show the active page and keyboard focus.
- **States:** Provide hover, `focus-visible`, active, and disabled states where relevant. For interfaces that load or submit data, provide loading, empty, and error states as needed; explain the next action when necessary.

### 09. Panels, lists, and product visuals

Use white or soft backgrounds, fine borders, and sufficient space. For editorial lists, dividers may replace individual cards. Product visuals should explain a flow, data, or an interface state relevant to the service. Small details in illustrations are not a size reference for primary content text.

**Visual direction:** When designing a section, identify information that would be easier to understand if shown. Use images, illustrations, icons, diagrams, or interactive product components to explain benefits, processes, or outcomes. Give visuals enough room in the composition and vary their form to suit the content; a simple text section is still appropriate when it communicates most clearly.

| Need | Visual approach |
| --- | --- |
| How a product works | Product views, interactive demonstrations, or flow diagrams with readable steps. |
| Benefits or capabilities | Relevant illustrations, meaningful icons, or product excerpts that show the capability. |
| Outcomes or case studies | Relevant images and data visualizations based on verifiable results. |
| Processes or state changes | Visual sequences or short animations that show the relationship between steps. |

**Images and icons:** Use assets appropriate to the context and usage rights. Choose icons that help identify a concept or action, with consistent style and sizing within each context. Do not rely on icons alone when a text label is needed. Provide appropriate alternative text for informative images; decorative images do not need to repeat the text content.

### 10. Q&A / FAQ: Built for clarity

**When to use:** For a question-and-answer section suited to an interactive list with a supporting visual.

**Pattern:** Use the **04 / Built for clarity** section on the AfiInsight page as a reference. On desktop, place a numbered accordion list on the left and a visual panel on the right. Separate questions with fine lines and show the answer beneath the open question. The visual panel may follow the selected item.

**Mobile:** Reflow to one column; the current reference places the visual panel above the list. Adjust the order if needed to make answers easier to access.

**Accessibility:** Use buttons to open questions, show the expanded state, and make sure answers can be accessed with a keyboard. Important information must be available as text, not only in the visual.

**Code reference:** `FeatureExplorer` in `components/services/shared/ServiceInteractions.tsx` and the `featureExplorer` class in `components/services/shared/ServicePage.module.css`. Adapt the content and behavior to the needs of the Q&A.

### 11. Motion and accessibility

Actively use motion and interactive components when they help show a process, changes in data, relationships between steps, or responses to user actions. For example, update a visual when an accordion item is selected, show stages in a flow, or provide feedback on a control. Motion can also create visual rhythm without disrupting readability.

Keep the final state and important information visible; do not make users wait for an animation to understand the content. Respect `prefers-reduced-motion` with an equivalent static presentation, and provide pause controls for prolonged automatic motion when needed. Interactions must work with keyboard and touch. Use semantic elements, clear labels, visible focus, and color pairings with appropriate contrast.

## Do's and Don'ts

### 12. Do's

- Use existing tokens and components before creating a new variation; document exceptions that apply broadly.
- Build hierarchy through typography, spacing, and content. Use blue for emphasis that serves a purpose.
- Choose patterns based on the section's content and purpose. Measure visual references when their details matter.
- Look for opportunities to use images, icons, product visuals, and motion to explain information and create visual variety across sections.
- Ensure interactions are keyboard accessible and remain functional with reduced motion.

### 13. Don'ts

- Do not use small, widely spaced text as primary content.
- Do not add irrelevant images, icons, or animations that obscure information or interfere with use.
- Do not create controls without a clear action or rely on color alone to communicate state.
- Do not invent claims, figures, customer logos, or testimonials without verifiable sources.

### 14. Preflight checklist

- [ ] Do colors and fonts use tokens or variations with a clear reason?
- [ ] Do headings, content, and actions have an understandable hierarchy?
- [ ] Have sections explaining processes, benefits, or outcomes considered visuals that help users understand them?
- [ ] Are images and icons relevant, legible, and provided with appropriate alternative text or labels?
- [ ] Do interactions and motion clarify the content, and can automatic motion be controlled when necessary?
- [ ] Is the layout readable on desktop and mobile without content being clipped or covered by the chat dock?
- [ ] Do controls have appropriate labels and states, including keyboard focus and feedback when needed?
- [ ] Has the contrast of text and controls been checked against their backgrounds?
- [ ] Do content and functionality remain available when reduced motion is enabled?
- [ ] If using the Q&A pattern, can answers be opened and read with a keyboard, including on mobile?
- [ ] If global rules or tokens changed, have the implementation and this document been updated together?
