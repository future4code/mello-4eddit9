import React, { useContext } from "react";
import useForm from "../../hooks/useForm";

import { languages } from "../../languages";
import LanguageContext from "../../contexts/LanguageContext";

import { createComment } from "../../functions/axios";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import { FormContainer, Submit, TextInput } from "./styles";

const CommentForm = (props) => {
  const { postId, getPostDetails } = props;
  const [form, handleFormChange, resetForm] = useForm({ text: "" });
  const [selectedLanguage] = useContext(LanguageContext);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const success = await createComment(postId, form);
    if (success) {
      resetForm();
      getPostDetails(postId);
    } else {
      alert(languages[selectedLanguage].postErrorAlert);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Card variant="outlined" style={{ marginTop: "20px", minWidth: "275px" }}>
        <FormContainer onSubmit={handleFormSubmit}>
          <div style={{ width: "90%" }}>
            <Typography
              variant="h6"
              style={{ marginBottom: "5px", color: "#2e2e2d" }}
            >
              {languages[selectedLanguage].commentFormLabel}
            </Typography>
            <TextInput
              required
              value={form.text}
              variant="outlined"
              label={languages[selectedLanguage].commentTextPlaceholder}
              type="text"
              name="text"
              onChange={handleFormChange}
              multiline
              rows={5}
              fullWidth
            />
          </div>
          <Submit type="submit" variant="contained">
            {languages[selectedLanguage].postButton}
          </Submit>
        </FormContainer>
      </Card>
    </Container>
  );
};

export default CommentForm;
