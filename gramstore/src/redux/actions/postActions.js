import axios from "axios";
import { message } from "antd";

export const addPost = (values) => async dispatch => {
  //attching other information to the sent values (user,likes,comments)
  //converted to JSON from string 
  values.user = JSON.parse(localStorage.getItem('user'))._id
  values.likes = []
  values.comments =[]
  
  
  dispatch({ type: "LOADING", payload: true });

  try {
    // successfully 
    await axios.post("/api/posts/addpost", values);
    dispatch({ type: "LOADING", payload: false });
    message.success("Post Added Successfully");
    
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something Went Wrong");
  }
};

export const getallposts = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/posts/getallposts");
    dispatch({ type: "LOADING", payload: false });
    dispatch({ type: "GET_ALL_POSTS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("something went wrong");
  }
};

export const likeorUnlikePost= (values) => async dispatch => {
    //recieved object 
    values.userid = JSON.parse(localStorage.getItem("user"))._id.toString();

  dispatch({ type: "LIKE_UNLIKE_LOADING", payload: true });

  try {
    // successfully 
    await axios.post("/api/posts/likeorunlikepost", values);
    dispatch({ type: "LIKE_UNLIKE_LOADING", payload: false });
    // message.success("Post Liked/Unliked Successfully");

  } catch (error) {
    console.log(error);
    dispatch({ type: "LIKE_UNLIKE_LOADING", payload: false });
    message.error("Something Went Wrong");
  }
};
export const addComment= (values) => async dispatch => {
    //recieved object 
    values.userid = JSON.parse(localStorage.getItem("user"))._id.toString();

  dispatch({ type: "ADD_COMMENT_LOADING", payload: true });

  try {
    // successfully 
    await axios.post("/api/posts/addcomment", values);
    dispatch({ type: "ADD_COMMENT_LOADING", payload: false });
    message.success(" Comment Added Successfully");

  } catch (error) {
    console.log(error);
    dispatch({ type: "ADD_COMMENT_LOADING", payload: false });
    message.error("Something Went Wrong");
  }
};

export const editPost = (values) => async (dispatch) => {

  dispatch({ type: "EDIT_POST_LOADING", payload: true });

  try {

    await axios.post("/api/posts/editpost", values);
    dispatch({ type: "EDIT_POST_LOADING", payload: false });
    message.success("Post Updated Successfully");
  } catch (error) {
    console.log(error);
    dispatch({ type: "EDIT_POST_LOADING", payload: false });
    message.error("Something Went Wrong");
  }
};