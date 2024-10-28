const IP_RANGES = [
  { start: "24.0.0.0", end: "24.255.255.255" },
  { start: "66.0.0.0", end: "66.255.255.255" },
  { start: "98.0.0.0", end: "98.255.255.255" },
  { start: "108.0.0.0", end: "108.255.255.255" },
  { start: "172.0.0.0", end: "172.255.255.255" },
];

function ipToLong(ip) {
  return (
    ip.split(".").reduce((int, oct) => (int << 8) + parseInt(oct, 10), 0) >>> 0
  );
}

function longToIp(long) {
  return [
    (long >>> 24) & 0xff,
    (long >>> 16) & 0xff,
    (long >>> 8) & 0xff,
    long & 0xff,
  ].join(".");
}

function generateRandomIP() {
  const range = IP_RANGES[Math.floor(Math.random() * IP_RANGES.length)];
  const startLong = ipToLong(range.start);
  const endLong = ipToLong(range.end);
  const randomLong = Math.floor(
    Math.random() * (endLong - startLong) + startLong,
  );
  return longToIp(randomLong);
}

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
];

const getRandomUserAgent = () => {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

function getHeaders() {
  return {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    Connection: "keep-alive",
    "User-Agent": getRandomUserAgent(),
    "X-Forwarded-For": generateRandomIP(),
    "Client-IP": generateRandomIP(),
  };
}

export default getHeaders;
