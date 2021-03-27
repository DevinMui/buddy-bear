import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="primary-i"
      style={{ paddingTop: 24, paddingBottom: 24, minHeight: "100%" }}
    >
      <div className="container">
        <h2>Bear Project Name</h2>
        <div className="row">
          <div className="col-md-6 col-sm-12" style={{ padding: 24 }}>
            <h1 style={{ marginTop: "20%", marginBottom: "15%" }}>
              Teach your kids to read the fun way.
            </h1>
            <Link to="/login">
              <div
                className="card-i"
                style={{
                  background: "var(--background-color)",
                  borderRadius: 60,
                  margin: 18,
                  marginTop: 36,
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    textAlign: "center",
                    color: "var(--primary-ii-color)",
                  }}
                >
                  Get Started
                </div>
              </div>
            </Link>
          </div>
          <div className="col-sm-12 col-md-6">
            <h1>Some cute graphic here.</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
