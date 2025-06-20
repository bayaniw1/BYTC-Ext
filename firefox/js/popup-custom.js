import { runtime, sendMessage, browser } from './ext.js';

document.addEventListener('DOMContentLoaded', async () => {
    const ublockButton = document.getElementById('open-ublock-settings');
    if (ublockButton) {
        ublockButton.addEventListener('click', () => {
            browser.tabs.create({ url: runtime.getURL('dashboard.html') });
        });
    }

    const diagButton = document.getElementById('open-diagnostic');
    if (diagButton) {
        diagButton.addEventListener('click', () => {
            browser.tabs.create({ url: runtime.getURL('background.html') });
        });
    }

    const sponsorStatus = document.getElementById('sponsorblock-status');
    if (sponsorStatus) {
        try {
            const status = await sendMessage({ what: 'getSponsorBlockStatus' });
            sponsorStatus.textContent = status === 'active' ? 'Active' : 'Error';
        } catch (ex) {
            sponsorStatus.textContent = 'Error';
        }
    }
});
