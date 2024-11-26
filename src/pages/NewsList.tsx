import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "../services/fetchNews";
import { NewsArticle } from "../types/NewsArticle";
import NewsCard from "../components/NewsCard";
import "../styles/NewsList.css";

interface NewsListProps {
  selectedCategory: string;
}





const NewsList: React.FC<NewsListProps> = ({ selectedCategory }) => {
  const { data, error, isLoading } = useQuery<NewsArticle[], Error>({
    queryKey: ["news", selectedCategory],
    queryFn: () => fetchNews(selectedCategory),
    enabled: !!selectedCategory,
  });

  // Slider durumlarını kategori bazlı yönetmek için bir state
  const [currentSlides, setCurrentSlides] = useState<{
    [category: string]: number;
  }>({});

  // Belirli bir kategori için mevcut slide'ı alır
  const getCurrentSlide = (category: string) => currentSlides[category] || 0;

  // Belirli bir kategori için slide'ı günceller
  const setSlide = (category: string, slide: number) => {
    setCurrentSlides((prev) => ({ ...prev, [category]: slide }));
  };

  // Kaydırma başlangıç noktası
  const [touchStart, setTouchStart] = useState<number>(0);

  // Kaydırma başlangıç noktası (hem mouse hem de touch için)
  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    const startPosition = "touches" in e ? e.touches[0].clientX : e.clientX;
    setTouchStart(startPosition);
  };

  // Kaydırma bitiş noktası (hem mouse hem de touch için)
  const handleEnd = (e: React.TouchEvent | React.MouseEvent) => {
    const endPosition =
      "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;

    // Kaydırma yönünü belirle
    if (touchStart - endPosition > 100) {
      nextSlide(); // Sağdan sola kaydırıldığında bir sonraki slayta geç
    }
    if (endPosition - touchStart > 100) {
      prevSlide(); // Soldan sağa kaydırıldığında önceki slayta dön
    }
  };

  // Slide functions
  const prevSlide = () => {
    const current = getCurrentSlide(selectedCategory);
    setSlide(
      selectedCategory,
      current === 0 ? lastNews.length - 1 : current - 1
    );
  };

  const nextSlide = () => {
    const current = getCurrentSlide(selectedCategory);
    setSlide(
      selectedCategory,
      current === lastNews.length - 1 ? 0 : current + 1
    );
  };

  // Loading & Error States
  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="pulse"></div>
        <p className="loading-message">Loading news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-overlay">
        <p className="error-message">Error: {error.message}</p>
      </div>
    );
  }

  // Clean up text (remove [Removed] text)
  const cleanText = (text: string | undefined) => {
    return text ? text.replace(/\[Removed\]/g, "").trim() : "";
  };

  // Format and clean articles
  const dataWithIds = data?.map((article) => ({
    ...article,
    id: article.id ?? article.url.split("/").pop() ?? null,
    title: cleanText(article.title),
    description: cleanText(article.description),
    content: cleanText(article.content),
    publishedAt: article.publishedAt || "No Date", // Eğer 'publishedAt' yoksa 'No Date' olarak ayarla
  }));

  const lastNews = dataWithIds?.slice(0, 10) || []; // İlk 10 haber
  const trendingNews = dataWithIds?.slice(4, 10) || []; // Trending news
  const categoryNews = dataWithIds?.slice(20, 40) || []; // Rest for categorized news

  return (
    <div className="news-list-container">
      <h4 className="breaking-news-title">Breaking News</h4>
      <section className="breaking-news-section">
        <div className="breaking-news-slider-container">
          <div className="breaking-news-slider">
            {lastNews?.map((article) => (
              <div
                key={article.id}
                className="breaking-news-item"
                style={{
                  transform: `translateX(-${
                    getCurrentSlide(selectedCategory) * 100
                  }%)`,
                  transition: "transform 0.5s ease-in-out",
                }}
                onTouchStart={handleStart} // Touch event
                onTouchEnd={handleEnd} // Touch event
                onMouseDown={handleStart} // Mouse event
                onMouseUp={handleEnd} // Mouse event
              >
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="breaking-news-image"
                  onClick={() => window.open(`${article.id}`, "_blank")}
                />

                <div className="breaking-news-content">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="slider-indicators">
            {lastNews.map((_, index) => (
              <button
                key={index}
                className={`indicator-button ${
                  getCurrentSlide(selectedCategory) === index ? "active" : ""
                }`}
                onClick={() => setSlide(selectedCategory, index)} // Buradaki onClick handler'ını ekledik
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        {/* articles props olarak lastNews veriyoruz */}
        {/* Trending News Section */}
        <div className="featured-grid">
          {trendingNews?.map((article, index) => (
            <div
              key={article.id}
              className={`featured-news-card ${
                index % 2 === 0 ? "large-card" : "small-card"
              }`}
              onClick={() => window.open(`${article.id}`, "_blank")}
            >
              <img
                src={article.urlToImage}
                alt={article.title}
                onClick={() => setSlide(selectedCategory, index)}
              />
              <div className="featured-news-content">
                <h3>{article.title}</h3>
                {/* <p>{article.description}</p> */}
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="mobile-trending-news">
        <h4 className="mobile-trending-title">Trending News</h4>
        <div className="featured-grid">
          {trendingNews?.map((article) => (
            <div
              key={article.id}
              className="featured-news-card"
              onClick={() => window.open(`${article.id}`, "_blank")}
            >
              <img src={article.urlToImage} alt={article.title} />
              <div className="featured-news-content">
                <h3>{article.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categorized News Section */}
      {/* Categorized News Section */}
      <section className="categorized-news-section">
        <h1 className="breaking-news-title">All News</h1>
        <div className="category-news-grid">
          {categoryNews?.slice(0, 9).map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsList;
