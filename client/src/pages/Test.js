import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { genre } from "../utils/genres";
import { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import { countries } from "../utils/countries";
import { languages } from "../utils/languages";
import { directors } from "../utils/directors";
import { actors as actorData } from "../utils/actors";
import { warnings } from "../utils/warnings";
import { features } from "../utils/features";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Test = () => {
  const [genreActive, setGenreActive] = useState(
    new Array(genre.length).fill(false)
  );
  const [genres, setGenres] = useState([]);

  const [date, setDate] = useState([1960, 2010]);
  const [duration, setDuration] = useState([60, 170]);

  const [metascore, setMetascore] = useState(70);
  const [imdbscore, setImdbScore] = useState(7);

  const [popularity, setPopularity] = useState("");
  const [popularityActive, setPopularityActive] = useState(-1);

  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");

  const [type, setType] = useState("");
  const [typeActive, setTypeActive] = useState(-1);

  const [director, setDirector] = useState(directors[0]);
  const [actors, setActors] = useState([]);

  const [featureState, setFeatureState] = useState([]);
  const [activeFeatures, setActiveFeatures] = useState(
    new Array(features.length).fill(false)
  );

  const [warningState, setWarningState] = useState([]);
  const [activeWarnings, setActiveWarnings] = useState(
    new Array(warnings.length).fill(false)
  );
  const [passData, setPassData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [missingRequired, setMissingRequired] = useState(false);

  const genreFunc = (position) => {
    const updatedState = genreActive.map((item, index) => {
      return index === position ? !item : item;
    });

    const genreArray = [];
    genre.forEach((item, index) => {
      if (updatedState[index]) {
        genreArray.push(item);
      }
    });
    setGenres(genreArray);
    setGenreActive(updatedState);
  };

  const FeaturesFunc = (position) => {
    const updatedState = activeFeatures.map((feature, index) => {
      return index === position ? !feature : feature;
    });
    const featureArray = [];
    features.forEach((item, index) => {
      if (updatedState[index]) {
        featureArray.push(item);
      }
      setFeatureState(featureArray);
      setActiveFeatures(updatedState);
    });
  };

  const WarningsFunc = (position) => {
    const updatedState = activeWarnings.map((warning, index) => {
      return index === position ? !warning : warning;
    });
    const warningArray = [];
    warnings.forEach((item, index) => {
      if (updatedState[index]) {
        warningArray.push(item);
      }
      setWarningState(warningArray);
      setActiveWarnings(updatedState);
    });
  };

  const handleDateChange = (event, newValue) => {
    setDate(newValue);
  };
  const handleDurationChange = (event, newValue) => {
    setDuration(newValue);
  };

  const handleImdbChange = (event, newValue) => {
    setImdbScore(newValue);
  };

  const handleMetaChange = (event, newValue) => {
    setMetascore(newValue);
  };

  const handlePopularity = (pop, value) => {
    setPopularity(pop);
    setPopularityActive(value);
  };

  const handleCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleLanguage = (event) => {
    setLanguage(event.target.value);
  };
  const handleType = (type, value) => {
    if (typeActive[value] === true) {
      setTypeActive(new Array(3).fill(false));
      setType("");
    } else {
      setType(type);
      setTypeActive(value);
    }
    console.log(type);
  };
  const DeleteActor = (actorToDelete) => {
    const newActors = actors.filter((actor) => {
      if (actor !== actorToDelete) {
        return actor;
      } else return null;
    });
    setActors(newActors);
  };

  const handleSave = () => {
    const pop = popularity === "";
    
    const lang = language === "";
    const gnr = genres === [];

    if (pop  || lang || gnr) {
      setMissingRequired(true);
    } else {
      setMissingRequired(false);
      setPassData({
        genres: genres,
        date: date,
        duration: duration,
        imdbscore: imdbscore,
        metascore: metascore,
        popularity: popularity,
        country: country,
        language: language,
        type: type,
        director: director,
        actors: actors,
        warningState: warningState,
        featureState: featureState,
      });
      setSubmitted(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //TO - DO
  // deal with checkboxes.
  return (
    <>
      <Navbar />
      <Wrapper>
        <h1>LETS FIND OUT YOUR PREFERENCES</h1>
        <TestContainer>
          <Picker>Genre</Picker>
          <h4>Which Genres Attract You The Most?</h4>
          <GenreButtons>
            {genre.map((genre, index) => {
              return (
                <button
                  key={index}
                  className={genreActive[index] ? "active" : "none"}
                  onClick={() => {
                    genreFunc(index);
                  }}
                >
                  {genre}
                </button>
              );
            })}
          </GenreButtons>
        </TestContainer>
        <TestContainer>
          <Picker>Date </Picker>
          <h4>Specify the minimum and maximum date you prefer.</h4>
          <Slider
            className="slider"
            min={1910}
            max={2023}
            value={date}
            onChange={handleDateChange}
            valueLabelDisplay="auto"
          />
          <button
            className="dmbtn"
            onClick={() => {
              setDate([1910, 2023]);
            }}
          >
            Doesn't Matter
          </button>
        </TestContainer>
        <TestContainer>
          <Picker>Duration </Picker>
          <h4>Specify the minimum and maximum duration you prefer.</h4>
          <Slider
            className="slider"
            min={20}
            max={300}
            value={duration}
            onChange={handleDurationChange}
            valueLabelDisplay="auto"
          />
          <button
            className="dmbtn"
            onClick={() => {
              setDuration([20, 300]);
            }}
          >
            Doesn't Matter
          </button>
        </TestContainer>
        <DoubleTestContainer>
          <div>
            <Picker>IMDB</Picker>
            <h4>Minimum Imdb score?</h4>
            <Slider
              min={0}
              max={10}
              value={imdbscore}
              valueLabelDisplay="auto"
              onChange={handleImdbChange}
            />
            <button
              className="dmbtn"
              onClick={() => {
                setImdbScore(0);
              }}
            >
              Doesn't Matter
            </button>
          </div>
          <div>
            <Picker>METASCORE</Picker>
            <h4>Minimum Metascore?</h4>
            <Slider
              min={0}
              max={100}
              value={metascore}
              valueLabelDisplay="auto"
              onChange={handleMetaChange}
            />
            <button
              className="dmbtn"
              onClick={() => {
                setMetascore(0);
              }}
            >
              Doesn't Matter
            </button>
          </div>
        </DoubleTestContainer>
        <TestContainer>
          <Picker>POPULARITY</Picker>
          <h4>How popular should be the movie?</h4>
          <PopularityButtons>
            <button
              className={popularityActive === 0 ? "active" : "none"}
              onClick={() => handlePopularity("Popular", 0)}
            >
              Popular
            </button>
            <button
              className={popularityActive === 1 ? "active" : "none"}
              onClick={() => handlePopularity("Less known", 1)}
            >
              Less Known
            </button>
            <button
              className={popularityActive === 2 ? "active" : "none"}
              onClick={() => handlePopularity("Hidden gem", 2)}
            >
              Hidden Gem
            </button>
            <button
              className={popularityActive === 3 ? "active" : "none"}
              onClick={() => handlePopularity("Cult classic", 3)}
            >
              Cult Classic
            </button>
          </PopularityButtons>
        </TestContainer>
        <TestContainer>
          <Picker>COUNTRY</Picker>
          <h4>Where Should Be The Movie From?</h4>
          <Box className="menuitem" sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                label="Country"
                onChange={handleCountry}
              >
                {countries.map((country, index) => {
                  return (
                    <MenuItem key={index} value={country}>
                      {country}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <button
            className="dmbtn"
            onClick={() => {
              setCountry("");
            }}
          >
            Doesn't Matter
          </button>
        </TestContainer>
        <TestContainer>
          <Picker>LANGUAGE</Picker>
          <h4>What should be the main language of the movie?</h4>
          <Box className="menuitem" sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={language}
                label="Country"
                onChange={handleLanguage}
              >
                {languages.map((language, index) => {
                  return (
                    <MenuItem key={index} value={language}>
                      {language}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </TestContainer>
        <TestContainer>
          <Picker>MOVIE TYPE</Picker>
          <h4>What kind of movies attract you the most?</h4>
          <TypeButtons>
            <button
              className={typeActive === 0 ? "active" : "none"}
              onClick={() => handleType("Animation", 0)}
            >
              Animation
            </button>
            <button
              className={typeActive === 1 ? "active" : "none"}
              onClick={() => handleType("Live-action", 1)}
            >
              Live-action
            </button>
            <button
              className={typeActive === 2 ? "active" : "none"}
              onClick={() => handleType("Musical", 2)}
            >
              Musical
            </button>
          </TypeButtons>
          <button
            className="dmbtn"
            onClick={() => {
              setType("");
              setTypeActive([false, false, false]);
            }}
          >
            Doesn't Matter
          </button>
        </TestContainer>
        <DoubleTestContainer>
          <div>
            <Picker>DIRECTOR</Picker>
            <h4>Who is your favorite director?</h4>
            <Autocomplete
              value={director}
              onChange={(event, newValue) => {
                setDirector(newValue);
              }}
              className="autocomplete"
              fullWidth
              id="autocomplete"
              options={directors}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  style={{ width: 100 + "%" }}
                  {...params}
                  label="Director"
                />
              )}
            />
            <button className="dmbtn" onClick={() => setDirector("")}>
              Doesn't Matter
            </button>
          </div>

          <div>
            <Picker>STARS</Picker>
            <h4>Favorite actresses and actors?</h4>
            <div className="actors-box">
              <div className="actors-child">
                <Autocomplete
                  onChange={(event, newValue) => {
                    setActors([...actors, newValue]);
                  }}
                  className="actorcomplete"
                  
                  id="autocomplete"
                  options={actorData}
                  renderInput={(params) => (
                    <TextField
                      
                      style={{ width: "300px" }}
                      {...params}
                      label="Actor/Actress"
                    />
                  )}
                />
              </div>
              <div className="actors-child">
                {actors.map((actor, index) => {
                  if (actor !== null) {
                    return (
                      <div key={index} className="individual">
                        <p>{actor}</p>{" "}
                        <button onClick={() => DeleteActor(actor)}>X</button>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
            <button className="dmbtn" onClick={() => setActors([])}>
              Doesn't Matter
            </button>
          </div>
        </DoubleTestContainer>
        <TestContainer>
          <Picker>WARNING TAGS</Picker>
          <h4>What you don't want to see in a movie</h4>
          <WarningButtons>
            {warnings.map((warning, index) => {
              return (
                <button
                  onClick={() => {
                    WarningsFunc(index);
                  }}
                  className={activeWarnings[index] ? "line-through" : "none"}
                  key={index}
                >
                  {warning}
                </button>
              );
            })}
          </WarningButtons>
          <button
            className="dmbtn"
            onClick={() => {
              setWarningState([]);
              setActiveWarnings(new Array(warnings.length).fill(false))
            }}
          >
            Doesn't Matter
          </button>
        </TestContainer>
        <TestContainer>
          <Picker>FEATURES</Picker>
          <h4>What features do you want to see in your preferred movie</h4>
          <FeatureButtons>
            {features.map((feature, index) => {
              return (
                <button
                  onClick={() => {
                    FeaturesFunc(index);
                  }}
                  className={activeFeatures[index] ? "active" : "none"}
                  key={index}
                >
                  {feature}
                </button>
              );
            })}
          </FeatureButtons>
          <button
            className="dmbtn"
            onClick={() => {
              setFeatureState([]);
              setActiveFeatures(new Array(features.length).fill(false));
            }}
          >
            Doesn't Matter
          </button>
        </TestContainer>
        <button className="submitbtn" onClick={handleSave}>
          SAVE PREFERENCES
        </button>
        <p className="missing">
          {missingRequired
            ? "Genre, Popularity and Language Fields are mandatory."
            : null}
        </p>
        <Link
          style={
            submitted
              ? null
              : { pointerEvents: "none", backgroundColor: "gray" }
          }
          state={passData}
          to="/results"
          className="submitbtn"
        >
          Find Me Movies
        </Link>
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;

  h1 {
    text-align: center;
    color: white;
  }

  .submitbtn {
    padding: 4px 52px;
    border-radius: 10px;
    background-color: #b70304;
    color: white;
    margin-left: 20%;
    font-size: 24px;
    cursor: pointer;
    margin-bottom: 1rem;
  }
  .missing {
    margin-left: 20%;
    color: white;
  }
  .dmbtn {
    padding: 3px 30px;
    font-size: 16px;
    margin-top: 1rem;
    border: none !important;
    border-radius: 0 !important;
  }
  .dmbtn:hover {
    background-color: #b70304;
    color: White;
  }
`;

const Picker = styled.h3`
  background-color: #b70304;
  text-align: left;
  display: inline;
  color: white;
  padding: 3px 45px;
`;

const TestContainer = styled.div`
  width: 60%;
  margin: 3rem auto;
  border-bottom: 1px solid white;

  h4 {
    background: rgba(255, 255, 255, 0.88);
    color: black;
    padding: 3px 30px;
    text-align: center;
    margin-top: 1rem;
    font-size: 20px;
  }
  p {
    color: white;
    display: inline;
  }
  button {
    background: rgba(255, 255, 255, 0.9);
    color: black;
    font-size: 20px;
    border-radius: 15px;
    padding: 5px;
    width: auto;
    cursor: pointer;
  }
  .menuitem {
    padding: 8px;
    background: rgba(255, 255, 255, 0.88);
    margin-bottom: 2.5rem;
  }
  button:hover {
    border: 1px solid red;
  }
  .active {
    background-color:  #ed8554;
    color: white;
  }
  .line-through {
    text-decoration: line-through;
  }
  .none {
    border: 2px solid transparent !important;
    text-decoration: none !important;
  }
  .slider {
    margin-top: 1rem;
  }
  @media (max-width: 992px) {
    width: 95%;
    padding: 0;
  }
`;

const TypeButtons = styled.div`
  margin-top: 2.5rem;

  display: flex;
  button {
    flex: 1;
  }
`;

const WarningButtons = styled.div`
  margin: 2.5rem auto;
  display: grid;
  row-gap: 0.5rem;
  column-gap: 0.5rem;
  grid-template-columns: repeat(2, 1fr);

  button:nth-child(5){
    width:100%;
    justify-self: end;
  }
`;

const FeatureButtons = styled.div`
  margin: 2.5rem auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 0.5rem;
  column-gap: 0.5rem;
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GenreButtons = styled.div`
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 0.5rem;
  column-gap: 0.5rem;
  margin-bottom: 2.5rem;
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const DoubleTestContainer = styled.div`
  display: flex;
  border-bottom: 1px solid white;
  margin: 1rem auto;
  width: 62%;

  .actors-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.88);
    padding: 0;
    margin: 0;
  }
  .actors-child {
    
    padding: 0;
    margin: 0;
    width:100%;
  }

  .autocomplete {
    background-color: rgba(255, 255, 255, 0.88);
    margin: 0;
    padding: 0;
    width:100%;
  }

  .actorcomplete{
    margin:0;
    padding:0;
    background-color: rgba(255, 255, 255, 0.88);
    width:100%;
  }

  div {
    width: 45%;
    margin: 1rem auto;
  }
  h4 {
    background: rgba(255, 255, 255, 0.88);
    color: black;
    padding: 3px 30px;
    text-align: center;
    margin-top: 1rem;
    font-size: 20px;
  }
  p {
    color: white;
    display: inline;
  }
  .individual {
    min-width:100px;
    border-radius: 12px;
    padding: 2px;
    background-color: gray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    
    z-index:2;
  }
  .individual p {
    margin: auto;
  }
  .individual button {
    margin-right: 3px;
    padding: 4px;
    background-color: #b70304;
    border: none;
    cursor: pointer;
    color: white;
  }
  @media (max-width: 992px) {
    flex-direction: column;
    width: 95%;
    justify-content: flex-start;
    div {
      width: 100%;
    }
    .actors-box {
      flex-direction: column;
    }
    .actorcomplete{
      width:100%;
    }
    
  }
`;

const PopularityButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
`;

export default Test;
