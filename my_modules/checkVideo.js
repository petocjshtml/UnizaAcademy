const https = require('https');

function checkVideo(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => (data += chunk));
            response.on('end', () => {
                const unavailable = /Video unavailable|Playback on other websites has been disabled/.test(data);
                const hasMeta = /<meta property="og:video:url"/.test(data);
                if (unavailable || !hasMeta) return resolve({ exists: false });

                const durationMatch = data.match(/"approxDurationMs":"(\d+)"/);
                const duration = durationMatch
                    ? `${Math.floor(durationMatch[1] / 3600000)}:${Math.floor((durationMatch[1] % 3600000) / 60000).toString().padStart(2, '0')}:${Math.floor((durationMatch[1] % 60000) / 1000).toString().padStart(2, '0')}`
                    : null;

                const likesMatch = data.match(/"accessibilityText":"([^"]+)"/);
                const likeText = likesMatch ? likesMatch[1] : null;
                const likeNumber = likeText.replace(/\s/g, '').match(/\d+/);
                const likeCount = likeNumber ? parseInt(likeNumber[0], 10) : null;

                resolve({
                    exists: true,
                    duration,
                    thumbnail: data.match(/<link itemprop="thumbnailUrl" href="(.*?)">/)?.[1] || null,
                    title: data.match(/<meta property="og:title" content="(.*?)"/)?.[1] || null,
                    views: parseInt(data.match(/"viewCount":"(\d+)"/)?.[1], 10) || null,
                    likes: likeCount,
                });
            });
        }).on('error', reject);
    });
}

module.exports = checkVideo;
