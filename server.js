const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();

// video modules
const fetchVideoData = require('./my_modules/videoinfo/fetchVideoData');
const parseVideoData = require('./my_modules/videoinfo/parseVideoData');

//pripojenie k db
mongoose
   .connect(process.env.MONGO_URI)
   .then(() => console.log("MongoDB Connected"))
   .catch((err) => console.error("MongoDB Connection Error:", err));


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//získanie parametrov a overenie platnosti videa (na youtube) :
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
