import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route, Redirect} from "react-router-dom"
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddPost from './pages/AddPost';
import 'antd/dist/antd.css';
import Login from './pages/Login';
import Register from './pages/Register';
import AllUsers from './pages/AllUsers';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getallposts } from './redux/actions/postActions';
import { getAllUsers } from "./redux/actions/userActions";

function App() {
  const { loading, likeorUnlikeloading } = useSelector(
    (state) => state.alertsReducer
  );

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getallposts())
  },[])


  return (
    <div className="App">
      {(loading || likeorUnlikeloading) && (
        <div className="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      <BrowserRouter>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/register" exact component={Register}></Route>
        <ProtectedRoute path="/" exact component={Home}></ProtectedRoute>
        <ProtectedRoute
          path="/profile"
          exact
          component={Profile}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/addpost"
          exact
          component={AddPost}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/allusers"
          exact
          component={AllUsers}
        ></ProtectedRoute>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoute=(props)=>{

    if(localStorage.getItem('user')){

      return <Route {...props}/>

    }else{
      return <Redirect to='/login'/>
    }

}