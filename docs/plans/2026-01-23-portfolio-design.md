# Portfolio Personal - Design Document

## Overview

Personal developer portfolio for Hugo Oliva with i18n support (English/Spanish), dark/light theme toggle, and a two-column layout.

## Decisions

- **i18n**: next-intl with App Router `[locale]` routing
- **Theme**: CSS variables with dark/light toggle (default: dark)
- **Styling**: Tailwind CSS with black & white color scheme
- **Layout**: Fixed left sidebar + scrollable right content

## Project Structure

```
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   └── MainContent.tsx
│   ├── sidebar/
│   │   ├── ProfileCard.tsx
│   │   ├── ContactInfo.tsx
│   │   ├── SocialLinks.tsx
│   │   └── Navigation.tsx
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Education.tsx
│   │   ├── Blog.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── ThemeToggle.tsx
│       ├── LanguageSwitch.tsx
│       └── Button.tsx
├── i18n/
│   ├── request.ts
│   └── routing.ts
├── messages/
│   ├── en.json
│   └── es.json
└── middleware.ts
```

## Layout Specifications

### Left Sidebar (Fixed)
- Width: 320px on desktop
- Position: fixed, full height
- Contents:
  - ProfileCard: Circular avatar, name, title
  - ContactInfo: Location, email, availability status
  - SocialLinks: GitHub, LinkedIn, Twitter icons
  - Navigation: Anchor links to sections
  - ThemeToggle: Dark/light switch
  - LanguageSwitch: EN/ES toggle

### Right Content (Scrollable)
- Takes remaining viewport width
- Padding for comfortable reading
- Sections:
  1. About - Introduction paragraphs
  2. Experience - Job timeline with achievements
  3. Projects - Grid of project cards
  4. Skills - Categorized tech tags
  5. Education - Degree list
  6. Blog - Article cards (placeholder)
  7. Contact - Form (name, email, message)

## Theme System

```css
/* Light theme */
--bg-primary: #ffffff;
--bg-secondary: #f5f5f5;
--text-primary: #000000;
--text-secondary: #666666;
--border: #e5e5e5;

/* Dark theme */
--bg-primary: #0a0a0a;
--bg-secondary: #141414;
--text-primary: #ffffff;
--text-secondary: #a0a0a0;
--border: #262626;
```

## Responsive Behavior

- Desktop (>1024px): Two columns side by side
- Mobile (<1024px): Sidebar collapses to header/top section, content stacks below

## i18n Structure

Routes: `/en/`, `/es/`
Default locale: `en`
Translation files: `messages/en.json`, `messages/es.json`
