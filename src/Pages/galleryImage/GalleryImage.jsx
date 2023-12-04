import React, { useState, useContext, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useParams, useNavigate } from "react-router-dom";
import {
  getGalleryImageCall,
  updateGalleryImageCall,
} from "../../context/galleryImageContext/GalleryImageApiCalls";
import { GalleryImageContext } from "../../context/galleryImageContext/GalleryImageContext";
import "./GalleryImage.css";

let firstLoad = true;
let foundGalleryImage;

const GalleryImage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { galleryImages, dispatch } = useContext(GalleryImageContext);

  useEffect(() => {
    getGalleryImageCall(params.galleryimageId, dispatch);
  }, [dispatch]);

  let [updatedGalleryImage, setUpdatedGalleryImage] = useState([]);
  if (galleryImages && firstLoad) {
    foundGalleryImage = galleryImages[0];
    updatedGalleryImage = foundGalleryImage;
  }

  const [isDone, setIsDone] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    firstLoad = false;
    const value = e.target.value;
    setUpdatedGalleryImage({ ...updatedGalleryImage, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    firstLoad = false;
    setUpdatedGalleryImage({
      ...updatedGalleryImage,
      [e.target.name]: e.target.value,
    });
  };

  const handleChooseImage = (e) => {
    firstLoad = false;
    setImg(e.target.files[0]);
    setUpdatedGalleryImage({
      ...updatedGalleryImage,
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
            setUpdatedGalleryImage((prev) => {
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
    const updateGalleryImage = async () => {
      await updateGalleryImageCall(updatedGalleryImage, dispatch);
      setIsDone(true);
    };
    updateGalleryImage();
    // window.location.reload();
    // return navigate(`/galleryimages`);
    // getPostCall(params.postId, dispatch);
  };

  return !updatedGalleryImage ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="post">
      {isUploading && <div className="uploading">Uploading Image(s)...</div>}
      {isDone && <div className="uploading">Updated!. Please refresh page</div>}
      <div className="postTitleContainer">
        <h1 className="postTitle">Gallery Images</h1>
      </div>
      <div className="postContainer">
        <div className="postLeft">
          <div className="postInfoItem">
            <span className="postInfoKey">Image Title: </span>
            <span className="postName">{foundGalleryImage?.title}</span>
          </div>
          <div className="postInfoItem">
            <span className="postInfoKey">Category: </span>
            <span className="postName">{foundGalleryImage?.category}</span>
          </div>
          {/* <div className="postInfoItem">
            <span className="postInfoKey">Descriptioin: </span>
            <div className="postInfoValue">{foundGalleryImage?.desc}</div>
          </div> */}
          {foundGalleryImage?.img && (
            <div className="postInfoItem">
              <span className="postInfoKey">Image: </span>
              <div className="postInfoValue img">
                <img
                  key={foundGalleryImage?.img}
                  className="postImg gimage"
                  src={foundGalleryImage?.img}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
        <div className="postRight">
          <form className="postForm">
            <div className="postFormInputs">
              <label>Image Title</label>
              <input
                type="text"
                placeholder={foundGalleryImage?.title}
                name="title"
                onChange={handleChange}
              />
              <label>Category</label>
              <select name="category" onChange={handleSelect}>
                <option value="academics">Academics</option>
                <option value="events">Events</option>
                <option value="facilities">Facilities</option>
              </select>
              {/* <label>Description</label>
              <textarea
                name="desc"
                className="postInput"
                placeholder={foundGalleryImage?.desc}
                cols="30"
                rows="10"
                onChange={handleChange}
              ></textarea> */}
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

export default GalleryImage;
