const fs = require('fs');
const ytdl = require('ytdl-core');

const videoURL = 'https://youtu.be/aqz-KE-bpKQ?si=MKP97cMxqNzOULqI';

async function fetchAndSaveVideoInfo(url) {
    try {
        const info = await ytdl.getInfo(url);
        const basicInfo = await ytdl.getInfo(url);
        
        fs.writeFileSync('info.json', JSON.stringify(info, null, 2));
        fs.writeFileSync('basic-info.json', JSON.stringify(basicInfo, null, 2));

        console.log('Video info and basic info saved to info.json and basic-info.json respectively.');
    } catch (error) {
        console.error('Error fetching video info:', error);
    }
}

fetchAndSaveVideoInfo(videoURL);