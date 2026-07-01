function initBubble() {
  const { hostname, pathname } = window.location;
  const segments = pathname.replace(/\/$/, '').split('/').filter(Boolean);
  if (segments.length < 2) return;

  const owner = segments[0];
  const repo = segments[1];

  const isOnGitHub = hostname === 'github.com';
  const isOnDeepWiki = hostname === 'deepwiki.com';
  if (!isOnGitHub && !isOnDeepWiki) return;

  const bubble = document.createElement('div');
  bubble.id = 'deepwiki-bubble';

  const targetHost = isOnGitHub ? 'deepwiki.com' : 'github.com';
  const tooltip = isOnGitHub ? 'Open in DeepWiki' : 'Back to GitHub';
  const label = isOnGitHub ? 'DW' : 'GH';

  Object.assign(bubble.style, {
    all: 'unset',
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: isOnGitHub ? '#6366f1' : '#059669',
    color: '#fff',
    cursor: 'pointer',
    zIndex: '2147483647',
    boxShadow: '0 2px 12px rgba(0,0,0,.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '14px',
    fontWeight: '700',
    transition: 'transform .15s, box-shadow .15s',
    userSelect: 'none',
  });
  bubble.title = tooltip;
  bubble.textContent = label;

  bubble.addEventListener('mouseenter', () => {
    bubble.style.transform = 'scale(1.12)';
    bubble.style.boxShadow = '0 4px 20px rgba(0,0,0,.35)';
  });
  bubble.addEventListener('mouseleave', () => {
    bubble.style.transform = 'scale(1)';
    bubble.style.boxShadow = '0 2px 12px rgba(0,0,0,.25)';
  });

  bubble.addEventListener('click', () => {
    window.location.href = `https://${targetHost}/${owner}/${repo}`;
  });

  document.body.appendChild(bubble);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBubble);
} else {
  initBubble();
}
