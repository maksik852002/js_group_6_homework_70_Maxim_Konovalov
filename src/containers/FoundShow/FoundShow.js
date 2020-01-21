import React, { Fragment, useReducer, useEffect } from "react";
import parse from "html-react-parser";
import axios from "../../axios-base";
import InputGroup from "../../components/InputGroup/InputGroup";
import SearchResult from "../../components/SearchResult/SearchResult";

const ADD_INPUT_VALUE = "ADD_INPUT_VALUE";
const IS_FINDED = "IS_FINDED";
const SET_SHOW = "SET_SHOW";
const SET_FOUND_SHOWS = "SET_FOUND_SHOWS";
const FOUND_SHOW_SELECTED = "FOUND_SHOW_SELECTED";

const initialState = {
  show: [],
  foundShows: [],
  inputValue: "",
  isFinded: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_INPUT_VALUE:
      return { ...state, inputValue: (state.inputValue = action.value) };
    case SET_SHOW:
      return { ...state, show: (state.show = action.data) };
    case SET_FOUND_SHOWS:
      return { ...state, foundShows: (state.foundShows = action.data) };
    case IS_FINDED:
      return { ...state, isFinded: true };
    case FOUND_SHOW_SELECTED:
      return {
        ...state,
        foundShows: (state.foundShows = action.data),
        isFinded: false,
        inputValue: (state.inputValue = "")
      };
    default:
      return state;
  }
};

const FoundShow = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addInputValue = e => {
    dispatch({ type: ADD_INPUT_VALUE, value: e.target.value });
  };

  const showSelected = id => {
    const data = state.foundShows.filter(el => el.show.id === id);
    dispatch({ type: FOUND_SHOW_SELECTED, data });
    props.history.push(`/shows/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${props.history.location.pathname}`);
      dispatch({ type: SET_SHOW, data: response.data });
      response.data.length > 0 && dispatch({ type: IS_FINDED });
    };
    fetchData();
  }, [state.foundShows, props.history.location.pathname]);

  useEffect(() => {
    const fetchSearchData = async () => {
      const response = await axios.get(`search/shows?q=${state.inputValue}`);
      dispatch({ type: SET_FOUND_SHOWS, data: response.data });
      response.data.length > 0 && dispatch({ type: IS_FINDED });
    };
    state.inputValue.length > 0 && fetchSearchData();
  }, [state.inputValue]);

  let addClass = "pt-1 d-none";
  state.isFinded && (addClass = "pt-1 d-block");

  return (
    <div className="container">
      <InputGroup change={addInputValue} value={state.inputValue} />
      {state.isFinded && (
        <Fragment>
          <div
            className={addClass}
            style={{ border: "1px solid #ced4da", borderRadius: ".25rem" }}
          >
            <ul className="p-0 m-0" style={{ listStyle: "none" }}>
              {state.foundShows.map(
                el =>
                  el.score > 2 && (
                    <SearchResult
                      key={el.show.id}
                      name={el.show.name}
                      click={() => showSelected(el.show.id)}
                    />
                  )
              )}
            </ul>
          </div>
        </Fragment>
      )}
      <h2 className="text-center m-4">
        {state.show.name} {state.show.network && `(${state.show.network.name})`}
      </h2>
      <hr />
      <div className="d-flex flex-wrap">
        <div className="col-md-4">
          <img
            className="w-100 pb-5"
            src={
              state.show.image
                ? state.show.image.medium
                : "https://naturalbd.com/Admin/main/no_poster.png"
            }
            alt="Show Poster"
          />
        </div>
        <div className="col-md-5 text-justify">
          {state.show.summary ? (
            parse(state.show.summary)
          ) : (
            <p className="text-center">No description avaliable!</p>
          )}
        </div>
        <div className="col-md-3">
          <ul className="pl-3">
            <li className="pb-3">
              Genre: {state.show.genres ? state.show.genres.join(", ") : ""};
            </li>
            <li className="pb-3">Type: {state.show.type};</li>
            <li className="pb-3">Language: {state.show.language};</li>
            <li>Runtime: {state.show.runtime} min;</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FoundShow;
