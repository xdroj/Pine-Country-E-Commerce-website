Phase 1: Core Structure & Setup
[ ] 1.1. Project Setup:

[ ] Initialize project folder.

[ ] Create index.html, style.css, script.js files.

[ ] Link CSS and JS files correctly in index.html.

[ ] 1.2. HTML Skeleton (SEO Optimized):

[ ] Add &lt;!DOCTYPE html&gt;, &lt;html lang="en"&gt;, &lt;head&gt;, &lt;body&gt;.

[ ] Populate &lt;head&gt; with:

[ ] Descriptive &lt;title&gt;.

[ ] &lt;meta name="description"&gt;.

[ ] &lt;meta charset="UTF-8"&gt;, &lt;meta name="viewport"&gt;.

[ ] Favicon link.

[ ] Create semantic sections: &lt;header&gt; (for nav), &lt;section id="hero"&gt;, &lt;section id="menu"&gt;, &lt;section id="gallery"&gt;, &lt;section id="feedback"&gt;, &lt;section id="contact"&gt;, &lt;footer&gt;.

[ ] Implement initial structure for the Fire Loader (e.g., a div with specific IDs/classes).

Phase 2: Design & Styling (CSS)
[ ] 2.1. Global Styles:

[ ] Basic resets (box-sizing).

[ ] Define base font sizes and family.

[ ] Implement CSS Variables for Light Theme (e.g., --text-color, --background-color).

[ ] 2.2. Dark Theme Implementation:

[ ] Define CSS Variables for Dark Theme (e.g., --text-color-dark, --background-color-dark).

[ ] Implement a CSS class (e.g., .dark-theme) to apply dark theme variables.

[ ] 2.3. Navigation Styling:

[ ] Style sticky navigation bar.

[ ] Style navigation links (hover effects, active state).

[ ] 2.4. Hero Section Styling & Parallax:

[ ] Basic layout for hero content.

[ ] Implement CSS for the background image/video.

[ ] Initial CSS for the Parallax Effect (e.g., background-attachment: fixed; if pure CSS).

[ ] 2.5. Menu Section Styling:

[ ] Basic layout for menu categories and items.

[ ] Responsive grid for menu items.

[ ] 2.6. Gallery Section Styling (Bento Layout):

[ ] Implement CSS Grid or Flexbox for the Bento Layout.

[ ] Style individual gallery items.

[ ] (Optional) Style for lightbox/modal.

[ ] 2.7. Feedback & Contact Sections Styling:

[ ] Layout for testimonials/form.

[ ] Styling for form elements (if applicable).

[ ] Styling for contact details and map embed.

[ ] 2.8. Responsive Buttons:

[ ] Apply universal button styles.

[ ] Ensure padding, font-size, min-width/height are touch-friendly.

[ ] 2.9. Fire Loader Styling:

[ ] Initial styling for the loader container.

[ ] CSS animations for the fire effect and progress bar.

[ ] 2.10. Mobile/Tablet Pagination Styling:

[ ] Basic styling for pagination dots/buttons.

[ ] Media queries to show/hide pagination based on screen size.

Phase 3: Interactivity (JavaScript)
[ ] 3.1. Smooth Scrolling:

[ ] Implement JavaScript for smooth scrolling on navigation link clicks.

[ ] 3.2. Theme Toggle Functionality:

[ ] Get reference to the theme toggle radio button/switch.

[ ] Add event listener to change theme class on &lt;body&gt; or &lt;html&gt;.

[ ] Save user's preference to localStorage and apply on page load.

[ ] 3.3. Parallax Effect Enhancement:

[ ] JavaScript for more advanced or smoother Parallax Effect (e.g., modifying background-position or transform based on scroll).

[ ] 3.4. Fire Loader Control:

[ ] JavaScript to hide the loader once all critical assets are loaded (e.g., window.onload).

[ ] (Optional) Implement progress tracking if a visual progress bar is desired.

[ ] 3.5. Responsive Navigation (Hamburger Menu for mobile):

[ ] Implement toggle functionality for mobile navigation.

[ ] 3.6. Gallery Lightbox/Modal (if applicable):

[ ] JavaScript to open/close image modals.

[ ] Keyboard navigation for images within modal.

[ ] 3.7. Feedback Form Submission (if applicable):

[ ] Basic client-side validation.

[ ] (Optional) AJAX submission.

[ ] 3.8. Mobile/Tablet Pagination Logic:

[ ] JavaScript to show/hide specific content "pages" within a section based on pagination clicks.

[ ] Update active pagination indicator.

Phase 4: Content Integration
[ ] 4.1. Populate Hero Section: Add restaurant name, tagline, and background media.

[ ] 4.2. Populate Menu Section: Add all menu items, descriptions, prices.

[ ] 4.3. Populate Gallery Section: Add high-res images with descriptive alt tags.

[ ] 4.4. Populate Feedback Section: Add testimonials. (And set up form, if applicable).

[ ] 4.5. Populate Contact Section: Add address, phone, email, hours, and map embed.

Phase 5: Testing & Optimization
[ ] 5.1. Cross-Browser Compatibility Testing:

[ ] Test on Chrome, Firefox, Safari, Edge.

[ ] 5.2. Responsiveness Testing:

[ ] Test on various screen sizes (developer tools, actual devices).

[ ] Verify responsive buttons and Bento layout.

[ ] 5.3. Performance Optimization:

[ ] Image compression.

[ ] Code minification.

[ ] Check Lighthouse scores.

[ ] 5.4. SEO Verification:

[ ] Use browser developer tools to check meta tags, heading structure, alt attributes.

[ ] (Optional) Validate schema markup.

[ ] 5.5. Accessibility Check:

[ ] Keyboard navigation.

[ ] Color contrast.

[ ] Screen reader compatibility (basic).