import { useState, useEffect } from "react";
import { getPosts } from "../functions/axios";

const usePosts = () => {
  const [posts, setPosts] = useState([]);

  const requestPosts = async () => {
    setPosts([]);
    const response = await getPosts();
    setPosts(response);
  };

  useEffect(() => {
    requestPosts();
  }, []);

  return [posts, requestPosts];
};

export default usePosts;
