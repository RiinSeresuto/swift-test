import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ExamMetaDataForm from "./PDFViewer/ExamMetaDataForm";
import PDFWindow from "./PDFViewer/PDFWindow";

const TestPaperViewer = ({ multipleChoice }) => {
    const [schoolName, setSchoolName] = useState("");
    const [schoolAddress, setSchoolAddress] = useState("");
    const [testTitle, setTestTitle] = useState("");

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
                        updateSchoolName={updateSchoolName}
                        updateSchoolAddress={updateSchoolAddress}
                        updateTestTitle={updateTestTitle}
                    />
                </div>
                <div className="column">
                    <p>Preview</p>

                    {isClient && (
                        <PDFDownloadLink
                            document={
                                <PDFWindow
                                    multipleChoice={multipleChoice}
                                    schoolName={schoolName}
                                    schoolAddress={schoolAddress}
                                    testTitle={testTitle}
                                />
                            }
                            fileName="test-papre"
                        >
                            {({ loading }) => (loading ? "Loading Document" : "Download")}
                        </PDFDownloadLink>
                    )}

                    {/*
                    <PDFViewer width={"100%"} height={"100%"}>
                        <PDFWindow
                            multipleChoice={multipleChoice}
                            schoolName={schoolName}
                            schoolAddress={schoolAddress}
                            testTitle={testTitle}
                        />
                    </PDFViewer>
                    */}
                </div>
            </div>
        </>
    );
};

export default TestPaperViewer;
