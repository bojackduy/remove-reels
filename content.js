const host = location.hostname;

const BLOCKED_PAGE = 'data:text/html,<h1>Blocked</h1><p>This site has been blocked.</p>';

const config = {
  'facebook.com': {
    pattern: /\/reel\//,
    css: '[aria-label="Reels"] { display: none !important; }',
  },
  'youtube.com': {
    pattern: /\/shorts\//,
    css: `
      [title="Shorts"],
      a[aria-label="Shorts"],
      ytd-guide-entry-renderer:has(a[title="Shorts"]),
      ytd-rich-section-renderer:has(#title-container:has(a[title="Shorts"]))
        { display: none !important; }
    `,
  },
  'tiktok.com': {
    pattern: /./,
    css: 'html { display: none !important; }',
  },
};

const site = Object.keys(config).find(h => host.includes(h));
if (!site) throw new Error('Unsupported site');

const { pattern, css } = config[site];

const blockUrl = url => {
  try {
    return pattern.test(new URL(url, location.origin).pathname);
  } catch { return false; }
};

const goHome = () => {
  if (pattern.test(location.pathname)) {
    location.replace(site === 'tiktok.com' ? BLOCKED_PAGE : '/');
  }
};

document.addEventListener('click', e => {
  const link = e.target.closest('a[href]');
  if (link && blockUrl(link.href)) {
    e.preventDefault();
    e.stopPropagation();
  }
}, true);

const { pushState, replaceState } = history;
history.pushState = function (...args) {
  if (args[2] && blockUrl(args[2])) return;
  return pushState.apply(this, args);
};
history.replaceState = function (...args) {
  if (args[2] && blockUrl(args[2])) return;
  return replaceState.apply(this, args);
};

goHome();
new MutationObserver(goHome).observe(document.body, { subtree: true, childList: true });

const style = document.createElement('style');
style.textContent = css;
document.head.append(style);
