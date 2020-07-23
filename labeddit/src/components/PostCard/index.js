import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { languages } from "../../languages";
import LanguageContext from "../../contexts/LanguageContext";

import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { KarmaWrapper, CardFooter, Comments, Content } from "./styles";

import KarmaCounter from "../KarmaCounter";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    width: "100%",
    minWidth: 275,
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
  },
}));

const PostCard = (props) => {
  const {
    postId,
    userName,
    title,
    text,
    commentsCount,
    votesCount,
    userVoteDirection,
    createdAt,
    feedpage,
  } = props;
  const [selectedLanguage] = useContext(LanguageContext);
  const classes = useStyles();
  const history = useHistory();

  const shareUrl = `${window.location.href}${feedpage ? `/${postId}` : ""}`;

  const handleCommentClick = (postId) =>
    feedpage && history.push(`posts/${postId}`);

  const formatPostAge = (created) => {
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
            userVoteDirection={userVoteDirection}
            votesCount={votesCount}
            postId={postId}
          />
          <Content>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}
            >
              {`${
                languages[selectedLanguage].postedBy
              } ${userName} ${formatPostAge(createdAt)}`}
            </Typography>
            <Typography
              className={classes.pos}
              variant="h5"
              component="h2"
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}
            >
              {title}
            </Typography>
            <Typography
              className={classes.text}
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}
            >
              {text}
            </Typography>
            <CardFooter
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Comments
                variant="subtitle2"
                onClick={() => handleCommentClick(postId)}
              >
                {commentsCount} {languages[selectedLanguage].commentCounterText}
              </Comments>

              <div>
                <FacebookShareButton
                  url={shareUrl}
                  title={title}
                  separator=":: "
                >
                  <FacebookIcon size={24} round />
                </FacebookShareButton>
                <FacebookMessengerShareButton
                  url={shareUrl}
                  title={title}
                  separator=":: "
                >
                  <FacebookMessengerIcon size={24} round />
                </FacebookMessengerShareButton>
                <WhatsappShareButton
                  url={shareUrl}
                  title={title}
                  separator=":: "
                >
                  <WhatsappIcon size={24} round />
                </WhatsappShareButton>
                <TwitterShareButton
                  url={shareUrl}
                  title={title}
                  separator=":: "
                >
                  <TwitterIcon size={24} round />
                </TwitterShareButton>
              </div>
            </CardFooter>
          </Content>
        </KarmaWrapper>
      </Card>
    </Container>
  );
};

export default PostCard;
