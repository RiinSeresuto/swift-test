const UploadingFile = ({ maxvalue, currentvalue }) => {
    return (
        <div className="reading-files is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            <div className="mb-3">
                <h1 className="subtitle">Uploading Data</h1>
            </div>
            <progress className="progress is-info" value={currentvalue} max={maxvalue}></progress>
        </div>
    );
};

export default UploadingFile;
