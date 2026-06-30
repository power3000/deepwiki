async function updateBadge() {
  const rulesets = await chrome.declarativeNetRequest.getEnabledRulesets();
  const enabled = rulesets.includes('ruleset_1');
  if (enabled) {
    await chrome.action.setBadgeText({ text: '' });
  } else {
    await chrome.action.setBadgeText({ text: '✕' });
    await chrome.action.setBadgeBackgroundColor({ color: '#666' });
  }
}

chrome.action.onClicked.addListener(async () => {
  const rulesets = await chrome.declarativeNetRequest.getEnabledRulesets();
  const enabled = rulesets.includes('ruleset_1');
  if (enabled) {
    await chrome.declarativeNetRequest.updateEnabledRulesets({
      disableRulesetIds: ['ruleset_1']
    });
  } else {
    await chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: ['ruleset_1']
    });
  }
  updateBadge();
});

chrome.runtime.onInstalled.addListener(() => { updateBadge(); });
updateBadge();
