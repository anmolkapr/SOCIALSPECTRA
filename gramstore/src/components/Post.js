import React from 'react'
import { Link } from 'react-router-dom';
import moment from "moment"
import {
    HeartOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

function Post({post}) {
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
              <HeartOutlined />
              <p>{post.likes.length}</p>
          </div>

          <div className='d-flex align-items-center'>
              <CommentOutlined />
              <p>{post.likes.length}</p>
          </div>
          </div>
    </div>
  );
}

export default Post
