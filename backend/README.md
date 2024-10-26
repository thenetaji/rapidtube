## RapidTube Backend

This backend can download videos, audios, substitle, thumbnail from any popular social media platform.

## Technologies used

- Language Stack
  - Node.js
  - Express
  - Helmet
  - Express-rate-limit
  - Cors
  - dotenv
- Libraries for content fetching
  - Ytdl-core :- For functionality of YouTube
  - [Yt-search](https://www.npmjs.com/package/yt-search) :- For searching functionality

## Working mechanism for YouTube content fetching

- User Input
- Checking of Query or URL

## Structure :-

API Structure fro request:-
Every information to be provided to a specific route should be in the payload object

API Structure for response:-
status: "",
error: "",
message: "",
data: {}

first error handling then information and will always be present even though error is present

## API routes:-

"/api/v1/${platform_name}/${method}"

eg. "/api/v1/youtube/meta"
"/api/v1/youtube/download"

## Change Logs:

- V1 :- Did lot of work but on ytdl-core but it is not maintained and also don't work
- V2 :- Using YTDLP a actively maintained library
