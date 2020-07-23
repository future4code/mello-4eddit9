import React, { useState, useContext } from "react";
import { SortWrapper, SearchWrapper, SearchSortBar } from "./styles";
import Container from "@material-ui/core/Container";
import { languages } from "../../languages";
import LanguageContext from "../../contexts/LanguageContext";
const FeedFilter = (props) => {
  const { setOrder, setSearch } = props;
  const [searchInput, setSearchInput] = useState("");
  const [selectedLanguage] = useContext(LanguageContext);

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchClick = () => {
    setSearch(searchInput);
  };

  const handleClearClick = () => {
    setSearch("");
    setSearchInput("");
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <SearchSortBar>
        <SearchWrapper>
          <input
            value={searchInput}
            onChange={handleSearchChange}
            placeholder={languages[selectedLanguage].searchPlaceholder}
          />
          <button onClick={handleSearchClick}>
            {languages[selectedLanguage].searchButton}
          </button>
          <button onClick={handleClearClick}>
            {languages[selectedLanguage].clearSearchButton}
          </button>
        </SearchWrapper>
        <SortWrapper>
          <div />
          <label>
            {languages[selectedLanguage].sortLabel}{" "}
            <select onChange={handleOrderChange}>
              <option value="created_new">
                {languages[selectedLanguage].newest}
              </option>
              <option value="created_old">
                {languages[selectedLanguage].oldest}
              </option>
              <option value="votes_more">
                {languages[selectedLanguage].upvotes}
              </option>
              <option value="votes_less">
                {languages[selectedLanguage].downvotes}
              </option>
            </select>
          </label>
        </SortWrapper>
      </SearchSortBar>
    </Container>
  );
};

export default FeedFilter;
