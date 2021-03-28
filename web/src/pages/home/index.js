import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="primary-i"
      style={{ paddingTop: 24, paddingBottom: 24, minHeight: "100%" }}
    >
      <div className="container">
        <h2>Beary</h2>
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
            <div style={{height:60}}></div>
            <svg width="500" height="500" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1000" height="1000" fill="#FFC800"/>
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="73" y="46" width="900" height="900">
            <circle cx="523" cy="496" r="450" fill="#FFC800"/>
            </mask>
            <g mask="url(#mask0)">
            <circle cx="523" cy="496" r="450" fill="#FAFAFA"/>
            <circle cx="523" cy="496" r="450" fill="#f0f0f0"/>
            <rect x="2" y="64" width="304" height="932" rx="20" fill="#FF9A00"/>
            <rect x="365" y="132" width="350" height="33" rx="16.5" fill="#FF9A00"/>
            <rect x="365" y="253" width="484" height="33" rx="16.5" fill="#FF9A00"/>
            <rect x="365" y="374" width="533" height="33" rx="16.5" fill="#FF9A00"/>
            <rect x="365" y="495" width="575" height="33" rx="16.5" fill="#FF9A00"/>
            <rect x="359" y="620" width="512" height="33" rx="16.5" fill="#FF9A00"/>
            <rect x="261" y="741" width="575" height="33" rx="16.5" fill="#FF9A00"/>
            <ellipse rx="342.726" ry="341.351" transform="matrix(0.959658 -0.281171 0.283656 0.958926 355.726 792.305)" fill="#AC5606"/>
            <ellipse rx="109.848" ry="109.407" transform="matrix(0.959658 -0.281171 0.283656 0.958926 208.299 479.8)" fill="#AC5606"/>
            <ellipse rx="109.848" ry="109.407" transform="matrix(0.959658 -0.281171 0.283656 0.958926 700.55 694.011)" fill="#AC5606"/>
            </g>
            </svg>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
