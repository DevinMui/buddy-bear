import { useEffect, useRef, useState, useCallback } from "react";
import {Button} from 'react-bootstrap';
import styled from "styled-components";
import Webcam from "react-webcam";
import axios from 'axios';

const Background = styled.div`
  background: var(--primary-color);
  height: 100%;
  width: 100%;
`;

const Paw = styled.img`
  position: fixed;
  height: 80vh;
  right: 0;
  bottom: -10px;
`;

const Preview = styled.div`
  height: 33vw;
  width: 33vw;
  padding: 0;
  position: fixed;
  top: 24px;
`;

const CameraWarning = styled.div`
  margin: 1rem;
  opacity: 0.8;
  text-align: center;
`;

export default function () {
  // Put some warnings here for rotation
  // text
  // camera
  // paw
  const camRef = useRef(null);
  const [img, setImg] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    const e = function () {
      console.log(window.orientation);
      setIsLandscape(window.orientation % 180 !== 0);
    };
    e();
    window.addEventListener("resize", e);
    return window.removeEventListener("resize", e);
  }, []);

  const capture = useCallback(() => {
    const imageSrc = camRef.current.getScreenshot();
    console.log(imageSrc);
    axios.post('/api/bears/ocr/', {
      file:imageSrc
    })
    .then((response) => {
      console.log("it returned or something")
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }, [camRef, setImg]);

  return (
    <Background>
      <div
        className="visible-xs-block container row"
        style={{ margin: "0 auto" }}
      >
        <Paw src={require("./paw.svg").default} />
        <div
          className={isLandscape ? "col-4" : "col-12"}
          style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
        >
          <h1>Hello!</h1>
          <h2>
            {isLandscape
              ? "Put me in your bear's paw."
              : "Rotate the phone to start reading."}
          </h2>
          <Button onClick={capture}>
            Press to Take Screenshot
          </Button>
        </div>
        <div
          className="col-6 offset-5"
          style={{ display: isLandscape ? "block" : "none" }}
        >
          <Preview className="card-i bg-color d-flex justify-content-center align-items-center">
            <Webcam
              ref={camRef}
              onUserMediaError={() => setCameraActive(false)}
              onUserMedia={() => setCameraActive(true)}
              videoConstraints={{
                facingMode: "environment",
              }}
            />
            {cameraActive || (
              <CameraWarning>
                Please enable your camera to continue.
              </CameraWarning>
            )}
          </Preview>
        </div>
      </div>
    </Background>
  );
}
