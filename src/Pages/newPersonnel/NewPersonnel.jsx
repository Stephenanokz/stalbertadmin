import React, { useState, useContext } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useNavigate } from "react-router-dom";
import { createPersonnelCall } from "../../context/personnelContext/PersonnelApiCalls";
import { PersonnelContext } from "../../context/personnelContext/PersonnelContext";
import "./NewPersonnel.css";

const NewPersonnel = () => {
  const [personnel, setPersonnel] = useState(null);
  const { dispatch } = useContext(PersonnelContext);
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState(0);
  const [img, setImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setPersonnel({
      ...personnel,
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
            setPersonnel((prev) => {
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
    createPersonnelCall(personnel, dispatch);
    return navigate("/personnels");
  };

  return (
    <div className="newPost">
      {isUploading && <div className="uploading">Uploading Image(s)...</div>}
      <h1 className="addPostTitle">New Personnel</h1>
      <form className="addPostForm">
        <div className="addPostFormInputs">
          <label>Staff Title</label>
          <input
            name="title"
            type="text"
            placeholder="Staff Title Here"
            onChange={handleChange}
          />
          <label>Full Name</label>
          <input
            name="fullName"
            type="text"
            placeholder="Staff Name"
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

export default NewPersonnel;
