export default function Comparison() {
    return (
        <div className="mt-4">
            <div className="row">
                <div className="col-md-6">
                    <h3 className="text-center">Your child</h3>
                    <div className="comparison-card mt-4">
                        <p>Lorem Ipsum</p>
                        <button className="btn play">
                            <i className="bi bi-play-fill"></i>
                        </button>
                    </div>
                </div>
                <div className="col-md-6">
                    <h3 className="text-center">Source</h3>
                    <div className="comparison-card mt-4">
                        <p>Lorem Ipsum</p>
                        <button
                            className="btn play"
                            style={{ visibility: 'hidden' }}
                        >
                            <i className="bi bi-play-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
