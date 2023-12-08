import React, { useState } from "react";
import "./MailList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MailContext } from "../../context/mailContext/MailContext";
import {
  deleteMailCall,
  getMailsCall,
} from "../../context/mailContext/MailApiCalls";

const MailList = () => {
  const { mails, dispatch } = useContext(MailContext);
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      await getMailsCall(dispatch);
      setIsLoading(false);
    };
    fetch();
  }, [dispatch]);

  const deleteHandler = (id) => {
    deleteMailCall(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "mail",
      headerName: "Email",
      width: 250,
      renderCell: (params) => {
        return <div className="productListProduct">{params.row.email}</div>;
      },
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "subject", headerName: "Subject", width: 150 },
    { field: "message", headerName: "Message", width: 200 },
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/mail/" + params.row._id}>
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
        <h1 className="postTitle">Contact Mails</h1>
      </div>
      <div className="table">
        {mails.length == 0 ? (
          <div className="notFound">
            <span>No contact mail found!</span>
          </div>
        ) : (
          <DataGrid
            rows={mails}
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

export default MailList;
