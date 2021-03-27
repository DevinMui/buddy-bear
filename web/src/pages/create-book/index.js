import { useState } from "react";
/*
    <>
        <div className="mini-hero">
            <div className="container">
                <div className="row">
                    <BookCard
                        title="The Very Hungry Caterpillar"
                        author="Mike Oxlong"
                        description="Lorem Ipsum"
                        src="https://target.scene7.com/is/image/Target/GUEST_ea6b5786-9f05-471b-8c0d-440e863a97fd?wid=488&hei=488&fmt=pjpeg"
                    />
                </div>
            </div>
        </div>
        <div className="container mt-4">
            <ul className="nav">
                <li className="nav-item">
                    <button
                        className="btn btn-link"
                        onClick={() => setPageIndex(0)}
                    >
                        Statistics
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link"
                        onClick={() => setPageIndex(1)}
                    >
                        Comparison
                    </button>
                </li>
            </ul>
            {page}
        </div>
    </>
*/
export default function CreateBook() {
  const [search, setSearch] = useState("");
  const [router, setRouter] = useState(0);
  // Search bar
  // Results
  //
  switch (router) {
    case 0:
      // Search page
      return (
        <div className="mini-hero">
          <div className="container">
            <div className="row">
                Search bar
            </div>
          </div>
        </div>
      );

      return <div />;
    case 1:
      // Synth recording
      return <div />;
    default:
      return <div />;
  }
}
