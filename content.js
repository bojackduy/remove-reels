const REELS_PATTERN = /\/reel\//;

const blockUrl = url => {
  try {
    return REELS_PATTERN.test(new URL(url, location.origin).pathname);
  } catch { return false; }
};

const goHome = () => {
  if (REELS_PATTERN.test(location.pathname)) {
    location.replace('/');
  }
};

// Block clicks on Reels links
document.addEventListener('click', e => {
  const link = e.target.closest('a[href]');
  if (link && blockUrl(link.href)) {
    e.preventDefault();
    e.stopPropagation();
  }
}, true);

// Block programmatic navigation via History API
const { pushState, replaceState } = history;
history.pushState = function (...args) {
  if (args[2] && blockUrl(args[2])) return;
  return pushState.apply(this, args);
};
history.replaceState = function (...args) {
  if (args[2] && blockUrl(args[2])) return;
  return replaceState.apply(this, args);
};

// Redirect if somehow already on a Reels page
goHome();
new MutationObserver(goHome).observe(document.body, { subtree: true, childList: true });

// Keep the sidebar Reels link hidden too
const style = document.createElement('style');
style.textContent = '[aria-label="Reels"] { display: none !important; }';
document.head.append(style);
