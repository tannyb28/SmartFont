document.addEventListener('DOMContentLoaded', () => {
  const range = document.getElementById('fontSizeRange');
  const valueDisplay = document.getElementById('fontSizeValue');
  const resetBtn = document.getElementById('resetFont');

  function updateDisplay(v) { valueDisplay.textContent = v + 'px'; }
  updateDisplay(range.value);

  // When slider moves, inject/update a style tag on the active tab
  range.addEventListener('input', async () => {
    const size = parseInt(range.value, 10);
    updateDisplay(size);
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tabs || !tabs[0]) return;
      await chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (s) => {
          const styleId = 'smartfont-extension-style';
          let style = document.getElementById(styleId);
          if (!style) {
            style = document.createElement('style');
            style.id = styleId;
            document.head.appendChild(style);
          }
          // Force font-size for all elements; using !important to override page styles.
          style.textContent = `html, body, * { font-size: ${s}px !important; }`;
        },
        args: [size],
      });
    } catch (err) {
      console.error('Error injecting font size:', err);
    }
  });

  // Reset button removes the injected style element
  resetBtn.addEventListener('click', async () => {
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tabs || !tabs[0]) return;
      await chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          const el = document.getElementById('smartfont-extension-style');
          if (el) el.remove();
        },
      });
      // reset slider display to default 16px
      range.value = 16;
      updateDisplay(16);
    } catch (err) {
      console.error('Error resetting font size:', err);
    }
  });
});