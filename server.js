const express = require('express');

// videoinfo
const fetchVideoData = require('./my_modules/videoinfo/fetchVideoData');
const parseVideoData = require('./my_modules/videoinfo/parseVideoData');

const app = express();
const PORT = 3000;

//volanie - get požiadávka s url :
//http://localhost:3000/check-video?url=https://www.youtube.com/watch?v=z0-Lk4P-c3o
app.get('/check-video', async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        return res.status(400).json({ message: 'No video URL provided' });
    }
    try {
        const { data, statusCode } = await fetchVideoData(videoUrl);
        const videoInfo = parseVideoData(data);

        if (statusCode === 200 && videoInfo.hasVideoMetaTag && !videoInfo.videoUnavailable) {
            res.json({
                exists: true,
                duration: videoInfo.videoDurationFormatted,
                thumbnail: videoInfo.thumbnailUrl,
                title: videoInfo.videoTitle,
                views: videoInfo.viewCount,
                likes: videoInfo.likeCount
            });
        } else {
            res.json({ exists: false, message: 'Video is unavailable or restricted' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching video URL', error: error.toString() });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
