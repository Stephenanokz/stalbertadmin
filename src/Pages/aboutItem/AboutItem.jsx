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

  const [schoolImage, setSchoolImage] = useState(null);
  const [principalImgHome, setPrincipalImgHome] = useState(null);
  const [principalImgAbout, setPrincipalImgAbout] = useState(null);
  const [schoolImageLg, setSchoolImageLg] = useState(null);
  const [schoolImageSmT, setSchoolImageSmT] = useState(null);
  const [schoolImageSmB, setSchoolImageSmB] = useState(null);
  const [missionImg, setMissionImg] = useState(null);
  const [visionImg, setVisionImg] = useState(null);

  const [imageChosen, setImageChosen] = useState(false);

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

  const handleChooseSchoolImage = (e) => {
    firstLoad = false;
    setSchoolImage(e.target.files[0]);
    setImageChosen(true);
    setUpdatedAboutItem({
      ...updatedAboutItem,
    });
  };

  const handleChoosePrincipalImgHome = (e) => {
    firstLoad = false;
    setPrincipalImgHome(e.target.files[0]);
    setImageChosen(true);
    setUpdatedAboutItem({
      ...updatedAboutItem,
    });
  };

  const handleChoosePrincipalImgAbout = (e) => {
    firstLoad = false;
    setPrincipalImgAbout(e.target.files[0]);
    setImageChosen(true);
    setUpdatedAboutItem({
      ...updatedAboutItem,
    });
  };

  const handleChooseSchoolImageLg = (e) => {
    firstLoad = false;
    setSchoolImageLg(e.target.files[0]);
    setImageChosen(true);
    setUpdatedAboutItem({
      ...updatedAboutItem,
    });
  };

  const handleChooseSchoolImageSmT = (e) => {
    firstLoad = false;
    setSchoolImageSmT(e.target.files[0]);
    setImageChosen(true);
    setUpdatedAboutItem({
      ...updatedAboutItem,
    });
  };

  const handleChooseSchoolImageSmB = (e) => {
    firstLoad = false;
    setSchoolImageSmB(e.target.files[0]);
    setImageChosen(true);
    setUpdatedAboutItem({
      ...updatedAboutItem,
    });
  };

  const handleChooseMissionImg = (e) => {
    firstLoad = false;
    setMissionImg(e.target.files[0]);
    setImageChosen(true);
    setUpdatedAboutItem({
      ...updatedAboutItem,
    });
  };

  const handleChooseVisionImg = (e) => {
    firstLoad = false;
    setVisionImg(e.target.files[0]);
    setImageChosen(true);
    setUpdatedAboutItem({
      ...updatedAboutItem,
    });
  };

  const upload = (items) => {
    setIsUploading(true);
    items.forEach((item) => {
      console.log(item)
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/imgs/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Upload is " + progress + "% completed.");
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
    upload([
      { file: schoolImage, label: "schoolImage" },
      { file: principalImgHome, label: "principalImgHome" },
      { file: principalImgAbout, label: "principalImgAbout" },
      { file: schoolImageLg, label: "schoolImageLg" },
      { file: schoolImageSmT, label: "schoolImageSmT" },
      { file: schoolImageSmB, label: "schoolImageSmB" },
      { file: missionImg, label: "missionImg" },
      { file: visionImg, label: "visionImg" },
    ]);
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

  return !aboutItem ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="post">
      <div className="postTitleContainer">
        <h1 className="postTitle">School Info</h1>
      </div>
      {isUploading && <div className="uploading">Uploading Image(s)...</div>}
      {isDone && <div className="uploading">Updated!. Please refresh page</div>}
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
              <label htmlFor="schoolImage">School Image</label>
              <input
                type="file"
                id="schoolImage"
                name="schoolImage"
                onChange={handleChooseSchoolImage}
              />
              <label>Principal Quote</label>
              <input
                type="text"
                placeholder={foundAboutItem?.principalQuote}
                name="principalQuote"
                onChange={handleChange}
              />
              <label htmlFor="principalImgHome">Principal Image</label>
              <input
                type="file"
                id="principalImgHome"
                name="principalImgHome"
                onChange={handleChoosePrincipalImgHome}
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
              <label htmlFor="principalImgAbout">Principal Image</label>
              <input
                type="file"
                id="principalImgAbout"
                name="principalImgAbout"
                onChange={handleChoosePrincipalImgAbout}
              />
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
              <label htmlFor="schoolImageLg">School Image (Large)</label>
              <input
                type="file"
                id="schoolImageLg"
                name="schoolImageLg"
                onChange={handleChooseSchoolImageLg}
              />
              <label htmlFor="schoolImageSmT">School Image (Small 01)</label>
              <input
                type="file"
                id="schoolImageSmT"
                name="schoolImageSmT"
                onChange={handleChooseSchoolImageSmT}
              />
              <label htmlFor="schoolImageSmB">School Image (Small 02)</label>
              <input
                type="file"
                id="schoolImageSmB"
                name="schoolImageSmB"
                onChange={handleChooseSchoolImageSmB}
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
              <label htmlFor="missionImg">Mission Image</label>
              <input
                type="file"
                id="missionImg"
                name="missionImg"
                onChange={handleChooseMissionImg}
              />
              <label>Vision</label>
              <input
                type="text"
                placeholder={foundAboutItem?.vision}
                name="vision"
                onChange={handleChange}
              />
              <label htmlFor="visionImg">Vision Image</label>
              <input
                type="file"
                id="visionImg"
                name="visionImg"
                onChange={handleChooseVisionImg}
              />
            </div>
            {!imageChosen || uploaded >= 1 ? (
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

export default AboutItem;
