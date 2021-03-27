export default function Book(props) {
    return (
        <div
            className="row card-i background-i no-gutters"
            style={{ padding: 0 }}
        >
            <div className="col-md-4">
                <img
                    className="img-fluid"
                    style={{
                        marginLeft: '-8px',
                        borderRadius: '20px',
                    }}
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
