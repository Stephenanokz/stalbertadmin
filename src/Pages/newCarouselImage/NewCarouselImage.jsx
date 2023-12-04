import React, { useState, useContext } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useNavigate } from "react-router-dom";
import { createCarouselImageCall } from "../../context/carouselImageContext/CarouselImageApiCalls";
import { CarouselImageContext } from "../../context/carouselImageContext/CarouselImageContext";
import "./NewCarouselImage.css";

const NewCarouselImage = () => {
  const [carouselImage, setCarouselImage] = useState(null);
  const { dispatch } = useContext(CarouselImageContext);
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState(0);
  const [img, setImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setCarouselImage({
      ...carouselImage,
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
            setCarouselImage((prev) => {
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
    createCarouselImageCall(carouselImage, dispatch);
    return navigate("/carouselimages");
  };

  return (
    <div className="newPost">
      {isUploading && <div className="uploading">Uploading Image(s)...</div>}
      <h1 className="addPostTitle">New Carousel Image</h1>
      <form className="addPostForm">
        <div className="addPostFormInputs">
          <label>Image Title</label>
          <input
            name="title"
            type="text"
            placeholder="Image Title Here"
            onChange={handleChange}
          />
          <label>Subtitle</label>
          <input
            name="subtitle"
            type="text"
            placeholder="Image Subtitle"
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

export default NewCarouselImage;
