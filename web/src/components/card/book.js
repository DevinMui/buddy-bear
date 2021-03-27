export default function Book(props) {
    return (
        <div
            className="row card-i background-i no-gutters col-md-6 col-sm-12"
            style={{ padding: 0, overflow: 'hidden' }}
        >
            <div className="col-md-4 d-flex justify-content-center align-items-center">
                <img
                    className="img-fluid"
                    src={props.src}
                    alt={props.title}
                />
            </div>
            <div
                className="col-md-8"
                style={{
                    padding: '30px',
                }}
            >
                <h3>{props.title}</h3>
                <p>By {props.author}</p>
                <p>{props.description}</p>
            </div>
        </div>
    )
}
