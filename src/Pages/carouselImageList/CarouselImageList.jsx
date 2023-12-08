import React from "react";
import "./CarouselImageList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CarouselImageContext } from "../../context/carouselImageContext/CarouselImageContext";
import {
  deleteCarouselImageCall,
  getCarouselImagesCall,
} from "../../context/carouselImageContext/CarouselImageApiCalls";

const CarouselImageList = () => {
  const { carouselImages, dispatch } = useContext(CarouselImageContext);

  useEffect(() => {
    getCarouselImagesCall(dispatch);
  }, [dispatch]);

  const deleteHandler = (id) => {
    deleteCarouselImageCall(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "carouselImage",
      headerName: "Image Title",
      width: 250,
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
    { field: "subtitle", headerName: "Subtitle", width: 300 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/carouselimage/" + params.row._id}>
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

  return !carouselImages ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="productList">
      <div className="postTitleContainer">
        <h1 className="postTitle">Carousel Images</h1>
        <Link to="/newcarouselimage">
          <button className="addPostButton">Create</button>
        </Link>
      </div>
      <div className="table">
        {carouselImages.length == 0 ? (
          <div className="notFound">
            <span>No image found!</span>
            <Link to="/newcarouselimage">
              <button className="addPostButton">Create new</button>
            </Link>
          </div>
        ) : (
          <DataGrid
            rows={carouselImages}
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

export default CarouselImageList;
