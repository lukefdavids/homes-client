import { Outlet, Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Register } from "./auth/Register.jsx";
import { Login } from "./auth/Login.jsx";
import { HomesList } from "./Homes/HomesList.jsx";
import { YourHome } from "./Homes/YourHome.jsx";
import { CreateHome } from "./Homes/CreateHome.jsx";
import { EditHome } from "./Homes/EditHome.jsx";
import { Favorites } from "./Favorites.jsx";
import { IndividualHome } from "./Homes/IndividualHome.jsx";
import { ListingAgents } from "./ListingAgents.jsx";
import { NavBar } from "./nav/Navbar.jsx";
import { YourProfile } from "./Profile/Profile.jsx";
import { EditProfile } from "./Profile/EditProfile.jsx";

const ApplicationViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar /> <Outlet />
          </>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route index element={<HomesList />} />
        <Route path=":homeId" element={<IndividualHome />} />
        <Route path="agents" element={<ListingAgents />} />
      </Route>

      <Route path="/" element={<Authorized />}>
        <Route path="favorites" element={<Favorites />} />
        <Route path="your-profile" element={<YourProfile />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="list-your-home" element={<CreateHome />} />
        <Route path="your-home" element={<YourHome />} />
        <Route path="edit-home" element={<EditHome />} />
      </Route>
    </Routes>
  );
};

export default ApplicationViews;
