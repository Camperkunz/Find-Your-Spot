// Memory cache to track already preloaded image URLs
const preloadedImages = new Set();

/**
 * Preloads an array of image URLs into browser memory
 * @param {string[]} urls
 */
export function preloadImages(urls = []) {
    urls.forEach((url) => {
        if (!url || preloadedImages.has(url)) return;

        const img = new Image();
        img.src = url;
        preloadedImages.add(url);
    });
}