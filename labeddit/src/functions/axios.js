import axios from "axios";

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit";

export const signup = async (body) => {
  try {
    const response = await axios.post(`${baseUrl}/signup`, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (body) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createPost = async (body) => {
  const axiosConfig = {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("labeddit")).token,
    },
  };
  try {
    const response = await axios.post(`${baseUrl}/posts`, body, axiosConfig);
    return response.data.success;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createComment = async (postId, body) => {
  const axiosConfig = {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("labeddit")).token,
    },
  };
  try {
    const response = await axios.post(
      `${baseUrl}/posts/${postId}/comment`,
      body,
      axiosConfig
    );
    return response.data.success;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const votePost = async (postId, direction) => {
  const axiosConfig = {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("labeddit")).token,
    },
  };
  try {
    const response = await axios.put(
      `${baseUrl}/posts/${postId}/vote`,
      { direction: direction },
      axiosConfig
    );
    return response.data.success;
  } catch (error) {
    console.log(error.response);
    return false;
  }
};

export const voteComment = async (postId, commentId, direction) => {
  const axiosConfig = {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("labeddit")).token,
    },
  };
  try {
    const response = await axios.put(
      `${baseUrl}/posts/${postId}/comment/${commentId}/vote`,
      { direction: direction },
      axiosConfig
    );
    return response.data.success;
  } catch (error) {
    console.log(error.response);
    return false;
  }
};

export const getPosts = async () => {
  const axiosConfig = {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("labeddit")).token,
    },
  };
  try {
    const response = await axios.get(`${baseUrl}/posts`, axiosConfig);
    return response.data.posts;
  } catch (error) {
    console.log(error.response);
  }
};

export const getPostDetail = async (postId) => {
  const axiosConfig = {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("labeddit")).token,
    },
  };
  try {
    const response = await axios.get(`${baseUrl}/posts/${postId}`, axiosConfig);
    return response.data.post;
  } catch (error) {
    console.log(error.response);
  }
};
