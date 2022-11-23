import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import netflix from "../assets/netflix.jpeg";

const Details = () => {
  const movieData = useLocation().state.data;
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  console.log(movieData);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="detail">
        <h1>Movie Details :</h1>
        <div className="detail-info">
          <div className="text">
            <h2>Movie Name : {movieData.name}</h2>
            {movieData.genres && (
              <div className="genre">
                {movieData.genres.length > 0 ? <h3>Genre : </h3> : null}
                <ul>
                  {movieData.genres.length > 0
                    ? movieData.genres.map((genre) => {
                        console.log(genre);
                        return <li>{genre}</li>;
                      })
                    : null}
                </ul>
              </div>
            )}
            <h3>Movie Description</h3>
            {movieData.overview ? (
              <p>{movieData.overview}</p>
            ) : (
              <p>
                Magna eget est lorem ipsum dolor sit. Ipsum dolor sit amet
                consectetur adipiscing. Eros donec ac odio tempor orci dapibus
                ultrices in. Aliquam ut porttitor leo a diam. Morbi enim nunc
                faucibus a pellentesque sit amet. Tortor id aliquet lectus proin
                nibh nisl. Ac felis donec et odio pellentesque diam volutpat
                commodo. Ipsum nunc aliquet bibendum enim facilisis gravida
                neque convallis a. Odio euismod lacinia at quis. Odio euismod
                lacinia at quis risus sed.
              </p>
            )}
          </div>
          <div className="movieImg">
            {movieData.img || movieData.backdrop_path !== null ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${
                  movieData.image || movieData.backdrop_path
                }`}
                alt="background"
              />
            ) : (
              <img src={netflix} alt="background" />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .detail {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .text > h2 {
    margin-top: 20rem;
  }
  h1 {
    margin-left: 1rem;
    margin-top: 10rem;
  }
  h2 {
    margin-left: 2rem;
  }
  .detail > .detail-info > .movieImg > img {
    object-fit: contain;
    margin-left: 5rem;
    margin-top: 1rem;
    width: 80%;
    height: 80%;
  }
  .detail-info {
    display: flex;
    justify-content: space-around;
  }
  .text {
    margin-top: -15rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .genre {
    display: flex;
  }
  .genre > ul {
    margin-top: 5.15rem;
    display: flex;
    list-style: none;
    margin-left: 0.5rem;
  }
  .genre > ul > li {
    margin-left: 0.5rem;
  }
  p {
    width: 40rem;
    margin-left: 2rem;
  }
  h3 {
    margin-top: 5rem;
    margin-left: 2rem;
  }
`;
export default Details;
