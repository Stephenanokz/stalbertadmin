import React, { useState } from "react";
import "./PostList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PostContext } from "../../context/postContext/PostContext";
import {
  deletePostCall,
  getPostsCall,
} from "../../context/postContext/PostApiCalls";

const PostList = () => {
  const { posts, dispatch } = useContext(PostContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      await getPostsCall(dispatch);
      setIsLoading(false);
    };
    fetch();
  }, [dispatch]);

  const deleteHandler = (id) => {
    deletePostCall(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "post",
      headerName: "Post",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="productListProduct">
            <img
              src={
                params.row.imgs[0] ||
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
    { field: "author", headerName: "Author", width: 200 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/post/" + params.row._id}>
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
        <h1 className="postTitle">News and Events</h1>
        <Link to="/newpost">
          <button className="addPostButton">Create</button>
        </Link>
      </div>
      <div className="table">
        {posts.length == 0 ? (
          <div className="notFound">
            <span>No news found!</span>
            <Link to="/newpost">
              <button className="addPostButton">Create post</button>
            </Link>
          </div>
        ) : (
          <DataGrid
            rows={posts}
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

export default PostList;
