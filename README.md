# JJ's Portfolio Website

A modern, responsive portfolio website built for showcasing web development projects and skills.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Customization](#customization)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [License]

## Overview

This portfolio website is designed to showcase a web developer's projects, skills, and experience in a clean, modern format. It features a responsive design that works well on devices of all sizes, from mobile phones to desktop computers.

## Features

- **Single-page application** with smooth scrolling navigation
- **Responsive design** that adapts to all screen sizes
- **Project showcase** with filtering by category
- **Skills section** with visual representation of expertise
- **Contact form** for visitors to get in touch
- **Animated elements** that enhance user experience
- **SEO-friendly** structure with metadata for search engines and social sharing

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid for layouts)
- Vanilla JavaScript (no frameworks)
- Font Awesome icons
- Google Fonts

## Project Structure

```
portfolio/
├── css/
│   ├── normalize.css       # CSS reset for cross-browser consistency
│   ├── main.css            # Main styles for the website
│   └── animations.css      # Animation-specific styles
├── js/
│   ├── main.js             # Main JavaScript functionality
│   ├── animations.js       # Scroll-based animations
│   └── projects.js         # Project filtering and interaction
├── img/
│   ├── projects/           # Project images
│   ├── icons/              # Skill icons and UI elements
│   └── profile/            # Profile and about images
├── assets/
│   └── resume.pdf          # Downloadable resume
└── index.html              # Main HTML file
```

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/portfolio.git
   ```

2. No build process or dependencies are required for this project as it uses vanilla HTML, CSS, and JavaScript.

3. Open `index.html` in your browser to view the website locally.

## Customization

### Updating Content

1. **Profile Information**: Edit the text in the hero, about, and contact sections in `index.html`
2. **Projects**: Update the project cards in the projects section with your own projects
3. **Skills**: Modify the skill items and their progress levels in the skills section
4. **Resume**: Replace `assets/resume.pdf` with your own resume file
5. **Profile Image**: Replace the image files in `img/profile/` with your own photos

### Color Scheme

The website uses a custom color palette defined with CSS variables in `css/main.css`:

```css
:root {
    --primary: #00A87E;       /* Green */
    --secondary: #F44336;     /* Coral */
    --accent: #FFA726;        /* Orange */
    --background: #F8F4E3;    /* Cream */
    --text: #424242;          /* Dark Grey */
    --headings: #00A87E;      /* Green */
    --card-bg: #FFFFFF;       /* White */
    --divider: #F5F5F5;       /* Light Grey */
    --subtle-accent: #E1BEE7; /* Lavender */
}
```

To change the color scheme, simply update these variables.

## Deployment

This project can be deployed to any web hosting service:

1. Upload all files to your web hosting service
2. Ensure that `index.html` is set as the default document
3. Configure HTTPS for secure access
4. Set up proper caching headers for optimal performance

## Future Enhancements

- Blog section for sharing articles and tutorials
- Dark/Light mode toggle
- Project detail pages with case studies
- Testimonials section
- Integration with a headless CMS for easier content management
- Progressive Web App (PWA) capabilities

---

## License

This project is licensed under the MIT License.

## Usage Restrictions

While this project is available for viewing and learning purposes, please note the following restrictions:
- Do not copy, modify, or redistribute the code without explicit permission.
- This code is intended for personal use and reference only.


Built with ❤️ by Jerry James
