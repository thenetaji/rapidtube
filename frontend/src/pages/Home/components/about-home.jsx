import crossPlatform from "/images/cross-platform.png";
import fast from "/images/fast.png";
import multiFormat from "/images/multi-format.png";
import highSpeed from "/images/high-speed.png";
import noAd from "/images/no-ad.png";
import unlimitedDownloads from "/images/unlimited-downloads.png";

function AboutHome() {
  return (
    <div className="bg-gray-100 text-gray-900">
      <div className="container mx-auto px-4 py-8">

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose RapidTube?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li className="flex items-center space-x-4">
              <img src={crossPlatform} alt="Multi-Platform Support" className="h-16 w-16 rounded-full" />
              <div>
                <strong>Multi-Platform Support</strong>: Download from YouTube, Facebook, Instagram, TikTok, and Twitter.
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <img src={fast} alt="Simple and Fast" className="h-16 w-16 rounded-full" />
              <div>
                <strong>Simple and Fast</strong>: Easy steps to download your favorite content.
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <img src={unlimitedDownloads} alt="Unlimited Downloads" className="h-16 w-16 rounded-full" />
              <div>
                <strong>Unlimited Downloads</strong>: No restrictions on the number of downloads.
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <img src={highSpeed} alt="High-Speed Conversions" className="h-16 w-16 rounded-full" />
              <div>
                <strong>High-Speed Conversions</strong>: Fast download speeds up to 1GB/s.
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <img src={multiFormat} alt="Wide Range of Formats" className="h-16 w-16 rounded-full" />
              <div>
                <strong>Wide Range of Formats</strong>: Supports MP4, WebM, m4a, 3gp, and more.
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <img src={noAd} alt="Free and Ad-Free" className="h-16 w-16 rounded-full" />
              <div>
                <strong>Free and Ad-Free</strong>: Enjoy a smooth user experience without ads.
              </div>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Use RapidTube:</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li className="flex items-center space-x-4">
              <div>
                <strong>Paste the Link</strong>: Enter the URL in the search box.
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div>
                <strong>Select Format</strong>: Choose your desired format (MP4, MP3, etc.).
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div>
                <strong>Get Link</strong>: Click the "Get Link" button.
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div>
                <strong>Download</strong>: Click "Download" to save the file to your device.
              </div>
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li className="flex items-center space-x-4">
              <div>
                <strong>What is RapidTube?</strong> A free tool to download videos and music from various social media platforms.
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div>
                <strong>Is there a limit on downloads?</strong> No, enjoy unlimited downloads for free.
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div>
                <strong>Which devices are supported?</strong> Works on PCs, smartphones, and tablets without additional software.
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div>
                <strong>Where are the downloaded files stored?</strong> In your device's "Downloads" folder or browser's download history.
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Why RapidTube Stands Out:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li className="flex items-center space-x-4">
              <div>
                <strong>High-Quality Downloads</strong>: Videos up to 8K and high-bitrate MP3 audio.
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div>
                <strong>User-Friendly Interface</strong>: Simple navigation and quick downloads.
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div>
                <strong>Constantly Updated</strong>: Regular updates for new features and improved performance.
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default AboutHome;