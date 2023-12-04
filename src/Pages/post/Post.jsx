import React, { useState, useContext, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useParams } from "react-router-dom";
import {
  getPostCall,
  updatePostCall,
} from "../../context/postContext/PostApiCalls";
import { PostContext } from "../../context/postContext/PostContext";
import "./Post.css";

let firstLoad = true;
let foundPost;

const Post = () => {
  const params = useParams();
  const { posts, dispatch } = useContext(PostContext);

  useEffect(() => {
    getPostCall(params.postId, dispatch);
  }, [dispatch]);

  let [updatedPost, setUpdatedPost] = useState([]);
  if (posts && firstLoad) {
    foundPost = posts[0];
    updatedPost = foundPost;
  }

  const [isDone, setIsDone] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [imgs, setImgs] = useState([]);

  const handleChange = (e) => {
    firstLoad = false;
    const value = e.target.value;
    setUpdatedPost({ ...updatedPost, [e.target.name]: value });
  };

  const handleChooseImage = (e) => {
    firstLoad = false;
    setImgs(Array.from(e.target.files));
    setUpdatedPost({
      ...updatedPost,
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
    setUpdatedPost((prev) => {
      return { ...prev, imgs: uploadedImgs };
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload(imgs.map((img) => ({ file: img })));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatePost = async () => {
      await updatePostCall(updatedPost, dispatch);
      setIsDone(true);
    };
    updatePost();
    // window.location.reload();
    // getPostCall(params.postId, dispatch);
    // return navigate(`/posts`);
  };

  return !updatedPost ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="post">
      {isUploading && <div className="uploading">Uploading Image(s)...</div>}
      {isDone && <div className="uploading">Updated!. Please refresh page</div>}
      <div className="postTitleContainer">
        <h1 className="postTitle">News and Events</h1>
      </div>
      <div className="postContainer">
        <div className="postLeft">
          <div className="postInfoItem">
            <span className="postInfoKey">Post Title: </span>
            <span className="postName">{foundPost?.title}</span>
          </div>
          <div className="postInfoItem">
            <span className="postInfoKey">Content: </span>
            <div className="postInfoValue">{foundPost?.body}</div>
          </div>
          {foundPost?.imgs && (
            <div className="postInfoItem">
              <span className="postInfoKey">Post Image: </span>
              <div className="postInfoValue img">
                {foundPost?.imgs?.map((img) => (
                  <img key={img} className="postImg" src={img} alt="" />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="postRight">
          <form className="postForm">
            <div className="postFormInputs">
              <label>Post Title</label>
              <input
                type="text"
                placeholder={foundPost?.title}
                name="title"
                onChange={handleChange}
              />
              <label>Content</label>
              <textarea
                name="body"
                className="postInput"
                placeholder={foundPost?.body}
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
                onChange={handleChooseImage}
              />
            </div>
            {imgs.length === 0 || uploaded === imgs.length ? (
              <button className="postButton" onClick={handleSubmit}>
                Update
              </button>
            ) : (
              <button className="postButton" onClick={handleUpload}>
                Upload
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
