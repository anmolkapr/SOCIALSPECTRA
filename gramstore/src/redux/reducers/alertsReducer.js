const initialState = {
    loading : false,
    likeorUnlikeloading : false,
    addcommentloading: false,
    followLoading: false,
    unfollowLoading : false,
}

export const alertsReducer = (state=initialState, action) =>{

    switch (action.type) {
      case "LOADING":
        return {
          ...state,
          loading: action.payload,
        };

      case "LIKE_UNLIKE_LOADING":
        return {
          ...state,
          likeorUnlikeloading: action.payload,
        };

      case "ADD_COMMENT_LOADING":
        return {
          ...state,
          addcommentloading: action.payload,
        };

      case "FOLLOW_LOADING":
        return {
          ...state,
          followLoading: action.payload,
        };

      case "UNFOLLOW_LOADING":
        return {
          ...state,
          unfollowLoading: action.payload,
        };

      default:
        return state;
    }

    
}