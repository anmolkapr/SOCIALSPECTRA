const initialState = {
    loading : false,
    likeorUnlikeloading : false,
    addcommentloading: false,
}

export const alertsReducer = (state=initialState, action) =>{

    switch(action.type){
        case 'LOADING': return{
            ...state,
            loading: action.payload
        }

        case 'LIKE_UNLIKE_LOADING': return {
            ...state,
            likeorUnlikeloading: action.payload
        }
        
        case 'ADD_COMMENT_LOADING': return {
            ...state,
            addcommentloading: action.payload
        }
        default : return state
    }

    
}