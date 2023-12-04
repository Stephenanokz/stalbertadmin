import React, { useState, useContext, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPersonnelCall,
  updatePersonnelCall,
} from "../../context/personnelContext/PersonnelApiCalls";
import { PersonnelContext } from "../../context/personnelContext/PersonnelContext";
import "./Personnel.css";

let firstLoad = true;
let foundPersonnel;

const Personnel = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { personnels, dispatch } = useContext(PersonnelContext);

  useEffect(() => {
    getPersonnelCall(params.personnelId, dispatch);
  }, [dispatch]);

  let [updatedPersonnel, setUpdatedPersonnel] = useState([]);
  if (personnels && firstLoad) {
    foundPersonnel = personnels[0];
    updatedPersonnel = foundPersonnel;
  }

  const [isDone, setIsDone] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    firstLoad = false;
    const value = e.target.value;
    setUpdatedPersonnel({ ...updatedPersonnel, [e.target.name]: value });
  };

  const handleChooseImage = (e) => {
    firstLoad = false;
    setImg(e.target.files[0]);
    setUpdatedPersonnel({
      ...updatedPersonnel,
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
            setUpdatedPersonnel((prev) => {
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
    const updatePersonnel = async () => {
      await updatePersonnelCall(updatedPersonnel, dispatch);
      setIsDone(true);
    };
    updatePersonnel();
    // window.location.reload();
    // return navigate(`/Personnels`);
    // getPostCall(params.postId, dispatch);
  };

  return !updatedPersonnel ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="post">
      {isUploading && <div className="uploading">Uploading Image(s)...</div>}
      {isDone && <div className="uploading">Updated!. Please refresh page</div>}
      <div className="postTitleContainer">
        <h1 className="postTitle">Personnels</h1>
      </div>
      <div className="postContainer">
        <div className="postLeft">
          <div className="postInfoItem">
            <span className="postInfoKey">Staff Title: </span>
            <span className="postName">{foundPersonnel?.title}</span>
          </div>
          <div className="postInfoItem">
            <span className="postInfoKey">Full Name: </span>
            <span className="postName">{foundPersonnel?.fullName}</span>
          </div>
          {foundPersonnel?.img && (
            <div className="postInfoItem">
              <span className="postInfoKey">Image: </span>
              <div className="postInfoValue img">
                <img
                  key={foundPersonnel?.img}
                  className="postImg image"
                  src={foundPersonnel?.img}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
        <div className="postRight">
          <form className="postForm">
            <div className="postFormInputs">
              <label>Staff Title</label>
              <input
                type="text"
                placeholder={foundPersonnel?.title}
                name="title"
                onChange={handleChange}
              />
              <label>Full Name</label>
              <textarea
                name="fullName"
                className="postInput"
                placeholder={foundPersonnel?.fullName}
                cols="30"
                rows="10"
                onChange={handleChange}
              ></textarea>
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

export default Personnel;
