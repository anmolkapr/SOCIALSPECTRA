import { Col, Row, Button } from 'antd'
import { Link } from "react-router-dom";
import React from 'react'
import {useSelector} from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import Post from "../components/Post";
const moment = require("moment")


function Profile({match}) {
  const { users } = useSelector((state) => state.usersReducer)
  const {posts} = useSelector((state)=>state.postsReducer)
  const currentuser = JSON.parse(localStorage.getItem('user'))
  const user = users.find((obj) => obj._id == match.params.userid)
  // find is used as we are not searching from the mongo database
  const usersposts = posts.filter((obj)=>obj.user._id == match.params.userid)

  return (
    <DefaultLayout>
      {users.length > 0 && (
        <>
          <Row justify="center">
            <Col lg={12} sm={24} xs={24}>
              {/* <h1>{user._id}</h1> */}
              <div className="bs1 m-2 p-2 text-left">
                <div className="d-flex align-items-center">
                  {user.profilePicUrl == "" ? (
                    <p className="profilepic2">{user.username[0]}</p>
                  ) : (
                    <img
                      src={user.profilePicUrl}
                      height="60"
                      width="60"
                      style={{ borderRadius: "50%" }}
                    />
                  )}

                  <div className="text-left ml-3">
                    <p style={{ color: "black" }}>{user.username}</p>
                    <p style={{ fontSize: 15 }}>
                      {moment(user.createdAt).format("MMM DD yyyy")}
                    </p>
                    {currentuser._id == user._id && (
                      <Button>
                        <Link to="/editprofile">Edit profile</Link>
                      </Button>
                    )}
                  </div>
                </div>

                <p style={{ color: "black", fontSize: 16 }}>
                  {user.bio == "" ? "Frontend Developer" : user.bio}
                </p>
                <div className="text-left">
                  <Button className="mr-2">
                    Followers : {user.followers.length}
                  </Button>
                  <Button>Following : {user.following.length}</Button>
                </div>

                <p style={{ color: "black", fontSize: 16 }}>
                  Total posts : {usersposts.length}
                </p>
              </div>
            </Col>
          </Row>

          {(currentuser._id == user._id ||
            user.privateAccount == false ||
            (user.followers.find((obj) => obj == currentuser._id)) ? (
              <Row>
                {usersposts.map((post) => {
                  return (
                    <Col lg={7} sm={24} xs={24}>
                      <Post post={post} postInProfilePage={true} />
                    </Col>
                  );
                })}
              </Row>
            ) : (<p>This Account is Private</p>))}
        </>
      )}
    </DefaultLayout>
  );
}

export default Profile
