# Hide Facebook Reels

I built this because I got tired of seeing the Reels section cluttering up my news feed every time I scrolled. It’s a very simple script that keeps the feed looking a bit cleaner.

### How it works
The extension stays hidden in the background while you browse. It looks for the "Reels" header on the page and tells the browser not to display that specific section. It also keeps an eye on the page as you scroll down, so if new Reels appear, it hides them instantly.

### How to install it
1. **Download the code:** Go to the **Releases** section on the right and download the latest zip file.
2. **Unzip it:** Extract the folder to somewhere safe on your computer.
3. **Open Extensions:** In your browser (Brave, Chrome, or Edge), go to `chrome://extensions`.
4. **Developer Mode:** Make sure the **Developer mode** toggle in the top-right corner is turned on.
5. **Load it up:** Click **Load unpacked** and select the folder you just unzipped.

### Privacy
This doesn't collect any data or send anything to a server. It’s just a local script that changes how the page looks on your screen.

### Note
Since Facebook updates their site layout pretty often, this might stop working if they change the names of their code containers. If that happens, the script just needs a quick update to look for the new names.
### How to fix it if it stops working
Facebook changes its internal code names frequently. If Reels suddenly start appearing again, it means the "container name" in the code has changed. Here is how to find the new one:

1. **Find the name:** Go to Facebook, right-click on the word "Reels" in your feed, and select **Inspect**.
2. **Locate the box:** In the side window that opens, hover over the lines of code until the entire Reels section on the page turns blue. 
3. **Copy the class:** Look for a part that says `class="something"`. The "something" (like `x1lliihq`) is the new name.
4. **Update the script:** Open `content.js`, find the line with `.closest('.x1lliihq')`, and swap out the old name for the new one. Keep the dot at the beginning!
5. **Reload:** Save the file and click the "Refresh" icon on the extension in your browser.

If you aren't sure which name to pick, you can always reach out or open an "Issue" on this repo, and I'll help find the update.
# remove-reels
A simple chrome/brave extension to remove reels from your Facebook news feed.
