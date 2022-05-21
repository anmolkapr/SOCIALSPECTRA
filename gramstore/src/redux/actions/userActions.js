import axios from "axios";
import { message } from "antd";

export const userRegister = (values) => async dispatch => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/users/register", values);
    dispatch({ type: "LOADING", payload: false });
    message.success("User registered successfully");
    window.location.href = "../login";
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
    dispatch({ type: "LOADING", payload: false });
    message.success("Login success");
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.data));
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Invalid credentials");
  }
};
