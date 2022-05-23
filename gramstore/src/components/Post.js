import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import moment from "moment"
import {
    HeartFilled,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { getallposts, likeorUnlikePost, addComment } from '../redux/actions/postActions';
import { useDispatch, useSelector } from 'react-redux';
import {Modal, Row, Col, Input} from'antd'
const { TextArea } = Input;

function Post({ post }) {
  const dispatch = useDispatch();
  const currentuser = JSON.parse(localStorage.getItem("user"));
  const alreadyLiked = post.likes.find(
    (obj) => obj.user.toString() == currentuser._id
  );
  const { likeorUnlikeloading, addcommentloading } = useSelector(
    (state) => state.alertsReducer
  );
  const [commentModalVisibility, setCommentModalVisibility] = useState(false);
  const [comment, setComment] = useState("");
  const { users } = useSelector((state) => state.usersReducer);

  useEffect(() => {
    dispatch(getallposts());
  }, [likeorUnlikeloading, addcommentloading]);
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
      <img src={post.image} className="postimage w-100" />

      <p className="mt1 mb-1 text-left">{post.description}</p>

      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center mr-3">
          <HeartFilled
            style={{ color: alreadyLiked ? "red" : "grey" }}
            onClick={() => {
              dispatch(likeorUnlikePost({ postid: post._id }));
            }}
          />

          <p>{post.likes.length}</p>
        </div>

        <div className="d-flex align-items-center">
          <CommentOutlined
            onClick={() => {
              setCommentModalVisibility(true);
            }}
          />
          <p>{post.comments.length}</p>
        </div>
      </div>
      <Modal
        visible={commentModalVisibility}
        title="Comments"
        closable={false}
        width={900}
        okText="Add Comment"
        onOk={() => {
          dispatch(addComment({ postid: post._id, comment: comment }));
          setCommentModalVisibility(false);
        }}
        onCancel={() => {
          setCommentModalVisibility(false);
        }}
      >
        <Row>
          <Col lg={13} xs={0}>
            <img src={post.image} height="400" className="w-100" />
          </Col>
          <Col lg={11} xs={24}>
            <TextArea
              placeholder="Add your Comment here"
              className="ml-2"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            {post.comments.map((comment) => {
              const user = users.find((obj) => obj._id == comment.user);
              console.log(user);
              return (
                <div className="d-flex align-items-center m-1 p-1 justify-content-between">
                  <div className="d-flex align-items-center ">
                    {user.profilePicUrl == "" ? (
                      <span className="profilepic1 d-flex align-items-center">
                        {user.username[0]}
                      </span>
                    ) : (
                      <img
                        src={post.user.profilePicUrl}
                        height="35"
                        width="35"
                        style={{ borderRadius: "50%" }}
                      />
                    )}
                    <Link
                      className="ml-1"
                      style={{ fontSize: 15, marginLeft: 10 }}
                    >
                      {user.username}
                    </Link>
                    <p style={{ fontSize: 15 }}>{comment.comment}</p>
                  </div>
                  <div className="text-right d-flex">
                    <p style={{ fontSize: 13 }} className="text-right">
                      {comment.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default Post;
