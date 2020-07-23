import styled from "styled-components";

export const SearchSortBar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: "search sort";
  margin-bottom: -55px;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "search" "sort";
  }
`;

export const SearchWrapper = styled.div`
  grid-area: search;
  display: grid;
  grid-template-columns: 1fr auto auto;
  margin-right: 15px;
  gap: 5px;
  @media (max-width: 500px) {
    margin-right: 0px;
  }
`;

export const SortWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  grid-area: sort;
  @media (max-width: 500px) {
    margin-top: 10px;
  }
`;
