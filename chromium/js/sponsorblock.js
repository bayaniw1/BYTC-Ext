'use strict';
(function(){
    const videoID = new URLSearchParams(location.search).get('v');
    if (!videoID) { return; }
    const video = document.querySelector('video');
    if (!video) { return; }
    fetch(`https://sponsor.ajay.app/api/skipSegments?videoID=${videoID}`)
        .then(r => r.json())
        .then(data => {
            if (!Array.isArray(data)) { return; }
            const segments = data.flatMap(s => s.segment);
            video.addEventListener('timeupdate', () => {
                const t = video.currentTime;
                for (const [start,end] of segments) {
                    if (t >= start && t < end) {
                        video.currentTime = end;
                        break;
                    }
                }
            });
        })
        .catch(err => { console.info('SponsorBlock', err); });
})();
