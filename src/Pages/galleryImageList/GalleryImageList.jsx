import React, { useState } from "react";
import "./GalleryImageList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GalleryImageContext } from "../../context/galleryImageContext/GalleryImageContext";
import {
  deleteGalleryImageCall,
  getGalleryImagesCall,
} from "../../context/galleryImageContext/GalleryImageApiCalls";

const GalleryImageList = () => {
  const { galleryImages, dispatch } = useContext(GalleryImageContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      await getGalleryImagesCall(dispatch);
      setIsLoading(false);
    };
    fetch();
  }, [dispatch]);

  const deleteHandler = (id) => {
    deleteGalleryImageCall(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "galleryImage",
      headerName: "Image",
      width: 500,
      renderCell: (params) => {
        return (
          <div className="productListProduct">
            <img
              src={
                params.row.img ||
                "https://payload.cargocollective.com/1/24/788943/14047332/cyan_255.png"
              }
              alt=""
              className="productListImage"
            />
            {params.row.title}
          </div>
        );
      },
    },
    // { field: "desc", headerName: "Description", width: 200 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/galleryimage/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => deleteHandler(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return isLoading ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="productList">
      <div className="postTitleContainer">
        <h1 className="postTitle">Gallery Images</h1>
        <Link to="/newgalleryimage">
          <button className="addPostButton">Create</button>
        </Link>
      </div>
      <div className="table">
        {galleryImages.length == 0 ? (
          <div className="notFound">
            <span>No image found!</span>
            <Link to="/newgalleryimage">
              <button className="addPostButton">Create new</button>
            </Link>
          </div>
        ) : (
          <DataGrid
            rows={galleryImages}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(r) => r._id}
          />
        )}
      </div>
    </div>
  );
};

export default GalleryImageList;
