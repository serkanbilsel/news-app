// src/components/NewsCard.tsx

import React from "react";

import "../styles/NewsCard.css";

interface NewsCardProps {
  article: {
    id: string | null;
    title: string;
    description: string;
    publishedAt?: string;
    urlToImage?: string;
    url: string;
  };
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const publishHour = new Date(article.publishedAt ?? "").getHours(); // `publishedAt` varsa al, yoksa boş string

  return (
    <div className="news-card">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news-image"
        />
      )}
      <h2>{article.title}</h2>
      <p>{article.description}</p>

      <div className="publish-hour">
        <span>Published at: {publishHour}:00</span>
      </div>
    </div>
  );
};

export default NewsCard;
