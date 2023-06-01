import { useState, useEffect } from "react";
import styled from "styled-components";
import React from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const localUrl = "http://localhost:5000/api/v1/admin/login";
const localBlogUrl = "http://localhost:5000/api/v1/blog";

const Dashboard = ({ blogPosts, setBlogPosts, user }) => {
  const [firstRender, setFirstRender] = useState(false);
  const [postChanged, setPostChanged] = useState(0);
  const [open, setOpen] = useState(false);
  const [published, setPublished] = useState(false);
  const [paragraphs, setParagraphs] = useState(3);
  const [newPost, setNewPost] = useState({
    title: "",
    paragraphs: new Array(paragraphs).fill(" "),
    author: "",
    status: "draft",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [error, setError] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    if (!firstRender) {
      setFirstRender(true);
    } else {
      const handlePosts = async () => {
        const blogresponse = await fetch(localBlogUrl, {
          method: "GET",
          json: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
        });
        const blogData = await blogresponse.json();
        setBlogPosts(blogData.data);
      };
      handlePosts();
    }
  }, [postChanged]);

  const handleDelete = async (id) => {
    const handlePosts = async () => {
      const blogresponse = await fetch(`${localBlogUrl}/${id}`, {
        method: "DELETE",
        json: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      });
      const blogData = await blogresponse.json();
      await console.log(blogData);
      let changedState = postChanged + 1;
      setPostChanged(changedState);
    };
    handlePosts();
  };

  const handleAddPost = () => {
    setOpen(true);
  };
  const closeAddPost = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    setSuccessOpen(false);
  };

  const handleStatus = () => {
    if (newPost.status === "published") {
      setNewPost({ ...newPost, status: "draft" });
    } else {
      setNewPost({ ...newPost, status: "published" });
    }
  };

  const handleParagraphs = (e, index) => {
    console.log(index);
    let newParagraphs = newPost.paragraphs;
    newParagraphs[index] = e.target.value;

    setNewPost({ ...newPost, paragraphs: newParagraphs });
  };

  const handleAddRequest = async () => {
    if (!newPost.title || !newPost.paragraphs || !newPost.author) {
      setError(true);
    } else {
      setError(false);

      try {
        const request = await fetch(localBlogUrl, {
          method:"POST",
          json: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
          body: JSON.stringify(newPost),
        });
        const requestJson = await request.json();

        setOpen(false);
        setSuccessOpen(true);
        let changedState = postChanged + 1;
        setPostChanged(changedState);
        setNewPost({
          title: "",
          paragraphs: new Array(paragraphs).fill(" "),
          author: "",
          status: "draft",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdateRequest = async () => {
    if (!newPost.title || !newPost.paragraphs || !newPost.author) {
      setError(true);
    } else {
      setError(false);

      try {
        const request = await fetch(`${localBlogUrl}/${editId}`, {
          method:"PATCH",
          json: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
          body: JSON.stringify(newPost),
        });
        

        setOpen(false);
        setSuccessOpen(true);
        let changedState = postChanged + 1;
        setPostChanged(changedState);
        setNewPost({
          title: "",
          paragraphs: new Array(paragraphs).fill(" "),
          author: "",
          status: "draft",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <DashboardContainer>
      <div className="blogposts">
        {blogPosts.map((post) => {
          return (
            <div key={post.id} className="post">
              <img src={post.photo} alt="blog image" />
              <h3>{post.title}</h3>
              <p>{post.paragraphs[0] + "..."}</p>
              <div className="btns">
                <button
                  onClick={() => {
                    setEditMode(true);
                    setEditId(post._id);
                    setNewPost({
                      title: post.title,
                      paragraphs: post.paragraphs,
                      author: post.author,
                      status: post.status,
                    });
                    setOpen(true);
                  }}
                  className="change"
                >
                  Change Post
                </button>
                <button
                  onClick={() => {
                    handleDelete(post._id);
                  }}
                  className="delete"
                >
                  Delete Post
                </button>
              </div>
            </div>
          );
        })}
        <button
          onClick={() => {
            setEditId(null);
            handleAddPost();
          }}
          className="add-post"
        >
          +
        </button>
      </div>
      <Dialog fullScreen onClose={closeAddPost} open={open}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle>Add New Blog Post</DialogTitle>
          <button
            style={{
              fontSize: "32px",
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              marginRight: "1rem",
            }}
            className="request-btn"
            onClick={closeAddPost}
          >
            X
          </button>
        </div>

        <input
          type="text"
          placeholder="title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <div>
          {Array.from({ length: paragraphs }, (_, index) => {
            return (
              <textarea
                key={index}
                rows={15}
                columns={15}
                type="text"
                placeholder="paragraph"
                value={newPost.paragraphs[index]}
                onChange={(e) => handleParagraphs(e, index)}
              />
            );
          })}

          <button onClick={() => setParagraphs(paragraphs + 1)}>
            Add Paragraph
          </button>
        </div>
        <input
          value={newPost.author}
          onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
          type="text"
          placeholder="author"
        />
        <label htmlFor="status"></label>
        <button
          onClick={() => {
            setPublished(!published);
            handleStatus();
          }}
        >
          {published ? "publish" : "draft"}
        </button>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            className="request-btn"
            onClick={() => {
              editMode ? handleUpdateRequest() : handleAddRequest();
            }}
          >
            {editMode ? "Edit Post" : "Add Post"}
          </button>

          <p>{error ? "Error, all the fields are mandatory." : null}</p>
        </div>
      </Dialog>
      <Dialog
        style={{ display: "flex", flexDirection: "column" }}
        onClose={handleSuccess}
        open={successOpen}
      >
        <p>successfully saved...</p>
        <button onClick={() => setSuccessOpen(false)}>X</button>
      </Dialog>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 4rem;

  .blogposts {
    margin: 0 auto;
    width: 90%;
    display: grid;
    column-gap: 1rem;
    row-gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
  }
  .post {
    min-height: 250px;
    max-height: 400px;
    background-color: #b70304;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    padding: 8px;
  }
  .btns {
    display: flex;
    justify-content: space-between;
    align-items: space-between;
  }
  .change {
    background-color: aquamarine;
    padding: 3px 30px;
    border: none;
    cursor: pointer;
  }
  .delete {
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
  }
  .add-post {
    font-size: 6rem;
    width: 9rem;
    height: 9rem;
    cursor: pointer;
  }
`;

export default Dashboard;
