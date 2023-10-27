// import logo from './logo.svg';
import './App.css';
import './view.css';

import React, { useEffect } from 'react';
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import pb from "./proto_out/blog_pb";
import { BlogRunTimeClient } from "./proto_out/blog_grpc_web_pb";


const client = new BlogRunTimeClient("http://localhost:50052", null, null);
function App() {
  const [blog, setBlog] = React.useState(null);

  useEffect(() => {
    // axios.get(`http://localhost:8090/get_mock/784130dd-7f7d-49eb-bd12-a48810706483`).then((response) => {
    //   console.log(response.data)
    //   setPost(response.data);
    //   // setThumbsup(response.data.thumps_up);
    // });

    // if (!post) return "Not initiated!"

    const get_blog = new pb.GetBlogRequest()
    get_blog.setBlogId("784130dd-7f7d-49eb-bd12-a48810706483")
    client.getBlogg(get_blog, {}, (err, response) => {
      if (err) {
        console.log("\n get_blog err : ", err);
        return
      }
      console.log("\n get_blog success : ", response.toObject());
      setBlog(response.toObject())
    })
  }, []);
  if (!blog) return "No blogs!"


  const thumbsupclick = () => {
    var blog_update = new pb.BlogRuntimeRequest()
    var thumps_up_req = new pb.BlogThumbsupRequest()

    thumps_up_req.setBlogId(blog.blogId)
    thumps_up_req.setThumpsUp(1)
    thumps_up_req.setWho(blog.who)

    blog_update.setBlogThumbsupRequest(thumps_up_req)
    console.log("\n thumps_up request : ", blog_update.setBlogThumbsupRequest)

    client.updateBlog(blog_update, {}, (err, response) => {
      if (err) {
        console.log("\n thumps_up_req error ", err);
        return;
      }
      console.log("\n thumps_up_req message ", response.toObject());
      setBlog(response.toObject());
    })
  }

  const thumbsdownclick = () => {
    var blog_update = new pb.BlogRuntimeRequest()
    var thumps_up_req = new pb.BlogThumbsdownRequest()

    thumps_up_req.setBlogId(blog.blogId)
    thumps_up_req.setThumpsDown(1)
    thumps_up_req.setWho(blog.who)

    blog_update.setBlogThumbsdownRequest(thumps_up_req)
    console.log("\n thumps_down request : ", blog_update.setBlogThumbsdownRequest)

    client.updateBlog(blog_update, {}, (err, response) => {
      if (err) {
        console.log("\n thumps_down_req error ", err);
        return;
      }
      console.log("\n thumps_down_req message ", response.toObject());
      setBlog(response.toObject());
    })
  }

  return (
    <div className="App">
      <header>
      </header>
      <div className="blog">
        <div className="write_rating">
          <div className="blog_header">
            <h2>Blog Name</h2>
            <h3 id="id">{blog.blogId}</h3>
            <h3 id="name">{blog.who}</h3>
          </div>
          <div className="row">
            <div className="leftcolumn">
              <div className="card">
                <div className="grow like_div">
                  <FontAwesomeIcon icon={faThumbsUp} onClick={thumbsupclick} />
                </div>
                <div className="grow like_div">
                  <FontAwesomeIcon icon={faThumbsDown} onClick={thumbsdownclick} />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="read_rating">
          <div className="blog_header">
            <h2>Blog Name</h2>
            <h3 id="id">{blog.blogId}</h3>
            <h3 id="name">{blog.who}</h3>
          </div>
          <div className="row">
            <div className="leftcolumn">
              <div className="card">
                <h2>TITLE HEADING</h2>
                <h5>Title description, Dec 7, 2017</h5>
                <p>Some text..</p>
                <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco.Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do
                  eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco.
                </p>
                <p>Some text..</p>
                <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco.Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do
                  eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco.
                </p>
                <span><div className="grow like_div like_color">
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <span id="up_value" >{blog.thumbsUp}</span>
                </div></span>
                <span><div className="grow dislike_div dislike_color">
                  <FontAwesomeIcon icon={faThumbsDown} />
                  <span id="down_value" >{blog.thumbsDown}</span>
                </div></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
