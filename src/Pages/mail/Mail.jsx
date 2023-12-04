import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMailCall } from "../../context/mailContext/MailApiCalls";
import { MailContext } from "../../context/mailContext/MailContext";
import "./Mail.css";

let firstLoad = true;
let foundMail;

const Mail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { mails, dispatch } = useContext(MailContext);

  useEffect(() => {
    getMailCall(params.mailId, dispatch);
  }, [dispatch]);

  let [updatedMail, setUpdatedMail] = useState([]);
  if (mails && firstLoad) {
    foundMail = mails[0];
  }

  return !updatedMail ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="post">
      <div className="postTitleContainer">
        <h1 className="postTitle">Mails</h1>
      </div>
      <div className="postContainer">
        <div className="postLeft">
          <div className="postInfoItem">
            <span className="postInfoKey">Email: </span>
            <span className="postName">{foundMail?.email}</span>
          </div>
          <div className="postInfoItem">
            <span className="postInfoKey">Full Name: </span>
            <div className="postInfoValue">{foundMail?.name}</div>
          </div>
          <div className="postInfoItem">
            <span className="postInfoKey">Subject: </span>
            <div className="postInfoValue">{foundMail?.subject}</div>
          </div>
          <div className="postInfoItem">
            <span className="postInfoKey">Message: </span>
            <div className="postInfoValue">{foundMail?.message}</div>
          </div>
          <a className="link" href={`mailto:${foundMail?.email}?subject=Reply%20to%20"${foundMail?.subject}"&body=Hi%20${foundMail?.name},`}>
            <button className="newPostButton">Reply Mail</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Mail;
