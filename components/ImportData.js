import { useState, useEffect } from "react";
import FileForm from "./ImportData/FileForm";
import ReadingFile from "./ImportData/ReadingFile";
import UploadingFile from "./ImportData/UploadingFile";
import { db } from "../lib/Database";

const { log } = console;

const ImportData = ({ refreshTrigger }) => {
    const [subjectDataImport, setSubjectDataImport] = useState([]);
    const [subjectDataFileName, setSubjectDataFileName] = useState("");
    const [specificationsDataImport, setSpecificationsDataImport] = useState([]);
    const [specificationsDataFileName, setSpecificationsDataFileName] = useState("");
    const [essayDataImport, setEssayDataImport] = useState([]);
    const [essayDataFileName, setEssayDataFileName] = useState("");
    const [identificationDataImport, setIdentificationDataImport] = useState([]);
    const [identificationDataFileName, setIdentificationDataFileName] = useState("");
    const [multipleChoiceDataImport, setMultipleChoiceDataImport] = useState([]);
    const [multipleChoiceDataFileName, setMultipleChoiceDataFileName] = useState("");
    const [uploading, setUploading] = useState(false);
    const [readingFiles, setReadingFiles] = useState(false);
    const [count, setCount] = useState(0);
    const [dataLength, setDataLength] = useState({
        subjects: 0,
        specification: 0,
        essay: 0,
        identification: 0,
        multipleChoice: 0,
    });

    useEffect(() => {
        setDataLength((old) => ({
            subjects: subjectDataImport.length,
            specification: specificationsDataImport.length,
            essay: essayDataImport.length,
            identification: identificationDataImport.length,
            multipleChoice: multipleChoiceDataImport.length,
        }));

        if (
            count ===
            dataLength.essay +
                dataLength.identification +
                dataLength.multipleChoice +
                dataLength.subjects +
                dataLength.specification
        ) {
            setUploading(false);
            setCount(0);
            refreshTrigger((data) => !data);
        }
    }, [
        subjectDataImport,
        specificationsDataImport,
        essayDataImport,
        identificationDataImport,
        multipleChoiceDataImport,
        count,
    ]);

    const getJSON = (event) => {
        const { name, files } = event.target;

        const fileReader = new FileReader();

        if (files[0]) {
            fileReader.readAsText(files[0], "UTF-8");

            fileReader.onload = (e) => {
                const { result } = e.target;

                name === "subjects" && setSubjectDataImport(JSON.parse(result));
                name === "specifications" && setSpecificationsDataImport(JSON.parse(result));
                name === "essay" && setEssayDataImport(JSON.parse(result));
                name === "identification" && setIdentificationDataImport(JSON.parse(result));
                name === "multipleChoice" && setMultipleChoiceDataImport(JSON.parse(result));
            };

            name === "subjects" && setSubjectDataFileName(files[0].name);
            name === "specifications" && setSpecificationsDataFileName(files[0].name);
            name === "essay" && setEssayDataFileName(files[0].name);
            name === "identification" && setIdentificationDataFileName(files[0].name);
            name === "multipleChoice" && setMultipleChoiceDataFileName(files[0].name);
        }
    };

    const saveDatabase = () => {
        if (subjectDataImport.length > 0) {
            subjectDataImport.forEach((item) => {
                db.collection("subjects")
                    .add(
                        {
                            id: item.id,
                            subjectName: item.subjectName,
                        },
                        item.id
                    )
                    .then((res) => {
                        setCount((old) => old + 1);
                    });
            });
        }

        if (specificationsDataImport.length > 0) {
            specificationsDataImport.forEach((item) => {
                db.collection("specifications")
                    .add(
                        {
                            id: item.id,
                            specificationsName: item.specificationsName,
                        },
                        item.id
                    )
                    .then((res) => {
                        setCount((old) => old + 1);
                    });
            });
        }

        if (essayDataImport.length > 0) {
            essayDataImport.forEach((item) => {
                db.collection("essay")
                    .add(
                        {
                            id: item.id,
                            subject: item.subject,
                            chapterNo: item.chapterNo,
                            specification: item.specification,
                            question: item.question,
                        },
                        item.id
                    )
                    .then((res) => {
                        setCount((old) => old + 1);
                    });
            });
        }

        if (identificationDataImport.length > 0) {
            identificationDataImport.forEach((item) => {
                db.collection("identification")
                    .add(
                        {
                            id: item.id,
                            subject: item.subject,
                            chapterNo: item.chapterNo,
                            specification: item.specification,
                            question: item.question,
                            answer: item.answer,
                        },
                        item.id
                    )
                    .then((res) => {
                        setCount((old) => old + 1);
                    });
            });
        }

        if (multipleChoiceDataImport.length > 0) {
            multipleChoiceDataImport.forEach((item) => {
                db.collection("multipleChoice")
                    .add(
                        {
                            id: item.id,
                            subject: item.subject,
                            chapterNo: item.chapterNo,
                            specification: item.specification,
                            question: item.question,
                            choices: item.choices,
                            answer: item.answer,
                        },
                        item.id
                    )
                    .then((res) => {
                        setCount((old) => old + 1);
                    });
            });
        }
    };

    const saveData = (event) => {
        event.preventDefault();

        setReadingFiles(true);

        setTimeout(() => {
            log("length ==>", dataLength);

            saveDatabase();
            setReadingFiles(false);
            setUploading(true);
        }, 2000);
    };

    return (
        <>
            <form>
                <div className="control mb-4">
                    <FileForm
                        getJSON={getJSON}
                        name="subjects"
                        fileName={subjectDataFileName}
                        placeholder={"Subject Data"}
                    />
                </div>

                <div className="control mb-4">
                    <FileForm
                        getJSON={getJSON}
                        name="specifications"
                        fileName={specificationsDataFileName}
                        placeholder={"Specifications Data"}
                    />
                </div>

                <div className="control mb-4">
                    <FileForm
                        getJSON={getJSON}
                        name="essay"
                        fileName={essayDataFileName}
                        placeholder={"Essay Type Questions Data"}
                    />
                </div>

                <div className="control mb-4">
                    <FileForm
                        getJSON={getJSON}
                        name="identification"
                        fileName={identificationDataFileName}
                        placeholder={"Identification Type Questions Data"}
                    />
                </div>

                <div className="control mb-4">
                    <FileForm
                        getJSON={getJSON}
                        name="multipleChoice"
                        fileName={multipleChoiceDataFileName}
                        placeholder={"Multiple Choice Type Questions Data"}
                    />
                </div>

                <button className="button is-info" type="submit" onClick={saveData}>
                    Import
                </button>
            </form>

            {readingFiles && <ReadingFile />}

            {uploading && (
                <UploadingFile
                    maxvalue={
                        dataLength.essay +
                        dataLength.identification +
                        dataLength.multipleChoice +
                        dataLength.subjects +
                        dataLength.specification
                    }
                    currentvalue={count}
                />
            )}
        </>
    );
};

export default ImportData;
