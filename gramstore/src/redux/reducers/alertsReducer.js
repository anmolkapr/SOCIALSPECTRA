const initialState = {
    loading : false,
    likeorUnlikeloading : false,
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

        default : return state
    }

    
}