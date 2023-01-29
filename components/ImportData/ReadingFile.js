const ReadingFile = () => {
    return (
        <div className="reading-files is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            <div className="mb-3">
                <h1 className="subtitle">Reading Files</h1>
            </div>
            <progress className="progress is-small is-info" value="1" max="100"></progress>
        </div>
    );
};

export default ReadingFile;
