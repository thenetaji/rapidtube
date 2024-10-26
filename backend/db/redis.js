import redis from "redis";
import dotenv from "dotenv/config";

const REDIS_URI = process.env.REDIS_URI;

async function saveCache(videoId, meta) {
  return new Promise(async (resolve, reject) => {
    const client = redis
      .createClient({
        url: REDIS_URI,
      })
      .on("error", err => {
        console.log(err);
        reject("Error from DB", err);
        new Error("Can't connect to database");
      });

    try {
      await client.connect();
      await client.set(videoId, JSON.stringify(meta));

      resolve(`Data cached for videoId: ${videoId}`);
    } catch (err) {
      reject(err);
    } finally {
      client.quit();
    }
  });
}

async function getCache(videoId, meta) {
  return new Promise(async (resolve, reject) => {
    const client = redis
      .createClient({
        url: REDIS_URI,
      })
      .on("error", err => {
        console.log(err);
        reject(err);
        new Error("Can't connect to database");
      });

    try {
      await client.connect();
      const data = await client.get(videoId);

      resolve(JSON.parse(data));
    } catch (err) {
      reject(err);
    } finally {
      client.quit();
    }
  });
}

export { saveCache, getCache };
