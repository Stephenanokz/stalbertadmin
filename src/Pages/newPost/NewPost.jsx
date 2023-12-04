import React, { useState, useContext } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useNavigate } from "react-router-dom";
import { createPostCall } from "../../context/postContext/PostApiCalls";
import { PostContext } from "../../context/postContext/PostContext";
import "./NewPost.css";

const NewPost = () => {
  const [post, setPost] = useState(null);
  const { dispatch } = useContext(PostContext);
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [imgs, setImgs] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setPost({
      ...post,
      [e.target.name]: value,
    });
  };

  const upload = (items) => {
    setIsUploading(true);
    const uploadedImgs = [];
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.file.name;
      const storageRef = ref(storage, `/imgs/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // console.log("Upload is " + progress + "% completed.");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const imagePath = downloadURL.slice(38);
            const optimizedImgUrl = `${
              import.meta.env.VITE_IMAGEKIT_BASEURL
            }${imagePath}`;
            uploadedImgs.push(optimizedImgUrl);
            setUploaded((prev) => prev + 1);
          });
          setIsUploading(false);
        }
      );
    });
    setPost((prev) => {
      return { ...prev, imgs: uploadedImgs };
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload(imgs.map((img) => ({ file: img })));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostCall(post, dispatch);
    return navigate("/posts");
  };

  return (
    <div className="newPost">
      {isUploading && <div className="uploading">Uploading Image(s)...</div>}
      <h1 className="addPostTitle">New Post</h1>
      <form className="addPostForm">
        <div className="addPostFormInputs">
          <label>Post Title</label>
          <input
            name="title"
            type="text"
            placeholder="Post Title"
            onChange={handleChange}
          />
          <label>Content</label>
          <textarea
            name="body"
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
          <label>Image</label>
          <input
            type="file"
            id="imgs"
            name="imgs"
            multiple
            onChange={(e) => setImgs(Array.from(e.target.files))}
          />
        </div>
        {imgs.length === 0 || uploaded === imgs.length ? (
          <button className="newPostButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="newPostButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
};

export default NewPost;
