import React, { useState, useContext, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAchievementCall,
  updateAchievementCall,
} from "../../context/achievementContext/AchievementApiCalls";
import { AchievementContext } from "../../context/achievementContext/AchievementContext";
import "./Achievement.css";

let firstLoad = true;
let foundAchievement;

const Achievement = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { achievements, dispatch } = useContext(AchievementContext);

  useEffect(() => {
    getAchievementCall(params.achievementId, dispatch);
  }, [dispatch]);

  let [updatedAchievement, setUpdatedAchievement] = useState([]);
  if (achievements && firstLoad) {
    foundAchievement = achievements[0];
    updatedAchievement = foundAchievement;
  }

  const [isDone, setIsDone] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    firstLoad = false;
    const value = e.target.value;
    setUpdatedAchievement({
      ...updatedAchievement,
      [e.target.name]: value,
    });
  };

  const handleChooseImage = (e) => {
    firstLoad = false;
    setImg(e.target.files[0]);
    setUpdatedAchievement({
      ...updatedAchievement,
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
            setUpdatedAchievement((prev) => {
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
    const updateAchievement = async () => {
      await updateAchievementCall(updatedAchievement, dispatch);
      setIsDone(true);
    };
    updateAchievement();
    // window.location.reload();
    // return navigate(`/Achievements`);
    // getPostCall(params.postId, dispatch);
  };

  return !updatedAchievement ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="post">
      {isUploading && <div className="uploading">Uploading Image(s)...</div>}
      {isDone && <div className="uploading">Updated!. Please refresh page</div>}
      <div className="postTitleContainer">
        <h1 className="postTitle">Achievements</h1>
      </div>
      <div className="postContainer">
        <div className="postLeft">
          <div className="postInfoItem">
            <span className="postInfoKey">Achievement Title: </span>
            <span className="postName">{foundAchievement?.title}</span>
          </div>
          <div className="postInfoItem">
            <span className="postInfoKey">Description: </span>
            <div className="postInfoValue">{foundAchievement?.desc}</div>
          </div>
          {foundAchievement?.img && (
            <div className="postInfoItem">
              <span className="postInfoKey">Image: </span>
              <div className="postInfoValue img">
                <img
                  className="postImg cimage"
                  src={foundAchievement?.img}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
        <div className="postRight">
          <form className="postForm">
            <div className="postFormInputs">
              <label>Achievement Title</label>
              <input
                type="text"
                placeholder={foundAchievement?.title}
                name="title"
                onChange={handleChange}
              />
              <label>Description</label>
              <input
                type="text"
                placeholder={foundAchievement?.desc}
                name="desc"
                onChange={handleChange}
              />
              <label>Image</label>
              <input
                type="file"
                id="img"
                name="img"
                onChange={handleChooseImage}
              />
            </div>
            {!img || uploaded === 1 ? (
              <button className="newPostButton" onClick={handleSubmit}>
                Update
              </button>
            ) : (
              <button className="newPostButton" onClick={handleUpload}>
                Upload
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Achievement;
