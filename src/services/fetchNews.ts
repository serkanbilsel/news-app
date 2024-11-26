import { NewsArticle } from "../types/NewsArticle";

/**
 * Haberleri saat bazında gruplandırma
 */
export const processArticlesByHour = (articles: NewsArticle[]) => {
  const hours = Array(24).fill(0); // 24 saatlik bir dizi oluşturuyoruz

  articles.forEach((article) => {
    const hour = new Date(article.published_date).getHours(); // NYT API tarih alanı için `published_date`
    hours[hour]++; // O saatte kaç haber olduğunu sayıyoruz
  });

  return hours.reduce((acc, val, index) => {
    acc[index] = val;
    return acc;
  }, {} as { [hour: string]: number });
};



export const fetchArticleDetail = async (id: string) => {
  const response = await fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=_id:"${id}"&api-key=${process.env.REACT_APP_NYT_API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch article detail: ${response.statusText}`);
  }

  const data = await response.json();
  return data.response.docs[0]; // NYT Article Search API'de haber detayları `docs` içinde gelir
};


/**
 * Benzer haberleri getirme
 */
// src/services/fetchNews.ts
export const fetchSimilarArticles = async (section: string) => {
  const response = await fetch(
    `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`
  );

  if (!response.ok) {
    console.error("Error fetching similar articles:", response.statusText);
    return [];
  }

  const data = await response.json();
  return data.results.slice(0, 5); // İlk 5 benzer haber
};


/**
 * Haberleri kategoriye göre getirme
 */
export const fetchNews = async (category: string): Promise<NewsArticle[]> => {
  const url = `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`;
  
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  const data = await response.json();

  // NYT'den dönen verileri eşleştiriyoruz
  const articles = data.results.map((article: any) => ({
    id: article.url, // ID olarak URL kullanılıyor
    title: article.title || "Untitled", // Başlık
    description: article.abstract || "No description available", // Açıklama
    publishedAt: article.published_date, // Yayınlanma tarihi
    url: article.url, // Haber URL'si
    urlToImage: article.multimedia?.[0]?.url || null, // Resim URL'si
    content: article.abstract || "", // İçerik
  }));

  return articles;
};

