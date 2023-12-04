import Sidebar from "./Components/Sidebar/Sidebar";
import Topbar from "./Components/topbar/Topbar";
import Home from "./Pages/home/Home";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PostList from "./Pages/postList/PostList";
import Post from "./Pages/post/Post";
import NewPost from "./Pages/newPost/NewPost";
import Login from "./Pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";
import Logout from "./Pages/logout/Logout";
import GalleryImageList from "./Pages/galleryImageList/GalleryImageList";
import NewGalleryImage from "./Pages/newGalleryImage/NewGalleryImage";
import GalleryImage from "./Pages/galleryImage/GalleryImage";
import CarouselImageList from "./Pages/carouselImageList/CarouselImageList";
import NewCarouselImage from "./Pages/newCarouselImage/NewCarouselImage";
import CarouselImage from "./Pages/carouselImage/CarouselImage";
import PersonnelList from "./Pages/personnelList/PersonnelList";
import Personnel from "./Pages/personnel/Personnel";
import NewPersonnel from "./Pages/newPersonnel/NewPersonnel";
import AboutItem from "./Pages/aboutItem/AboutItem";
import MailList from "./Pages/mailList/MailList";
import AchievementList from "./Pages/achievementList/AchievementList";
import NewAchievement from "./Pages/newAchievement/NewAchievement";
import Achievement from "./Pages/achievement/Achievement";
import Mail from "./Pages/mail/Mail";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
      {user && <Topbar />}
      <div className={!user ? "container shrink" : "container"}>
        {user && <Sidebar />}
        <Routes>
          <Route
            exact
            path="/"
            element={!user ? <Navigate to="/login" /> : <Home />}
          />

          {user && (
            <>
              <Route exact path="/schoolinfo/:aboutId" element={<AboutItem />} />
              <Route exact path="/posts" element={<PostList />} />
              <Route exact path="/post/:postId" element={<Post />} />
              <Route exact path="/newpost" element={<NewPost />} />
              <Route exact path="/achievements" element={<AchievementList />} />
              <Route exact path="/newachievement" element={<NewAchievement />} />
              <Route exact path="/achievement/:achievementId" element={<Achievement />} />
              <Route
                exact
                path="/galleryimages"
                element={<GalleryImageList />}
              />
              <Route
                exact
                path="/galleryimage/:galleryimageId"
                element={<GalleryImage />}
              />
              <Route
                exact
                path="/newgalleryimage"
                element={<NewGalleryImage />}
              />
              <Route
                exact
                path="/personnels"
                element={<PersonnelList />}
              />
              <Route
                exact
                path="/personnel/:personnelId"
                element={<Personnel />}
              />
              <Route
                exact
                path="/newpersonnel"
                element={<NewPersonnel />}
              />
              <Route
                exact
                path="/carouselimages"
                element={<CarouselImageList />}
              />
              <Route
                exact
                path="/carouselimage/:carouselimageId"
                element={<CarouselImage />}
              />
              <Route
                exact
                path="/newcarouselimage"
                element={<NewCarouselImage />}
              />
              <Route
                exact
                path="/mails"
                element={<MailList />}
              />
              <Route
                exact
                path="/mail/:mailId"
                element={<Mail />}
              />
              <Route exact path="/logout" element={<Logout />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
