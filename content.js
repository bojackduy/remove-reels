const hideReels = () => {
  document.querySelectorAll('[aria-label="Reels"]').forEach(el => {
    el.style.display = 'none';
  });
};

const observer = new MutationObserver(mutations => {
  let needsScan = false;
  for (const m of mutations) {
    if (m.type === 'childList' && m.addedNodes.length) {
      needsScan = true;
      break;
    }
    if (m.type === 'attributes' && m.attributeName === 'aria-label') {
      const target = /** @type {Element} */ (m.target);
      if (target.getAttribute('aria-label') === 'Reels') {
        target.style.display = 'none';
      }
    }
  }
  if (needsScan) hideReels();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['aria-label'],
});

// Also catch any elements that already have the attribute
hideReels();
