import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import moment from "moment"
import {
    HeartFilled,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { getallposts, likeorUnlikePost } from '../redux/actions/postActions';
import { useDispatch, useSelector } from 'react-redux';

function Post({ post }) {
  const dispatch = useDispatch();
    const currentuser = JSON.parse(localStorage.getItem("user"));
    const alreadyLiked = post.likes.find(
      (obj) => obj.user.toString() == currentuser._id
    );
  const { likeorUnlikeloading } = useSelector((state)=>state.alertsReducer);
  
  useEffect(() => {
    
    dispatch(getallposts())
    
  },[likeorUnlikeloading])
  //if the value in the second argument is changed then the first function is executed
  
  
  return (
    <div className="bs1 p-2 mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {/* if not present then default profile pic */}
          {post.user.profilePicUrl == "" ? (
            <span className="profilepic1 d-flex align-items-center">
              {post.user.username[0]}
            </span>
          ) : (
            <img
              src={post.user.profilePicUrl}
              height="35"
              width="35"
              style={{ borderRadius: "50%" }}
            />
          )}
          <Link className="ml-2">{post.user.username}</Link>
        </div>
        <div className="semibold(600)">
          <p>{moment(post.createdAt).format("DD MMM yyyy")}</p>
        </div>
      </div>
      <img
        src={post.image}
        className="postimage w-100"
      />

      <p className="mt1 mb-1 text-left">{post.description}</p>

      <div className='d-flex align-items-center'>
          <div className='d-flex align-items-center mr-3'>
          <HeartFilled
            style={{color: alreadyLiked ? 'red' : 'grey'}}
            onClick={() => { dispatch(likeorUnlikePost({ postid: post._id })) }} />
               
              <p>{post.likes.length}</p>
          </div>

          <div className='d-flex align-items-center'>
              <CommentOutlined />
              <p>{post.comments.length}</p>
          </div>
          </div>
    </div>
  );
}

export default Post
