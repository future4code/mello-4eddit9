import styled from "styled-components";
import Link from "@material-ui/core/Link";
import CardContent from "@material-ui/core/CardContent";

export const KarmaWrapper = styled.div`
  display: flex;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-around;

  div > * {
    margin: 4px;
  }
`;

export const Comments = styled(Link)`
  margin-top: 10px;
  cursor: pointer;
`;

export const Content = styled(CardContent)`
  width: 100%;
`;
