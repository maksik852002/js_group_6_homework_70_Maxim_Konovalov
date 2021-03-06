import React, { useReducer, useEffect, Fragment } from "react";
import axios from "../../axios-base";
import InputGroup from "../../components/InputGroup/InputGroup";
import SearchResult from "../../components/SearchResult/SearchResult";
import Modal from "../../components/UI/Modal/Modal";

const ADD_INPUT_VALUE = "ADD_INPUT_VALUE";
const IS_FINDED = "FINDED";
const SET_DATA = "SET_DATA";
const SHOW_SELECTED = "SHOW_SELECTED";
const SET_ERROR = "SET_ERROR";
const CLOSE = "CLOSE";

const initialState = {
  shows: [],
  inputValue: "",
  isFinded: false,
  error: "",
  isOpen: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_INPUT_VALUE:
      return { ...state, inputValue: (state.inputValue = action.value) };
    case SET_DATA:
      return { ...state, shows: (state.show = action.data) };
    case IS_FINDED:
      return { ...state, isFinded: true };
    case SHOW_SELECTED:
      return { ...state, isFinded: false };
    case SET_ERROR:
      return { ...state, error: (state.error = action.error), isOpen: true };
    case CLOSE:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

const SearchTvShow = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addInputValue = e => {
    dispatch({ type: ADD_INPUT_VALUE, value: e.target.value });
  };

  const showSelected = id => {
    dispatch({ type: SHOW_SELECTED });
    props.history.push(`/shows/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`search/shows?q=${state.inputValue}`);
        dispatch({ type: SET_DATA, data: response.data });
        response.data.length > 0 && dispatch({ type: IS_FINDED });
      } catch (error) {
        dispatch({ type: SET_ERROR, error: error.toString() });
      }
    };
    state.inputValue.length > 0 && fetchData();
  }, [state.inputValue]);

  let addClass = "pt-1 d-none";
  state.isFinded && (addClass = "pt-1 d-block");

  return (
    <div className="container">
      <InputGroup change={addInputValue} value={state.inputValue} />
      {state.error.length > 0 ? (
        <Modal show={state.isOpen} close={() => dispatch({ type: CLOSE })}>
          {state.error}
        </Modal>
      ) : (
        state.shows.length > 0 && (
          <Fragment>
            <div
              className={addClass}
              style={{ border: "1px solid #ced4da", borderRadius: ".25rem" }}
            >
              <ul className="p-0 m-0" style={{ listStyle: "none" }}>
                {state.shows.map(
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
        )
      )}
    </div>
  );
};

export default SearchTvShow;
