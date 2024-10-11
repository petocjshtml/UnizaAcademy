const https = require('https');

function fetchVideoData(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                resolve({ data, statusCode: response.statusCode });
            });
        }).on('error', (e) => {
            reject(e);
        });
    });
}

module.exports = fetchVideoData;
