function extractLikes(likeText) {
    if (!likeText) return null;
    const likeNumber = likeText.replace(/\s/g, '').match(/\d+/);
    return likeNumber ? parseInt(likeNumber[0], 10) : null;
}

module.exports = extractLikes;
