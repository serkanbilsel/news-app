import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CategorySelector.css";

interface CategorySelectorProps {
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelect }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const [activeCategory, setActiveCategory] = useState<string>(""); // Aktif kategori durumu
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories.");
        }

        const categoriesList = [
          "world",
          "technology",
          "sports",
          "health",
          "science",
        ];
        const otherCategories = [
          "arts",
          "business",
          "books",
          "food",
          "magazine",
          "opinion",
          "realestate",
          "us",
          "travel",
        ];

        setCategories(categoriesList);
        setAllCategories(otherCategories);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch categories.");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category); // Kategori seçildiğinde aktif kategori durumu güncellenir
    onSelect(category);
    navigate("/");
  };

  return (
    <div className={`app-container ${loading ? "loading-active" : ""}`}>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}
      {!loading && error && <div className="error">{error}</div>}
      <nav className="category-navbar">
        <button
          className="home-button"
          onClick={() => handleCategorySelect("home")}
        >
          Home
        </button>

        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <button
              onClick={() => handleCategorySelect(category)}
              className={category === activeCategory ? "active" : ""} // Aktif kategoriye 'active' sınıfı eklenir
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          </div>
        ))}

        <div className="dropdown">
          <button className="dropdown-button">More</button>
          <div className="dropdown-content">
            {allCategories.map((category, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleCategorySelect(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CategorySelector;
