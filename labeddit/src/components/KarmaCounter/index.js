import React, { useReducer } from "react";
import { karmaReducer } from "../../functions/karmaReducer";

import { votePost, voteComment } from "../../functions/axios";

import {
  CounterWrapper,
  UpvoteButton,
  DownvoteButton,
  VotesCount,
} from "./styles";

const KarmaCounter = (props) => {
  const { userVoteDirection, votesCount, postId, commentId } = props;
  const [state, dispatch] = useReducer(karmaReducer, {
    userVoteDirection,
    votesCount,
  });

  const upvote = () => {
    dispatch({ type: "UPVOTE" });
    if (commentId) {
      voteComment(postId, commentId, userVoteDirection === 1 ? 0 : 1);
    } else {
      votePost(postId, userVoteDirection === 1 ? 0 : 1);
    }
  };
  const downvote = () => {
    dispatch({ type: "DOWNVOTE" });
    if (commentId) {
      voteComment(postId, commentId, userVoteDirection === -1 ? 0 : -1);
    } else {
      votePost(postId, userVoteDirection === -1 ? 0 : -1);
    }
  };

  return (
    <CounterWrapper>
      <UpvoteButton
        voted={state.userVoteDirection === 1 ? 1 : 0}
        onClick={upvote}
      />
      <VotesCount direction={state.userVoteDirection}>
        {state.votesCount}
      </VotesCount>
      <DownvoteButton
        voted={state.userVoteDirection === -1 ? 1 : 0}
        onClick={downvote}
      />
    </CounterWrapper>
  );
};

export default KarmaCounter;
