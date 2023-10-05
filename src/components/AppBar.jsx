import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/atoms/user.js";
import { userEmailState } from "../store/selectors/userEmail";
import { Loading } from "./Loading";
import { Lock } from "@mui/icons-material";

function AppBar() {
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);

  if (userLoading) {
    return <Loading />;
  }

  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div
          style={{ marginLeft: 10, cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography variant={"h6"}>Coursera</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button
                onClick={() => {
                  navigate("/addcourse");
                }}
              >
                Add course
              </Button>
            </div>

            <div style={{ marginRight: 10 }}>
              <Button
                onClick={() => {
                  navigate("/courses");
                }}
              >
                Courses
              </Button>
            </div>

            <Button
              variant={"contained"}
              onClick={() => {
                localStorage.setItem("token", null);
                setUser({
                  userEmail: null,
                  isLoading: false,
                });
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div
          style={{ marginLeft: 10, cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography variant={"h6"}>Coursera</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 20 }}>
            <Button
              variant={"text"}
              startIcon={<Lock />}
              onClick={() => {
                navigate("/signin");
              }}
            >
              Login
            </Button>
          </div>
          <div>
            <Button
              variant={"contained"}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up For Free
            </Button>
          </div>
        </div>
      </div>
    );
}

export default AppBar;
