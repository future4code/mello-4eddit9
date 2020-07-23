import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export const FormContainer = styled.form`
  display: grid;
  justify-items: center;
  margin-top: 20px;
`;

export const Submit = styled(Button)`
  margin-bottom: 10px;
`;

export const TextInput = styled(TextField)`
  margin-bottom: 10px;
`;
