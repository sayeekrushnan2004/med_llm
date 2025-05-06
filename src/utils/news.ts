import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export async function scrapeMedicalNews() {
  const response = await fetch('https://www.medicalnewstoday.com/');
  const html = await response.text();
  const $ = cheerio.load(html);
  const articles = [];
  // Try a more robust selector for all news cards (2025)
  $('a.card, a[data-qa="latest-news-card"]').each((i, el) => {
    const title = $(el).find('h3, h2').first().text().trim();
    let url = $(el).attr('href');
    if (url && !url.startsWith('http')) url = 'https://www.medicalnewstoday.com' + url;
    let summary = $(el).find('p').text().trim();
    if (!summary) summary = $(el).attr('aria-label') || '';
    let image = $(el).find('img').attr('src');
    if (!image) image = $(el).find('img').attr('data-src');
    if (title && url) {
      articles.push({ title, url, summary, image });
    }
  });
  return articles;
}
