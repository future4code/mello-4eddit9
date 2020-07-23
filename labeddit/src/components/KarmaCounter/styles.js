import styled from "styled-components";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

export const CounterWrapper = styled.div`
  width: 5%;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: 10px;
`;

export const UpvoteButton = styled(ArrowUpwardIcon)`
  color: ${({ voted }) => (voted ? "#ff8b60" : "grey")};
  font-size: 2em;
  cursor: pointer;
`;

export const DownvoteButton = styled(ArrowDownwardIcon)`
  color: ${({ voted }) => (voted ? "#9494ff" : "grey")};
  font-size: 2em;
  cursor: pointer;
`;

export const VotesCount = styled.span`
  color: ${({ direction }) =>
    !direction ? "grey" : direction === 1 ? "#ff8b60" : "#9494ff"};
  font-size: 1.7em;
`;
