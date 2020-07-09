export const karmaReducer = (state, action) => {
  switch (action.type) {
    case "UPVOTE":
      if (state.userVoteDirection === 1) {
        // Ja tinha upvote, entao esta anulando o voto
        return { userVoteDirection: 0, votesCount: state.votesCount - 1 };
      } else if (state.userVoteDirection === -1) {
        // Tinha Downvote
        return { userVoteDirection: 1, votesCount: state.votesCount + 2 };
      } else {
        return { userVoteDirection: 1, votesCount: state.votesCount + 1 };
      }
    case "DOWNVOTE":
      if (state.userVoteDirection === -1) {
        // Ja tinha downvote, entao esta anulando o voto
        return { userVoteDirection: 0, votesCount: state.votesCount + 1 };
      } else if (state.userVoteDirection === 1) {
        // Tinha upvote
        return { userVoteDirection: -1, votesCount: state.votesCount - 2 };
      } else {
        return { userVoteDirection: -1, votesCount: state.votesCount - 1 };
      }
    default:
      return state;
  }
};
