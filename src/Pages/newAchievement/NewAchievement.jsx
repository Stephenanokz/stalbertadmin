import React, { useState, useContext } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useNavigate } from "react-router-dom";
import { createAchievementCall } from "../../context/achievementContext/AchievementApiCalls";
import { AchievementContext } from "../../context/achievementContext/AchievementContext";
import "./NewAchievement.css";

const NewAchievement = () => {
  const [achievement, setAchievement] = useState(null);
  const { dispatch } = useContext(AchievementContext);
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState(0);
  const [img, setImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setAchievement({
      ...achievement,
      [e.target.name]: value,
    });
  };

  const upload = (items) => {
    setIsUploading(true);
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
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
            setAchievement((prev) => {
              return { ...prev, [item.label]: optimizedImgUrl };
            });
            setUploaded((prev) => prev + 1);
          });
          setIsUploading(false);
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: img, label: "img" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAchievementCall(achievement, dispatch);
    return navigate("/achievements");
  };

  return (
    <div className="newPost">
      {isUploading && <div className="uploading">Uploading Image(s)...</div>}
      <h1 className="addPostTitle">New Achievement</h1>
      <form className="addPostForm">
        <div className="addPostFormInputs">
          <label>Achievement Title</label>
          <input
            name="title"
            type="text"
            placeholder="Title Here"
            onChange={handleChange}
          />
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="Description"
            onChange={handleChange}
          />
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        {!img || uploaded === 1 ? (
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

export default NewAchievement;
