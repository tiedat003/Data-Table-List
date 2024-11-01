import 'bootstrap/dist/css/bootstrap.min.css';

export default function InputComponent(props: { type: string; value: string; id: string; inputChange: Function; error?: string }) {
    const { type, value, id, inputChange, error } = props;
    return (
        <><div className="mb-3">
            <input
                type={type}
                className="form-control"
                id={id}
                value={value}
                onChange={(e) => inputChange(e)}
            ></input>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        </>
    )
}
