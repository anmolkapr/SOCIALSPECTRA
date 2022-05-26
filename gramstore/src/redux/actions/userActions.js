import axios from "axios";
import { message } from "antd";

export const userRegister = (values) => async dispatch => {
  dispatch({ type: "LOADING", payload: true });

  try {
    // console.log(values)
    if (values.cpassword !== values.password) {
      dispatch({ type: "LOADING", payload: false });
      message.error("Confirm password does not match Password!");
    }
    else
    {
      delete values.cpassword;
    
      const response = await axios.post("/api/users/register", values);
      dispatch({ type: "LOADING", payload: false });
      // console.log(response)
      if (response.data ==  "User already registered") {
        message.error("Username already taken!");
      } else {
        message.success("User registered successfully");
        window.location.href = "/login";
      }
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("something went wrong");
  }
};

export const userLogin = (values) => async dispatch => {
  dispatch({ type: "LOADING", payload: true });
    console.log(values)

  try {
    const response = await axios.post("/api/users/login", values);
    console.log(response)
    dispatch({ type: "LOADING", payload: false });
    if (response.data == "Invalid credentials")
    {
      message.error("Invalid Credentials !");
      // window.location.href = "/login";
    }
    else
    {
      message.success("Login success");
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/";
    }
  } 
  catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Invalid credentials");
  }
};

export const getAllUsers = (values) => async dispatch => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/users/getallusers");
    dispatch({ type: "LOADING", payload: false });
    dispatch({ type: "GET_ALL_USERS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("something went wrong");
  }
};

export const followUser = (values) => async dispatch => {
  dispatch({ type: "FOLLOW_LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/followuser", values);
    dispatch({ type: "FOLLOW_LOADING", payload: false });
    message.success("Followed Successfully");
    
  } catch (error) {
    console.log(error);
    dispatch({ type: "FOLLOW_LOADING", payload: false });
    message.error("something went wrong");
  }
};

export const unfollowUser = (values) => async dispatch => {
  dispatch({ type: "UNFOLLOW_LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/unfollowuser", values);
    dispatch({ type: "UNFOLLOW_LOADING", payload: false });
    message.success("Unfollowed Successfully");
  } catch (error) {
    console.log(error);
    dispatch({ type: "UNFOLLOW_LOADING", payload: false });
    message.error("something went wrong");
  }
};

export const editUser = (values) => async dispatch => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/edit", values);
    dispatch({ type: "LOADING", payload: false });
    message.success("User profile updated successfully");

    localStorage.setItem('user', JSON.stringify(response.data))
    window.location.href = `/profile/${response.data._id}`;
  }
  catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("something went wrong");
  }
};
