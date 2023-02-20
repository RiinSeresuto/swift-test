const ExamMetaDataForm = ({
    schoolName,
    schoolAddress,
    testTitle,
    updateSchoolName,
    updateSchoolAddress,
    updateTestTitle,
}) => {
    return (
        <h1>
            <form>
                <label htmlFor="school-name" className="label">
                    School Name
                </label>
                <div className="control">
                    <input
                        type="text"
                        name="school-name"
                        className="input"
                        value={schoolName}
                        onChange={updateSchoolName}
                    />
                </div>
                <label htmlFor="school-address" className="label">
                    School Address
                </label>
                <div className="control">
                    <input
                        type="text"
                        name="school-address"
                        className="input"
                        value={schoolAddress}
                        onChange={updateSchoolAddress}
                    />
                </div>
                <label htmlFor="test-title" className="label">
                    Test Title
                </label>
                <div className="control">
                    <input
                        type="text"
                        name="test-title"
                        className="input"
                        value={testTitle}
                        onChange={updateTestTitle}
                    />
                </div>
            </form>
        </h1>
    );
};

export default ExamMetaDataForm;
