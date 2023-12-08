import React, { useState } from "react";
import "./PersonnelList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PersonnelContext } from "../../context/personnelContext/PersonnelContext";
import {
  deletePersonnelCall,
  getPersonnelsCall,
} from "../../context/personnelContext/PersonnelApiCalls";

const PersonnelList = () => {
  const { personnels, dispatch } = useContext(PersonnelContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      await getPersonnelsCall(dispatch);
      setIsLoading(false);
    };
    fetch();
  }, [dispatch]);

  const deleteHandler = (id) => {
    deletePersonnelCall(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "personnel",
      headerName: "Full Name",
      width: 300,
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
            {params.row.fullName}
          </div>
        );
      },
    },
    { field: "title", headerName: "Title", width: 250 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/personnel/" + params.row._id}>
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
        <h1 className="postTitle">Personnels</h1>
        <Link to="/newpersonnel">
          <button className="addPostButton">Create</button>
        </Link>
      </div>
      <div className="table">
        {personnels.length == 0 ? (
          <div className="notFound">
            <span>No personnel found!</span>
            <Link to="/newpersonnel">
              <button className="addPostButton">Create new</button>
            </Link>
          </div>
        ) : (
          <DataGrid
            rows={personnels}
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

export default PersonnelList;
