import { useEffect, useState } from "react";
import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config.js";

function Courses() {
  const [courses, setCourses] = useState([]);

  const init = async () => {
    const response = await axios.get(`${BASE_URL}/admin/courses`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setCourses(response.data.courses);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}

export function Course({ course }) {
  const navigate = useNavigate();
  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
      }}
    >
      <Typography variant="h5" textAlign={"center"}>
        {course.title}
      </Typography>
      <Typography variant="subtitle1" textAlign={"center"}>
        {course.description}
      </Typography>
      <Typography variant="subtitle1" textAlign={"center"}>
        {course.price}
      </Typography>
      <img src={course.imageLink} style={{ width: 300 }}></img>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          variant="containted"
          size="large"
          onClick={() => {
            navigate("/course/" + course._id);
          }}
        >
          Edit
        </Button>
      </div>
    </Card>
  );
}

export default Courses;
