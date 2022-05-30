import { Button, Col, Row, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from "../components/DefaultLayout";
import moment from "moment";
import { Link } from "react-router-dom";
import { followUser, getAllUsers, unfollowUser } from '../redux/actions/userActions';
import {
  UserAddOutlined,
  CheckOutlined,
} from "@ant-design/icons";

function AllUsers() {
    const {users} = useSelector((state)=>state.usersReducer)
    const dispatch= useDispatch()
  const currentuser = JSON.parse(localStorage.getItem('user'))
    const { followLoading, unfollowLoading } = useSelector(
      (state) => state.alertsReducer
  );
  const [searchKey, setSearchKey] = useState('')

    useEffect(() => {
      dispatch(getAllUsers());
    }, [followLoading, unfollowLoading]);
    
  return (
    <DefaultLayout>
      <div>
        <Row justify="center">
          <Col lg={20} className="d-flex mt-5">
            <Input className='search users'
            placeholder='Search Users' value={searchKey} onChange={(e)=>setSearchKey(e.target.value)}
            ></Input>
          </Col>
        </Row>
        <Row justify="center" gutter={16} className="mt-3">
          {users
            .filter((obj) => obj.username.toLowerCase().includes(searchKey.toLowerCase())).map((user) => {
              return (
                <>
                  {currentuser._id !== user._id && (
                    <Col lg={6} xs={24} className="text-left p-3">
                      <div className="bs1 p-2 mt-3">
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
                        <div>
                          <Link to={`/profile/${user._id}`}>{user.username}</Link>
                        </div>
                        <p>{moment(user.createdAt).format("MMM DD yyyy")}</p>
                        {user.followers.find(
                          (obj) => obj == currentuser._id
                        ) ? (
                          <div className="d-flex">
                            <Button className="" icon={<CheckOutlined />}>
                              Following
                            </Button>
                            <Button
                              className="ml-1"
                              onClick={() => {
                                dispatch(
                                  unfollowUser({
                                    currentuserid: currentuser._id,
                                    receiveruserid: user._id,
                                  })
                                );
                              }}
                            >
                              UnFollow
                            </Button>
                          </div>
                        ) : (
                          <Button
                            icon={<UserAddOutlined />}
                            onClick={() => {
                              dispatch(
                                followUser({
                                  currentuserid: currentuser._id,
                                  receiveruserid: user._id,
                                })
                              );
                            }}
                          >
                            Follow
                          </Button>
                        )}
                      </div>
                    </Col>
                  )}
                </>
              );
            })}
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default AllUsers