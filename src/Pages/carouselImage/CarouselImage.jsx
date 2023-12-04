import React, { useState, useContext, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCarouselImageCall,
  updateCarouselImageCall,
} from "../../context/carouselImageContext/CarouselImageApiCalls";
import { CarouselImageContext } from "../../context/carouselImageContext/CarouselImageContext";
import "./CarouselImage.css";

let firstLoad = true;
let foundCarouselImage;

const CarouselImage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { carouselImages, dispatch } = useContext(CarouselImageContext);

  useEffect(() => {
    getCarouselImageCall(params.carouselimageId, dispatch);
  }, [dispatch]);

  let [updatedCarouselImage, setUpdatedCarouselImage] = useState([]);
  if (carouselImages && firstLoad) {
    foundCarouselImage = carouselImages[0];
    updatedCarouselImage = foundCarouselImage;
  }

  const [isDone, setIsDone] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    firstLoad = false;
    const value = e.target.value;
    setUpdatedCarouselImage({
      ...updatedCarouselImage,
      [e.target.name]: value,
    });
  };

  const handleChooseImage = (e) => {
    firstLoad = false;
    setImg(e.target.files[0]);
    setUpdatedCarouselImage({
      ...updatedCarouselImage,
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
            setUpdatedCarouselImage((prev) => {
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
    const updateCarouselImage = async () => {
      await updateCarouselImageCall(updatedCarouselImage, dispatch);
      setIsDone(true);
    };
    updateCarouselImage();
    // window.location.reload();
    // return navigate(`/carouselimages`);
    // getPostCall(params.postId, dispatch);
  };

  return !updatedCarouselImage ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="post">
      {isUploading && <div className="uploading">Uploading Image(s)...</div>}
      {isDone && <div className="uploading">Updated!. Please refresh page</div>}
      <div className="postTitleContainer">
        <h1 className="postTitle">Carousel Images</h1>
      </div>
      <div className="postContainer">
        <div className="postLeft">
          <div className="postInfoItem">
            <span className="postInfoKey">Image Title: </span>
            <span className="postName">{foundCarouselImage?.title}</span>
          </div>
          <div className="postInfoItem">
            <span className="postInfoKey">Subtitle: </span>
            <div className="postInfoValue">{foundCarouselImage?.subtitle}</div>
          </div>
          {foundCarouselImage?.img && (
            <div className="postInfoItem">
              <span className="postInfoKey">Image: </span>
              <div className="postInfoValue img">
                <img
                  className="postImg cimage"
                  src={foundCarouselImage?.img}
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
                placeholder={foundCarouselImage?.title}
                name="title"
                onChange={handleChange}
              />
              <label>Subtitle</label>
              <input
                type="text"
                placeholder={foundCarouselImage?.subtitle}
                name="subtitle"
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

export default CarouselImage;
