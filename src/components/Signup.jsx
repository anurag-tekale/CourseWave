import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user.js";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 150,
          marginBottom: 10,
        }}
      >
        <Typography variant={"h6"}>
          Welcome to Coursera. Sign up below
        </Typography>
      </div>
      <div style={{ padding: 10, display: "flex", justifyContent: "center" }}>
        <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            // e is basically the input value which the user will be entering in the input box and we're storing the value in setEmail & setPassword
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />
          <Button
            size={"large"}
            variant="contained"
            onClick={async () => {
              const response = await axios.post(`${BASE_URL}/admin/signup`, {
                username: email,
                password: password,
              });
              let data = response.data;
              localStorage.setItem("token", data.token);
              setUser({ userEmail: email, isLoading: false });
              navigate("/courses");
            }}
          >
            Sign up
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
