import React, { useContext } from "react";

import { languages } from "../../languages";
import LanguageContext from "../../contexts/LanguageContext";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import KarmaCounter from "../KarmaCounter";
import { KarmaWrapper } from "./styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    width: "100%",
    minWidth: 275,
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
    fontSize: 14,
  },
  text: {
    fontSize: 16,
  },
}));

const CommentCard = (props) => {
  const { postId, comment } = props;
  const classes = useStyles();
  const [selectedLanguage] = useContext(LanguageContext);

  const formatCommentAge = (created) => {
    const ageInMinutes = ((Date.now() - created) / 60000).toFixed(0);
    if (ageInMinutes < 1) {
      // menos de 1 minuto
      return languages[selectedLanguage].now;
    } else if (ageInMinutes < 59) {
      // menos de 1 hora
      return `${ageInMinutes} ${languages[selectedLanguage].minutes}`;
    } else if (ageInMinutes < 119) {
      // menos de 2 horas
      return `1 ${languages[selectedLanguage].hour}`;
    } else if (ageInMinutes < 1439) {
      // menos de 1 dia
      const ageInHours = (ageInMinutes / 60).toFixed(0);
      return `${ageInHours} ${languages[selectedLanguage].hours}`;
    } else if (ageInMinutes < 2879) {
      // menos de 2 dias
      return `1 ${languages[selectedLanguage].day}`;
    } else if (ageInMinutes < 10079) {
      // menos de 1 semana
      const ageInDays = (ageInMinutes / 1440).toFixed(0);
      return `${ageInDays} ${languages[selectedLanguage].days}`;
    } else if (ageInMinutes < 43199) {
      // menos de 1 mes
      const ageInWeeks = (ageInMinutes / 10080).toFixed(0);
      return `${ageInWeeks} ${languages[selectedLanguage].weeks}`;
    } else if (ageInMinutes < 86400) {
      return `1 ${languages[selectedLanguage].month}`;
    } else {
      // mais de 2 meses
      const ageInMonths = (ageInMinutes / 43200).toFixed(0);
      return `${ageInMonths} ${languages[selectedLanguage].months}`;
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Card className={classes.root} variant="outlined">
        <KarmaWrapper>
          <KarmaCounter
            postId={postId}
            userVoteDirection={comment.userVoteDirection}
            votesCount={comment.votesCount}
            commentId={comment.id}
          />
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}
            >
              {`${languages[selectedLanguage].commentedBy} ${
                comment.username
              } ${formatCommentAge(comment.createdAt)}`}
            </Typography>
            <Typography
              className={classes.text}
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}
            >
              {comment.text}
            </Typography>
          </CardContent>
        </KarmaWrapper>
      </Card>
    </Container>
  );
};

export default CommentCard;
