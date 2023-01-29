import UploadBracket from "../icons/upload-bracket";

const FileForm = ({ getJSON, name, fileName, placeholder }) => {
    return (
        <div id={`${name}-file-upload`} className="file is-info has-name is-fullwidth">
            <label className="file-label">
                <input
                    type="file"
                    name={name}
                    id={name}
                    className="file-input"
                    onChange={getJSON}
                    accept=".json"
                />
                <span className="file-cta">
                    <span className="file-icon">
                        <UploadBracket size="20px" color="#fff" />
                    </span>
                    <span className="file-label">Choose a file...</span>
                </span>
                <span className="file-name">{fileName ? fileName : placeholder}</span>
            </label>
        </div>
    );
};

export default FileForm;
