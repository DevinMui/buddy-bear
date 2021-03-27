import styled from "styled-components";
import Paw from './paw.svg'

const Background = styled.div`
  background: var(--primary-color);
  height: 100%;
  width: 100%;
`;

export default function () {
  // Put some warnings here for rotation
  // text
  // camera
  // paw
  return (
    <Background>
      <div className="container">
        <div
          className="col-4"
          style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
        >
          <h1>Hello!</h1>
          <h2>Some instruction text for the child.</h2>
        </div>
        <div className="col-8">
            <img src={Paw}/>
        </div>
      </div>
    </Background>
  );
}
