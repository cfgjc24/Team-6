import React from 'react';
import './AdditionalResources.css';

const AdditionalResources = () => {
  return (
    <div className="additional-resources">
      <div className="ed-link-section">
        <h2>Additional Educational Resources</h2>
        <a href="https://edstem.org/" className="ed-link" target="_blank" rel="noopener noreferrer">
          Ed Discussion
        </a>
      </div>

      <div className="helpful-resources">
        <h2>Educational Videos</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <iframe
              width="300"
              height="200"
              src="https://www.youtube.com/embed/F3QpgXBtDeo"
              title="Video Title 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3>Stock Exchange Overview</h3>
            <p>Why are there stocks at all?

              Everyday in the news we hear about the stock exchange, stocks and money moving around the globe. Still, a lot of people don't have an idea why we have stock markets at all, because the topic is usually very dry. We made a short video about the basics of the stock exchanges. With robots. Robots are kewl!</p>
          </div>

          <div className="resource-card">
            <iframe
              width="300"
              height="200"
              src="https://www.youtube.com/embed/rwbho0CgEAE"
              title="Video Title 2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3>The Beginner's Guide to Excel</h3>
            <p>
              Learn the basics of using Microsoft Excel, including the anatomy of a spreadsheet, how to enter data, how to make your data look good so it's easier to read and use, and more. This tutorial was made using Excel 2016, but is applicable to older versions of Excel and newer versions too.</p>
          </div>

          <div className="resource-card">
            <iframe
              width="300"
              height="200"
              src="https://www.youtube.com/embed/p7HKvqRI_Bo"
              title="Video Title 3"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3>How Does The Stock Market Work?</h3>
            <p>In the 1600s, the Dutch East India Company employed hundreds of ships to trade goods around the globe. In order to fund their voyages, the company turned to private citizens to invest money to support trips in exchange for a share of the profits. In doing so, they unknowingly invented the world’s first stock market. So how do companies and investors use the market today? Oliver Elfenbaum explains.</p>
          </div>
        </div>
      </div>

      <div className="articles-section">
        <h2>Articles & Blogs</h2>
        <div className="articles-grid">
          <div className="article-card">
            <h3>What is a Stock?</h3>
            <p>This article breaks down what a stock is, how it works, and why investors buy them. It also explains the types of stock available, how they are traded, and the risks and rewards associated with investing in stocks.</p>
            <a href="https://www.investopedia.com/terms/s/stock.asp" target="_blank" rel="noopener noreferrer">Read more</a>
          </div>

          <div className="article-card">
            <h3>Guide to Budgeting</h3>
            <p>This beginner’s guide to budgeting explains how to create and stick to a budget. It walks readers through the budgeting process, from tracking income and expenses to setting goals and making adjustments.</p>
            <a href="https://www.thebalance.com/how-to-make-a-budget-1289587" target="_blank" rel="noopener noreferrer">Read more</a>
          </div>

          <div className="article-card">
            <h3>How to Start Investing</h3>
            <p>This article offers a step-by-step guide on how beginners can start investing. It covers important concepts such as choosing the right investment accounts, building a diversified portfolio, and understanding the risks involved.</p>
            <a href="https://www.nerdwallet.com/article/investing/how-to-start-investing" target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        </div>
      </div>

      <div className="news-section">
        <h2>Business News Websites</h2>
        <ul className="news-links">
          <li>
            <a href="https://www.bloomberg.com" target="_blank" rel="noopener noreferrer">Bloomberg</a> - Global business and financial news.
          </li>
          <li>
            <a href="https://www.wsj.com" target="_blank" rel="noopener noreferrer">The Wall Street Journal</a> - Latest market news and analysis.
          </li>
          <li>
            <a href="https://www.reuters.com" target="_blank" rel="noopener noreferrer">Reuters</a> - Business, financial, and economic news.
          </li>
          <li>
            <a href="https://www.cnbc.com" target="_blank" rel="noopener noreferrer">CNBC</a> - Market news, stock analysis, and financial data.
          </li>
          <li>
            <a href="https://www.ft.com" target="_blank" rel="noopener noreferrer">Financial Times</a> - Global business and financial insights.
          </li>
        </ul>
      </div>

    </div>
  );
};

export default AdditionalResources;
