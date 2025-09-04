Interactive Webpage Project
Overview
This project is a modern, responsive webpage built with HTML, CSS, and JavaScript. It features a variety of interactive components, including a modal window, smooth scrolling navigation, tabbed content, sticky navigation, lazy-loaded images, and a slider. The codebase is designed to enhance user experience with dynamic and visually appealing interactions.
Features
1. Modal Window

Functionality: A modal window that can be opened by clicking designated buttons and closed via a close button, overlay click, or the Escape key.
Implementation: Uses JavaScript to toggle the hidden class on the modal and overlay elements for seamless show/hide functionality.

2. Smooth Scrolling

Functionality: Smooth scrolling to specific sections when clicking navigation links or a dedicated scroll button.
Implementation: Utilizes the scrollIntoView method with behavior: "smooth" for a fluid scrolling experience.

3. Tabbed Component

Functionality: A tabbed interface where clicking a tab displays corresponding content while hiding others.
Implementation: Dynamically adds/removes operations__tab--active and operations__content--active classes to manage tab states.

4. Navigation Hover Effects

Functionality: Hovering over navigation links reduces the opacity of other links and the logo, creating a focused effect.
Implementation: Uses mouseover and mouseout events to adjust the opacity of sibling elements.

5. Sticky Navigation

Functionality: The navigation bar becomes sticky (fixed at the top) when the header section is no longer visible.
Implementation: Leverages the IntersectionObserver API to detect when the header exits the viewport and toggles the sticky class.

6. Section Reveal

Functionality: Sections are revealed with a fade-in effect as they enter the viewport.
Implementation: Uses IntersectionObserver to remove the section--hidden class when sections are 15% visible.

7. Lazy Loading Images

Functionality: Images load only when they are about to enter the viewport, improving page load performance.
Implementation: IntersectionObserver replaces the src attribute with data-src when images are near the viewport, removing the lazy-img class after loading.

8. Slider

Functionality: A carousel slider with navigation buttons, dots, and keyboard arrow key support for navigating slides.
Implementation: Dynamically translates slides using CSS transform and manages active states for navigation dots.

Installation

Clone the repository:git clone <repository-url>


Open the index.html file in a web browser to view the project.

Usage

Modal Window: Click any "Show Modal" button to open the modal. Close it by clicking the close button, overlay, or pressing Escape.
Navigation: Click navigation links to smoothly scroll to sections. Hover over links for a visual effect.
Tabs: Click tabs to switch between content sections.
Slider: Use the left/right buttons, keyboard arrows, or dots to navigate through slides.
Sticky Navigation: Scroll past the header to see the navigation bar stick to the top.
Lazy Images: Scroll to images to see them load dynamically.

Technologies Used

HTML: Structure of the webpage.
CSS: Styling and animations.
JavaScript: Interactivity, including event listeners and IntersectionObserver for performance optimization.

Project Structure
├── index.html        # Main HTML file
├── styles.css        # CSS styles
├── script.js         # JavaScript logic (provided code)
└── README.md         # This file

Contributing
Contributions are welcome! Please fork the repository, make changes, and submit a pull request with a clear description of your updates.
License
This project is licensed under the MIT License.
