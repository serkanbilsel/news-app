// src/pages/ArticleDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchArticleDetail,
  fetchSimilarArticles,
} from "../services/fetchNews";
import "../styles/ArticleDetail.css";

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Parametre olarak 'id' alıyoruz
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [similarArticles, setSimilarArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchArticleDetail(id!); // 'id' ile detayları alıyoruz

        if (!data) {
          throw new Error("Article not found");
        }

        setArticle(data);
        setLoading(false);

        // Benzer haberleri alalım
        const similarData = await fetchSimilarArticles(data.section);
        setSimilarArticles(similarData.slice(0, 5)); // İlk 5 benzer haberi alıyoruz
      } catch (err: any) {
        console.error("Error fetching article details:", err);
        setError("Failed to fetch article details.");
        setLoading(false);

        // Hata durumunda 3 saniye sonra anasayfaya yönlendir
        setTimeout(() => {
          navigate("/"); // Anasayfaya yönlendirme
        }, 3000);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id, navigate]);

  if (loading) return <div>Loading article details...</div>;
  if (error) return <div className="error-message">{error} Redirecting...</div>;

  return (
    <div className="article-detail">
      <div className="article-header">
        {article?.urlToImage && (
          <div className="article-image-container">
            <img
              src={article?.urlToImage}
              alt={article?.title}
              className="article-image"
            />
            <div className="article-text">
              <h1>{article?.title}</h1>
              <p>{article?.description}</p>
            </div>
          </div>
        )}
      </div>

      <div className="article-content">
        {article?.content ? (
          <p>{article?.content}</p>
        ) : (
          <p>Full article content is not available.</p>
        )}
      </div>

      {/* Sosyal Medya Paylaşım Butonları */}
      <div className="social-share">
        <p>Share:</p>
        <div className="social-buttons">{/* Sosyal medya ikonları */}</div>
      </div>

      {/* Benzer Haberler */}
      <section className="similar-articles">
        <h3>Similar Articles</h3>
        <div className="similar-articles-list">
          {similarArticles.map((similarArticle, index) => (
            <div key={index} className="similar-article-card">
              <img
                src={similarArticle.urlToImage}
                alt={similarArticle.title}
                className="similar-article-image"
              />
              <h4>{similarArticle.title}</h4>
              <p>{similarArticle.description}</p>
              <a
                href={`/article/${encodeURIComponent(similarArticle.id)}`}
                className="read-more"
              >
                cle.Read More
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticleDetail;
