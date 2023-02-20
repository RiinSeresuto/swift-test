import { PDFViewer } from "@react-pdf/renderer";
import { useState } from "react";
import ExamMetaDataForm from "./PDFViewer/ExamMetaDataForm";
import PDFWindow from "./PDFViewer/PDFWindow";

const TestPaperViewer = ({ multipleChoice }) => {
    const [schoolName, setSchoolName] = useState("");
    const [schoolAddress, setSchoolAddress] = useState("");
    const [testTitle, setTestTitle] = useState("");

    const updateSchoolName = (event) => {
        setSchoolName(event.target.value);
    };

    const updateSchoolAddress = (event) => {
        setSchoolAddress(event.target.value);
    };

    const updateTestTitle = (event) => {
        setTestTitle(event.target.value);
    };

    return (
        <>
            <div className="columns">
                <div className="column">
                    <ExamMetaDataForm
                        schoolName={schoolName}
                        schoolAddress={schoolAddress}
                        testTitle={testTitle}
                        updateSchoolName={updateSchoolName}
                        updateSchoolAddress={updateSchoolAddress}
                        updateTestTitle={updateTestTitle}
                    />
                </div>
                <div className="column">
                    <p>Preview</p>
                    <PDFViewer width={"100%"} height={"100%"}>
                        <PDFWindow
                            multipleChoice={multipleChoice}
                            schoolName={schoolName}
                            schoolAddress={schoolAddress}
                            testTitle={testTitle}
                        />
                    </PDFViewer>
                </div>
            </div>
        </>
    );
};

export default TestPaperViewer;
