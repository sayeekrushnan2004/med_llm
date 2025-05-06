const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 5000;

async function scrapeMedicalNews() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.medicalnewstoday.com/', { waitUntil: 'networkidle2' });
  
    // Find the section with "Latest News" heading
    const articles = await page.evaluate(() => {
      // Find the section containing "Latest News"
      const section = Array.from(document.querySelectorAll('section, div')).find(
        el => el.innerText && el.innerText.includes('Latest news')
      );
      if (!section) return [];
      // Get all article links in this section
      const links = Array.from(section.querySelectorAll('a[href^="/articles/"]'));
      const news = [];
      for (let link of links) {
        const title = link.innerText.trim();
        const url = link.href;
        if (title.length > 30 && url && !news.some(a => a.url === url)) {
          news.push({ title, url });
        }
        if (news.length >= 12) break;
      }
      return news;
    });
  
    await browser.close();
    return articles;
  }

app.use(cors());

app.get('/api/news', async (req, res) => {
  try {
    const articles = await scrapeMedicalNews();
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news.' });
  }
});

app.listen(PORT, () => {
  console.log(`News scraper server running on http://localhost:${PORT}`);
});
