const formatDuration = require('./formatDuration');
const extractLikes = require('./extractLikes');

function parseVideoData(data) {
    const videoUnavailableText = ['Video unavailable', 'Playback on other websites has been disabled by the video owner'];
    const videoUnavailable = videoUnavailableText.some(text => data.includes(text));
    const hasVideoMetaTag = data.includes('<meta property="og:video:url"');
    
    const videoDurationMatch = data.match(/"approxDurationMs":"(\d+)"/);
    const videoDurationSeconds = videoDurationMatch ? parseInt(videoDurationMatch[1], 10) / 1000 : null;
    const videoDurationFormatted = videoDurationSeconds ? formatDuration(videoDurationSeconds) : null;
    
    const thumbnailMatch = data.match(/<link itemprop="thumbnailUrl" href="(.*?)">/);
    const thumbnailUrl = thumbnailMatch ? thumbnailMatch[1] : null;
    
    const titleMatch = data.match(/<meta property="og:title" content="(.*?)"/);
    const videoTitle = titleMatch ? titleMatch[1] : null;
    
    const viewsMatch = data.match(/"viewCount":"(\d+)"/);
    const viewCount = viewsMatch ? parseInt(viewsMatch[1], 10) : null;
    
    const likesMatch = data.match(/"accessibilityText":"([^"]+)"/);
    const likeText = likesMatch ? likesMatch[1] : null;
    const likeCount = extractLikes(likeText);

    return {
        videoUnavailable,
        hasVideoMetaTag,
        videoDurationFormatted,
        thumbnailUrl,
        videoTitle,
        viewCount,
        likeCount
    };
}

module.exports = parseVideoData;
