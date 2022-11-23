import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { FaSearch } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import axios from "axios";
import Slider from "../components/Slider";

const Search = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchTerm !== "") {
          const result = await axios.get(
            `https://api.themoviedb.org/3/search/multi?api_key=442f235faea30815c8eaf4f4970ce2aa&language=en-US&query=${searchTerm}&page=1&include_adult=false`
          );
          const res = result.data.results.filter(
            (i) => i.poster_path !== undefined
          );
          setData(res);
          console.log(data);
        } else {
          setData([]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [searchTerm]);

  return (
    <div>
      <Container>
        <Navbar isScrolled={isScrolled} />
        <div className="searchBar">
          <FaSearch className="searchIcon" />
          <input
            type="text"
            placeholder="Search Movies ...."
            className="searchInput"
            value={searchTerm}
            onChange={handleChange}
          />
          <VscChromeClose
            className="close"
            onClick={() => {
              setSearchTerm("");
            }}
          />
        </div>
        <div className="data">
          {data.length ? (
            <Slider movies={data} />
          ) : (
            <h1 className="empty"> Find your movie</h1>
          )}
        </div>
      </Container>
    </div>
  );
};

const Container = styled.div`
  .searchBar {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 10rem;
  }
  .searchIcon {
    font-size: 1.5rem;
    margin-top: 0.5rem;
  }
  .searchInput {
    width: 60rem;
    margin-left: 2rem;
    padding: 1rem;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    width: 40%;
  }
  .searchInput::placeholder {
    color: white;
  }
  input:focus {
    outline: none;
  }
  .close {
    font-size: 1.5rem;
    margin-left: -3rem;
    cursor: pointer;
  }
  .empty {
    text-align: center;
    color: white;
    margin-top: 4rem;
  }
`;

export default Search;
