import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getPostDetail } from "../functions/axios";

const usePostDetail = (postId) => {
  const [postDetail, setPostDetail] = useState();

  const history = useHistory();

  const requestPostDetail = async (id) => {
    setPostDetail();
    const response = await getPostDetail(id);
    if (response.username) {
      setPostDetail(response);
    } else {
      history.replace("/404");
    }
  };

  useEffect(() => {
    requestPostDetail(postId);
  }, [postId]);

  return [postDetail, requestPostDetail];
};

export default usePostDetail;
