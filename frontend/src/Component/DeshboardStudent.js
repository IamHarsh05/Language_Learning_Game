import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import quiz1 from "../assets/quiz1.png";
import quiz2 from "../assets/quiz2.png";
import quiz3 from "../assets/quiz3.png";
import quiz4 from "../assets/quiz4.png";
import quiz5 from "../assets/quiz5.png";
import quiz6 from "../assets/quiz6.png";
import quiz7 from "../assets/quiz7.png";

function Deshboardstudent({ setsonequiz, isAuth, setIsAuth }) {
  const textcolor = [
    "text-primary",
    "text-success",
    "text-danger",
    "text-warning",
  ];
  const navigate = useNavigate();
  const [response, setresponse] = useState([]);
  const [message, setmessage] = useState("");
  const img = [quiz1, quiz2, quiz3, quiz4, quiz5, quiz6, quiz7];

  useEffect(() => {
    async function req() {
      const res = await fetch(process.env.REACT_APP_S_DESHBOARD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          useremail: localStorage.getItem("email"),
        }),
      });

      const data = await res.json();
      if (data.response) setresponse(data.response);
      if (data.message) setmessage(data.message);
      if (data.error) {
        alert(data.error);
        localStorage.clear();
        setIsAuth(false);
        navigate("/register");
        return;
      }
    }

    if (isAuth === true) req();
  }, []);

  return (
    <>
      {message && (
        <Card className="m-5 text-center h4 text-warning">
          <Card.Body>{message}</Card.Body>
        </Card>
      )}
      <Row xs={1} sm={2} md={3} className="m-4">
        {response.map((e, i) => (
          <Col>
            <LinkContainer to="/sonequiz" onClick={(event) => setsonequiz(e)}>
              <Card
                role="button"
                className="shadow p-3 mb-5 bg-white rounded text-center"
              >
                <Card.Img className="w-50 m-auto" variant="top" src={img[i]} />
                <Card.Body>
                  <Card.Title className={textcolor[i % textcolor.length]}>
                    Quiz Name: {e.quizname}
                  </Card.Title>
                  <Card.Text
                    className={
                      textcolor[textcolor.length - 1 - (i % textcolor.length)]
                    }
                  >
                    Result: {e.result}
                  </Card.Text>
                  <Card.Text>Created By: {e.createdby}</Card.Text>
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Deshboardstudent;
