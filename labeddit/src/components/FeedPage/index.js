import React from "react";
import { useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import usePosts from "../../hooks/usePosts";
import { Helmet } from "react-helmet-async";
import PostCard from "../PostCard";
import styled from 'styled-components';
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { createPost } from '../../functions/axios'



const FeedPage = () => {
  const FormContainer = styled.form`
    display: grid;
    justify-items: center;
    margin-top: 20px;
    
`
  const [posts] = usePosts();
  const history = useHistory();


  const [form, handleFormChange] = useForm({ text: "", title: "" });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const response = await createPost(form);
        if (response.token) {
          localStorage.setItem("labeddit", JSON.stringify(response));
          history.push("/posts");
        } else {
          window.alert(response.message);
        }
    };


  const handlePostClick = (postId) => history.push(`posts/${postId}`);



  return (
    <div>

      <form onSubmit={handleFormSubmit}>
          <FormContainer>
            <p>
              <TextField id="outlined-basic" variant="outlined"
              placeholder="Escrever post"
              type="text"
              name="text"
              onChange={handleFormChange}
              />
            </p>
            
            <p>
              <TextField id="outlined-basic" variant="outlined"
              placeholder="Título"
              type="text"
              name="title"
              onChange={handleFormChange}
              />
            </p>
            
            <p>
              <Button variant="contained" type="submit" onClick={handlePostClick}>Postar</Button>
            </p>
          </FormContainer>
          
      </form>

      

      <Helmet>
        <title>LabEddit</title>
      </Helmet>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          postId={post.id}
          userName={post.username}
          title={post.title}
          text={post.text}
          commentsCount={post.commentsCount}
          votesCount={post.votesCount}
          userVoteDirection={post.userVoteDirection}
          feedpage
        />
      ))}
    </div>
  );
};

export default FeedPage;
