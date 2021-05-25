import React, { Component } from "react";
import cheerio from "cheerio";
import axios from "axios";
import "./App.css";

class Scraping extends Component {
  state = { data: [] };

  async componentDidMount() {
    let data = [];

    const htmlPandit = await axios.get("https://www.panditfootball.com/");
    const $pandit = await cheerio.load(htmlPandit.data);
    $pandit("article.news-block.small-block").each((i, element) => {
      data.push({
        title: $pandit(element).find("h3.news-title > a").text().trim(),
        image: $pandit(element).find("a.overlay-link > figure.image-overlay > img").attr("src"),
        date: $pandit(element).find("p.simple-share").text().trim(),
        source: "https://panditfootball.com",
        link: $pandit(element).find("h3.news-title > a").attr("href"),
      });
    });
    this.setState({ data });

  }

  render() {
    return (
      <div className="container">
        <ul>
          <h1>Webscrapping Berita Olahraga</h1>
          {this.state.data.map((data, i) => (
            <div key={i} className="card">
              <h2>
                <a className="title" href={data.link}>
                  {data.title}
                </a>
              </h2>
              <img src={data.image} alt="img" className="image" />
              <p>{data.date}</p>
              <a href={data.source} className="source">
                Source: {data.source.replace("https://", "")}
              </a>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default Scraping;
