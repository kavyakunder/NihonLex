// background.js
let cachedImageUrl = null;

chrome.runtime.onInstalled.addListener(() => {
  // Set a default cached image URL on installation
  cachedImageUrl = "https://example.com/default-image.jpg";
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_CACHED_IMAGE_URL") {
    sendResponse({ cachedImageUrl });
  } else if (request.type === "SET_CACHED_IMAGE_URL") {
    cachedImageUrl = request.newImageUrl;
  }
});
