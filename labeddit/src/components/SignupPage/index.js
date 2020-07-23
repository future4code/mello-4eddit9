import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";

import { Helmet } from "react-helmet-async";

import { languages } from "../../languages";
import LanguageContext from "../../contexts/LanguageContext";
import UserContext from "../../contexts/UserContext";

import { signup } from "../../functions/axios";

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

const SignupPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedLanguage] = useContext(LanguageContext);
  const { setUserData } = useContext(UserContext);

  const [form, handleFormChange] = useForm({
    email: "",
    password: "",
    username: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await signup(form);
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
        <title>{languages[selectedLanguage].signupLabel}</title>
      </Helmet>

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {languages[selectedLanguage].signupLabel}
        </Typography>
        <form onSubmit={handleFormSubmit} className={classes.form}>
          <TextField
            onChange={handleFormChange}
            value={form.username}
            margin="normal"
            required
            fullWidth
            label={languages[selectedLanguage].usernameLabel}
            variant="outlined"
            type="text"
            name="username"
            autoFocus
          />
          <TextField
            onChange={handleFormChange}
            value={form.email}
            margin="normal"
            required
            fullWidth
            label={languages[selectedLanguage].emailLabel}
            variant="outlined"
            type="email"
            name="email"
          />
          <TextField
            onChange={handleFormChange}
            value={form.password}
            margin="normal"
            required
            fullWidth
            label={languages[selectedLanguage].passwordLabel}
            variant="outlined"
            type="password"
            name="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {languages[selectedLanguage].signupLabel}
          </Button>
        </form>
        <Link
          onClick={() => history.push("/login")}
          style={{ cursor: "pointer" }}
          variant="body2"
        >
          {languages[selectedLanguage].loginLinkText}
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

export default SignupPage;
