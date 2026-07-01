async function setBadge(tabId, text, color) {
  await chrome.action.setBadgeText({ tabId, text });
  if (text) {
    await chrome.action.setBadgeBackgroundColor({ tabId, color });
  }
}

async function updateBadge(tabId, url) {
  if (!url) return setBadge(tabId, '');

  const m = url.match(/^https?:\/\/(github|deepwiki)\.com\/([^/]+)\/([^/]+)/);
  if (!m) return setBadge(tabId, '');

  if (m[1] === 'github') {
    await setBadge(tabId, 'DW', '#6366f1');
  } else {
    await setBadge(tabId, 'GH', '#059669');
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    updateBadge(tabId, tab.url);
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  updateBadge(tab.id, tab.url);
});

chrome.action.onClicked.addListener(async (tab) => {
  const url = tab.url;
  if (!url) return;

  const githubMatch = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)/);
  if (githubMatch) {
    await chrome.tabs.update(tab.id, {
      url: `https://deepwiki.com/${githubMatch[1]}/${githubMatch[2]}`
    });
    return;
  }

  const deepwikiMatch = url.match(/^https?:\/\/deepwiki\.com\/([^/]+)\/([^/]+)/);
  if (deepwikiMatch) {
    await chrome.tabs.update(tab.id, {
      url: `https://github.com/${deepwikiMatch[1]}/${deepwikiMatch[2]}`
    });
  }
});
