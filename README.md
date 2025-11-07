# Smart Font — Chrome extension

This small extension lets you change the font size of all text on the active tab using a slider in the popup. It injects a small style tag into the page to force font sizes (uses `!important`).

Files changed/added
- `smartfont.html` — popup UI (slider + reset) and path to `scripts/control.js`.
- `scripts/control.js` — popup script that uses `chrome.scripting.executeScript` to inject/remove a style element on the active tab.

How to install (developer mode)
1. Open Chrome and navigate to chrome://extensions
2. Enable "Developer mode" (top-right)
3. Click "Load unpacked" and select the project folder (the folder that contains `manifest.json`)
4. The extension should appear in the list. Click the extension icon to open the popup.

Usage
- Move the slider in the popup to change the font size on the current active tab.
- Click Reset to remove the injected style and return the page to its original font sizes.

Notes
- This uses the `scripting` API (Manifest V3). The popup calls `chrome.tabs.query` to find the active tab, then injects a style element with id `smartfont-extension-style`.
- Because the extension injects `html, body, * { font-size: Npx !important; }`, it forces a uniform font size on most pages. Some pages with shadow DOM or inline frames may not be affected.
- If you want more fine-grained control (increase/decrease by percentage, affect only certain selectors, or adjust `rem` root size rather than absolute px), tell me and I can add variants.

Troubleshooting
- If the slider doesn't appear to work, open DevTools on the page (right-click → Inspect) and check for a `<style id="smartfont-extension-style">` in the document head.
- If you see permission errors in the extension popup console, make sure `scripting` and `activeTab` are present in `manifest.json` (they are by default in this project).

License: MIT-style (you can change as desired)
