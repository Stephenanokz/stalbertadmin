import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { PostContextProvider } from "./context/postContext/PostContext";
import { PersonnelContextProvider } from "./context/personnelContext/PersonnelContext";
import { GalleryImageContextProvider } from "./context/galleryImageContext/GalleryImageContext";
import { CarouselImageContextProvider } from "./context/carouselImageContext/CarouselImageContext";
import { AboutContextProvider } from "./context/aboutContext/AboutContext";
import { MailContextProvider } from "./context/mailContext/MailContext";
import { AchievementContextProvider } from "./context/achievementContext/AchievementContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <PersonnelContextProvider>
          <GalleryImageContextProvider>
            <CarouselImageContextProvider>
              <AboutContextProvider>
                <MailContextProvider>
                  <AchievementContextProvider>
                    <App />
                  </AchievementContextProvider>
                </MailContextProvider>
              </AboutContextProvider>
            </CarouselImageContextProvider>
          </GalleryImageContextProvider>
        </PersonnelContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
