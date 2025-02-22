import { writable, readable } from 'svelte/store';

export const pageMounted = writable(false);

export const isDarkMode = readable(false, (set) => {
  const htmlElement = document.documentElement;

  // Function to update the store based on the current theme
  const updateTheme = () => {
    set(htmlElement.getAttribute('data-theme') === 'dark' || htmlElement.classList.contains('dark'));
  };

  // Initial check
  updateTheme();

  // Observe changes to the class attribute
  const observer = new MutationObserver(updateTheme);
  observer.observe(htmlElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'class']
  });

  // Cleanup function
  return () => observer.disconnect();
});
