const ExamMetaDataForm = ({
    schoolName,
    schoolAddress,
    testTitle,
    multipleChoiceDirection,
    identificationDirection,
    essayDirection,
    updateSchoolName,
    updateSchoolAddress,
    updateTestTitle,
    updateMultipleChoiceDirection,
    updateIdentificationDirection,
    updateEssayDirection,
    multipleChoice,
    identification,
    essay,
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

                {multipleChoice && multipleChoice.length > 0 && (
                    <div>
                        <label htmlFor="multiple-choice-direction" className="label">
                            Multiple Choice Direction
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                name="multiple-choice-direction"
                                id="multiple-choice-direction"
                                className="input"
                                value={multipleChoiceDirection}
                                onChange={updateMultipleChoiceDirection}
                            />
                        </div>
                    </div>
                )}

                {identification && identification.length > 0 && (
                    <div>
                        <label htmlFor="identification-direction" className="label">
                            Identification Direction
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                name="identification-direction"
                                id="identification-direction"
                                className="input"
                                value={identificationDirection}
                                onChange={updateIdentificationDirection}
                            />
                        </div>
                    </div>
                )}

                {essay && essay.length > 0 && (
                    <div>
                        <label htmlFor="essay-direction" className="label">
                            Essay Direction
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                name="essay-direction"
                                id="essay-direction"
                                className="input"
                                value={essayDirection}
                                onChange={updateEssayDirection}
                            />
                        </div>
                    </div>
                )}
            </form>
        </h1>
    );
};

export default ExamMetaDataForm;
