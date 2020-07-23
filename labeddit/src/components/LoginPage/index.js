import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";

import { Helmet } from "react-helmet-async";

import { languages } from "../../languages";
import LanguageContext from "../../contexts/LanguageContext";
import UserContext from "../../contexts/UserContext";

import { login } from "../../functions/axios";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginPage = () => {
  const [selectedLanguage] = useContext(LanguageContext);
  const { setUserData } = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();
  const [form, handleFormChange] = useForm({ email: "", password: "" });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await login(form);
    if (response.token) {
      localStorage.setItem("labeddit", JSON.stringify(response));
      setUserData(response);
      history.push("/posts");
    } else {
      window.alert(response.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>{languages[selectedLanguage].loginLabel}</title>
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {languages[selectedLanguage].loginLabel}
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <TextField
            onChange={handleFormChange}
            value={form.email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={languages[selectedLanguage].emailLabel}
            name="email"
            autoFocus
            type="email"
          />
          <TextField
            onChange={handleFormChange}
            value={form.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={languages[selectedLanguage].passwordLabel}
            type="password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {languages[selectedLanguage].loginLabel}
          </Button>
        </form>
        <Link
          onClick={() => history.push("/signup")}
          variant="body2"
          style={{ cursor: "pointer" }}
        >
          {languages[selectedLanguage].signupText}
        </Link>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © LabEddit9 2020."}
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
