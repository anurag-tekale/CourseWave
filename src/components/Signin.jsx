import { Button, Card, TextField, Typography } from "@mui/material";
import { userState } from "../store/atoms/user";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { BASE_URL } from "../config";

function Signin() {
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
          Welcome to Coursera. Sign in below
        </Typography>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type="password"
          />
          <br />
          <br />
          <Button
            size={"large"}
            variant="contained"
            onClick={async () => {
              const response = await axios.post(
                `${BASE_URL}/admin/signin`,
                {
                  username: email,
                  password: password,
                },
                {
                  headers: {
                    "Content-type": "application/json",
                  },
                }
              );
              const data = response.data;
              localStorage.setItem("token", data.token);
              setUser({
                userEmail: email,
                isLoading: false,
              });
              navigate("/courses");
            }}
          >
            Sign in
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
