import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./components/AppBar.jsx";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import AddCourse from "./components/AddCourse.jsx";
import Courses from "./components/Courses.jsx";
import Course from "./components/Course.jsx";
import Landing from "./components/Landing.jsx";
import { RecoilRoot, useSetRecoilState } from "recoil";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "./config.js";
import { userState } from "./store/atoms/user.js";

function App() {
  return (
    <RecoilRoot>
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "white" }}
      >
        <Router>
          <AppBar />
          <InitUser />
          <Routes>
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;
