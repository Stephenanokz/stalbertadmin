import React, { useState, useContext } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useNavigate } from "react-router-dom";
import { createGalleryImageCall } from "../../context/galleryImageContext/GalleryImageApiCalls";
import { GalleryImageContext } from "../../context/galleryImageContext/GalleryImageContext";
import "./NewGalleryImage.css";

const NewGalleryImage = () => {
  const [galleryImage, setGalleryImage] = useState(null);
  const { dispatch } = useContext(GalleryImageContext);
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState(0);
  const [img, setImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setGalleryImage({
      ...galleryImage,
      [e.target.name]: value,
    });
  };

  const handleSelect = (e) => {
    setGalleryImage({
      ...galleryImage,
      [e.target.name]: e.target.value,
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
            setGalleryImage((prev) => {
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
    createGalleryImageCall(galleryImage, dispatch);
    return navigate("/galleryimages");
  };

  return (
    <div className="newPost">
      {isUploading && <div className="uploading">Uploading Image(s)...</div>}
      <h1 className="addPostTitle">New Gallery Image</h1>
      <form className="addPostForm">
        <div className="addPostFormInputs">
          <label>Image Title</label>
          <input
            name="title"
            type="text"
            placeholder="Image Title Here"
            onChange={handleChange}
          />
          <label>Category</label>
          <select name="category" onChange={handleSelect}>
            <option value="sisters">Sisters</option>
            <option value="education">Education</option>
            <option value="medical">Medical</option>
            <option value="social">Social</option>
            <option value="women devt">Women Empowerment</option>
            <option value="comm devt">Community Development</option>
          </select>
          {/* <label>Content</label>
          <input
            name="desc"
            type="text"
            placeholder="Image Description"
            onChange={handleChange}
          /> */}
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

export default NewGalleryImage;
