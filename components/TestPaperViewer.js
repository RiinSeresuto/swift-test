import { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ExamMetaDataForm from "./PDFViewer/ExamMetaDataForm";
import PDFWindow from "./PDFViewer/PDFWindow";

const TestPaperViewer = ({ multipleChoice, identification, essay }) => {
    const [schoolName, setSchoolName] = useState("");
    const [schoolAddress, setSchoolAddress] = useState("");
    const [testTitle, setTestTitle] = useState("");

    const [multipleChoiceDirection, setMultipleChoiceDirection] = useState("");
    const [identificationDirection, setIdentificationDirection] = useState("");
    const [essayDirection, setEssayDirection] = useState("");

    const [isClient, setIsClient] = useState(false);

    const updateSchoolName = (event) => {
        setSchoolName(event.target.value);
    };

    const updateSchoolAddress = (event) => {
        setSchoolAddress(event.target.value);
    };

    const updateTestTitle = (event) => {
        setTestTitle(event.target.value);
    };

    const updateMultipleChoiceDirection = (event) => {
        setMultipleChoiceDirection(event.target.value);
    };

    const updateIdentificationDirection = (event) => {
        setIdentificationDirection(event.target.value);
    };

    const updateEssayDirection = (event) => {
        setEssayDirection(event.target.value);
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            <div className="columns">
                <div className="column">
                    <ExamMetaDataForm
                        schoolName={schoolName}
                        schoolAddress={schoolAddress}
                        testTitle={testTitle}
                        multipleChoiceDirection={multipleChoiceDirection}
                        identificationDirection={identificationDirection}
                        essayDirection={essayDirection}
                        updateSchoolName={updateSchoolName}
                        updateSchoolAddress={updateSchoolAddress}
                        updateTestTitle={updateTestTitle}
                        updateMultipleChoiceDirection={updateMultipleChoiceDirection}
                        updateIdentificationDirection={updateIdentificationDirection}
                        updateEssayDirection={updateEssayDirection}
                        multipleChoice={multipleChoice}
                        identification={identification}
                        essay={essay}
                    />
                </div>
                <div className="column">
                    <p>Preview</p>

                    {isClient && (
                        <PDFDownloadLink
                            document={
                                <PDFWindow
                                    multipleChoice={multipleChoice}
                                    identification={identification}
                                    essay={essay}
                                    schoolName={schoolName}
                                    schoolAddress={schoolAddress}
                                    testTitle={testTitle}
                                    multipleChoiceDirection={multipleChoiceDirection}
                                    identificationDirection={identificationDirection}
                                    essayDirection={essayDirection}
                                />
                            }
                            fileName="test-paper"
                        >
                            {({ loading }) => (loading ? "Loading Document" : "Download")}
                        </PDFDownloadLink>
                    )}

                    {isClient && (
                        <PDFViewer width={"100%"} height={"100%"}>
                            <PDFWindow
                                multipleChoice={multipleChoice}
                                identification={identification}
                                essay={essay}
                                schoolName={schoolName}
                                schoolAddress={schoolAddress}
                                testTitle={testTitle}
                                multipleChoiceDirection={multipleChoiceDirection}
                                identificationDirection={identificationDirection}
                                essayDirection={essayDirection}
                            />
                        </PDFViewer>
                    )}
                </div>
            </div>
        </>
    );
};

export default TestPaperViewer;
