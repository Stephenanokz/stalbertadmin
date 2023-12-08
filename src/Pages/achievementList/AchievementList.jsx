import { useContext, useEffect, useState } from "react";
import "./AchievementList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AchievementContext } from "../../context/achievementContext/AchievementContext";
import {
  deleteAchievementCall,
  getAchievementsCall,
} from "../../context/achievementContext/AchievementApiCalls";

const AchievementList = () => {
  const { achievements, dispatch } = useContext(AchievementContext);
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      await getAchievementsCall(dispatch);
      setIsLoading(false);
    };
    fetch();
  }, [dispatch]);

  const deleteHandler = (id) => {
    deleteAchievementCall(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "achievement",
      headerName: "Achievement title",
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
    { field: "desc", headerName: "Description", width: 400 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/achievement/" + params.row._id}>
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
        <h1 className="postTitle">Achievements</h1>
        <Link to="/newachievement">
          <button className="addPostButton">Create</button>
        </Link>
      </div>
      <div className="table">
        {achievements.length == 0 ? (
          <div className="notFound">
            <span>No achievement found!</span>
            <Link to="/newachievement">
              <button className="addPostButton">Create new</button>
            </Link>
          </div>
        ) : (
          <DataGrid
            rows={achievements}
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

export default AchievementList;
