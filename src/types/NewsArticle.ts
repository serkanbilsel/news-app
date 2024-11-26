
export interface NewsArticle {
   id: string | null;
  title: string;
  description: string;
  content: string;
  publishedAt?: string; // optional
  published_date: string;
  url: string;
  urlToImage?: string;
  lastNews?: string;
  
}
