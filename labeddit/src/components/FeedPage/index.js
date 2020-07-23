import React, { useState } from "react";
import usePosts from "../../hooks/usePosts";

import { Helmet } from "react-helmet-async";

import PostForm from "../PostForm";
import PostCard from "../PostCard";
import FeedFilter from "../FeedFilter";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
}));

const FeedPage = () => {
  const [posts, getPosts] = usePosts();
  const classes = useStyles();
  const [order, setOrder] = useState("created_new");
  const [search, setSearch] = useState();

  let orderedPosts;
  if (posts) {
    orderedPosts = posts;
    switch (order) {
      case "created_new":
        orderedPosts.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "created_old":
        orderedPosts.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "votes_more":
        orderedPosts.sort((a, b) => b.votesCount - a.votesCount);
        break;
      case "votes_less":
        orderedPosts.sort((a, b) => a.votesCount - b.votesCount);
        break;
      default:
        break;
    }
  }

  if (orderedPosts && search) {
    const searchWords = search.split(" ");
    searchWords.forEach(
      (word) =>
        (orderedPosts = orderedPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(word.toLowerCase()) ||
            post.text.toLowerCase().includes(word.toLowerCase()) ||
            post.username.toLowerCase().includes(word.toLowerCase())
        ))
    );
    // Desse jeito todas as palavras tinham que estar presentes no mesmo campo
    // pode ser util em outra ocasiao, deixarei aqui para referencia
    // const regex = new RegExp(
    //   search
    //     .split(" ")
    //     .map((item) => `(?=.*${item})`)
    //     .join(""),
    //   "i"
    // );
    // orderedPosts = orderedPosts.filter(
    //   (post) =>
    //     regex.test(post.title) ||
    //     regex.test(post.text) ||
    //     regex.test(post.username)
    // );
  }

  return posts.length > 0 ? (
    <div>
      <Helmet>
        <title>LabEddit</title>
      </Helmet>

      <PostForm getPosts={getPosts} />

      <FeedFilter setOrder={setOrder} setSearch={setSearch} />

      {orderedPosts.map((post) => (
        <PostCard
          key={post.id}
          postId={post.id}
          userName={post.username}
          title={post.title}
          text={post.text}
          commentsCount={post.commentsCount}
          votesCount={post.votesCount}
          userVoteDirection={post.userVoteDirection}
          createdAt={post.createdAt}
          feedpage
        />
      ))}
    </div>
  ) : (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
};

export default FeedPage;
