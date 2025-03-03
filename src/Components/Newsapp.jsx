import React, { useState, useEffect } from "react";
import Card from "./Card";

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState([]);
  const API_KEY = "4517d62fd6be4395819636c728aa6d3d";

  // Function to fetch news data based on search query
  const getData = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
      );
      const jsonData = await response.json();
      setNewsData(jsonData.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  // Fetch news data when the component mounts
  useEffect(() => {
    getData();
  }, []);

  // Handle user input change
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  // Fetch news based on category selection
  const fetchCategoryNews = async (event) => {
    const category = event.target.value;
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${category}&apiKey=${API_KEY}`
      );
      const jsonData = await response.json();
      setNewsData(jsonData.articles || []);
    } catch (error) {
      console.error("Error fetching category news:", error);
    }
  };

  return (
    <div>
      <nav>
        <div>
          <h1>NewsWave</h1>
        </div>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search News"
            
            onChange={handleInput}
          />
          <button onClick={getData}>Search</button>
        </div>
      </nav>

      <div>
        <p className="Head">Update with Trendy News</p>
      </div>

      <div className="categoryBtn">
        <button onClick={fetchCategoryNews} value="sports">
          Sports
        </button>
        <button onClick={fetchCategoryNews} value="politics">
          Politics
        </button>
        <button onClick={fetchCategoryNews} value="health">
          Health
        </button>
        <button onClick={fetchCategoryNews} value="entertainment">
          Entertainment
        </button>
        <button onClick={fetchCategoryNews} value="fitness">
          Fitness
        </button>
      </div>

      <div>
        {newsData.length > 0 ? <Card data={newsData} /> : <p>No News Available</p>}
      </div>
    </div>
  );
};

export default Newsapp;
