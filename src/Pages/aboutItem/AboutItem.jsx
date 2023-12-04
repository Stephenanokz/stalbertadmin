import React, { useState, useContext, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAboutItemCall,
  updateAboutItemCall,
} from "../../context/aboutContext/AboutApiCalls";
import { AboutContext } from "../../context/aboutContext/AboutContext";
import "./AboutItem.css";

let firstLoad = true;
let foundAboutItem;

const AboutItem = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { aboutItem, dispatch } = useContext(AboutContext);

  useEffect(() => {
    getAboutItemCall(params.aboutId, dispatch);
  }, [dispatch]);

  console.log(aboutItem);

  let [updatedAboutItem, setUpdatedAboutItem] = useState([]);
  if (aboutItem && firstLoad) {
    foundAboutItem = aboutItem;
    updatedAboutItem = foundAboutItem;
  }

  const [isDone, setIsDone] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    firstLoad = false;
    const value = e.target.value;
    setUpdatedAboutItem({ ...updatedAboutItem, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    firstLoad = false;
    setUpdatedAboutItem({
      ...updatedAboutItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleChooseImage = (e) => {
    firstLoad = false;
    setImg(e.target.files[0]);
    setUpdatedAboutItem({
      ...updatedAboutItem,
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
            const imagePath = downloadURL.slice(75);
            const optimizedImgUrl = `${
              import.meta.env.VITE_IMAGEKIT_BASEURL
            }${imagePath}`;
            setUpdatedAboutItem((prev) => {
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
    const updateAboutItem = async () => {
      await updateAboutItemCall(updatedAboutItem, dispatch);
      setIsDone(true);
    };
    updateAboutItem();
    // window.location.reload();
    // return navigate(`/galleryimages`);
    // getPostCall(params.postId, dispatch);
  };

  return (
    <div className="post">
      <div className="postTitleContainer">
        <h1 className="postTitle">School Info</h1>
      </div>
      <div className="postContainer">
        <div className="postLeft">
          <h2 className="groupTitle">Home Page Info</h2>
          <div className="postInfoItem">
            <span className="postInfoKey">Welcome Text: </span>
            <span className="postName">{foundAboutItem?.welcomeText}</span>
          </div>
          {foundAboutItem?.schoolImage && (
            <div className="postInfoItem">
              <span className="postInfoKey">School Image: </span>
              <div className="postInfoValue img">
                <img
                  className="postImg image"
                  src={foundAboutItem?.schoolImage}
                  alt=""
                />
              </div>
            </div>
          )}
          <div className="postInfoItem">
            <span className="postInfoKey">Principal Quote: </span>
            <span className="postName">{foundAboutItem?.principalQuote}</span>
          </div>
          {foundAboutItem?.principalImgHome && (
            <div className="postInfoItem">
              <span className="postInfoKey">Principal Image: </span>
              <div className="postInfoValue img">
                <img
                  className="postImg image"
                  src={foundAboutItem?.principalImgHome}
                  alt=""
                />
              </div>
            </div>
          )}
          <div className="postInfoItem">
            <span className="postInfoKey">Principal Title: </span>
            <span className="postName">
              {foundAboutItem?.principalTitleHome}
            </span>
          </div>
          <h2 className="groupTitle">About Page Info</h2>
          <div className="postInfoItem">
            <span className="postInfoKey">Principal Desc: </span>
            <span className="postName">{foundAboutItem?.principalDesc}</span>
          </div>
          {foundAboutItem?.principalImgAbout && (
            <div className="postInfoItem">
              <span className="postInfoKey">Principal Image: </span>
              <div className="postInfoValue img">
                <img
                  className="postImg image"
                  src={foundAboutItem?.principalImgAbout}
                  alt=""
                />
              </div>
            </div>
          )}
          <div className="postInfoItem">
            <span className="postInfoKey">Principal Name: </span>
            <span className="postName">{foundAboutItem?.principalName}</span>
          </div>
          <div className="postInfoItem">
            <span className="postInfoKey">Principal Title: </span>
            <span className="postName">{foundAboutItem?.principalTitle}</span>
          </div>
          {foundAboutItem?.schoolImageLg && (
            <div className="postInfoItem">
              <span className="postInfoKey">School Image (Large): </span>
              <div className="postInfoValue img">
                <img
                  className="postImg image"
                  src={foundAboutItem?.schoolImageLg}
                  alt=""
                />
              </div>
            </div>
          )}
          {foundAboutItem?.schoolImageSmT && (
            <div className="postInfoItem">
              <span className="postInfoKey">School Image (Small 01): </span>
              <div className="postInfoValue img">
                <img
                  className="postImg image"
                  src={foundAboutItem?.schoolImageSmT}
                  alt=""
                />
              </div>
            </div>
          )}
          {foundAboutItem?.schoolImageSmB && (
            <div className="postInfoItem">
              <span className="postInfoKey">School Image (Small 02): </span>
              <div className="postInfoValue img">
                <img
                  className="postImg image"
                  src={foundAboutItem?.schoolImageSmB}
                  alt=""
                />
              </div>
            </div>
          )}
          <div className="postInfoItem">
            <span className="postInfoKey">About School: </span>
            <span className="postName">{foundAboutItem?.desc}</span>
          </div>
          <div className="postInfoItem">
            <span className="postInfoKey">Our Mission: </span>
            <span className="postName">{foundAboutItem?.mission}</span>
          </div>
          {foundAboutItem?.missionImg && (
            <div className="postInfoItem">
              <span className="postInfoKey">Mission Image: </span>
              <div className="postInfoValue img">
                <img
                  className="postImg image"
                  src={foundAboutItem?.missionImg}
                  alt=""
                />
              </div>
            </div>
          )}
          <div className="postInfoItem">
            <span className="postInfoKey">Our Vision: </span>
            <span className="postName">{foundAboutItem?.vision}</span>
          </div>
          {foundAboutItem?.visionImg && (
            <div className="postInfoItem">
              <span className="postInfoKey">Vision Image: </span>
              <div className="postInfoValue img">
                <img
                  className="postImg image"
                  src={foundAboutItem?.visionImg}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
        <div className="postRight">
          <form className="postForm">
            <div className="postFormInputs">
              <h2 className="groupTitle">Home Page Info</h2>
              <label>Welcome Text</label>
              <input
                type="text"
                placeholder={foundAboutItem?.welcomeText}
                name="welcomeText"
                onChange={handleChange}
              />
              <label>Principal Quote</label>
              <input
                type="text"
                placeholder={foundAboutItem?.principalQuote}
                name="principalQuote"
                onChange={handleChange}
              />
              <label>Principal Title</label>
              <input
                type="text"
                placeholder={foundAboutItem?.principalTitleHome}
                name="principalTitleHome"
                onChange={handleChange}
              />
              <h2 className="groupTitle">About Page Info</h2>
              <label>Principal Description</label>
              <textarea
                name="principalDesc"
                className="postInput"
                placeholder={foundAboutItem?.principalDesc}
                cols="30"
                rows="10"
                onChange={handleChange}
              ></textarea>
              <label>Principal Name</label>
              <input
                type="text"
                placeholder={foundAboutItem?.principalName}
                name="principalName"
                onChange={handleChange}
              />
              <label>Principal Title</label>
              <input
                type="text"
                placeholder={foundAboutItem?.principalTitle}
                name="principalTitle"
                onChange={handleChange}
              />
              <label>School Description</label>
              <textarea
                name="desc"
                className="postInput"
                placeholder={foundAboutItem?.desc}
                cols="30"
                rows="10"
                onChange={handleChange}
              ></textarea>
              <label>Mission</label>
              <input
                type="text"
                placeholder={foundAboutItem?.mission}
                name="mission"
                onChange={handleChange}
              />
              <label>Vision</label>
              <input
                type="text"
                placeholder={foundAboutItem?.vision}
                name="vision"
                onChange={handleChange}
              />
              <label>Image</label>
              <input type="file" id="img" name="img" />
            </div>
            <button className="newPostButton">Upload</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutItem;
