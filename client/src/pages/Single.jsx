import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Menu } from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/post/getpost/${postId}`);
        setPost(res.data.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/post/deletepost/${postId}`);
      navigate("/");
    } catch (err) {
      console.log("err", err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../uploads/${post?.img}`} alt="..." />
        <div className="user">
          <img src={post.user?.img} alt="" />
          <div className="info">
            <span>{post.user?.username}</span>
            <p>Posted {moment(post.createdAt).fromNow()}</p>
          </div>
          {currentUser && currentUser.id === post.userId && (
            <div className="edit">
              <Link to={"/write?edit=2"} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        {getText(post.desc)}
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};
