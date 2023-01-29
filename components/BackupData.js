import { useState, useEffect } from "react";
import { db } from "../lib/Database";

const BackupData = ({ subjectsData, specificationData, refreshTrigger }) => {
    const [multipleChoiceData, setMultipleChoiceData] = useState([]);
    const [essayData, setEssayData] = useState([]);
    const [identificationData, setIdentificationData] = useState([]);

    useEffect(() => {
        getData();
    }, [refreshTrigger]);

    const getData = () => {
        db.collection("multipleChoice")
            .get()
            .then((data) => setMultipleChoiceData(data));

        db.collection("identification")
            .get()
            .then((data) => setIdentificationData(data));

        db.collection("essay")
            .get()
            .then((data) => setEssayData(data));
    };

    const downloadFile = ({ data, fileName, fileType }) => {
        const blob = new Blob([data], { type: fileType });
        const a = document.createElement("a");

        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);

        const clickEvent = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        a.dispatchEvent(clickEvent);
        a.remove();
    };

    const exportToJSON = (arrayData, filename) => {
        downloadFile({
            data: JSON.stringify(arrayData),
            fileName: filename,
            fileType: "text/json",
        });
    };

    return (
        <>
            <p>In you database, there are:</p>
            <div className="content">
                <ul>
                    <li>
                        {multipleChoiceData.length} multiple choice type questions.{" "}
                        <span
                            className="is-link"
                            onClick={() => {
                                exportToJSON(multipleChoiceData, "multipleChoice.json");
                            }}
                        >
                            Backup
                        </span>
                    </li>
                    <li>
                        {identificationData.length} identification type questions.{" "}
                        <span
                            className="is-link"
                            onClick={() => exportToJSON(identificationData, "identification.json")}
                        >
                            Backup
                        </span>
                    </li>
                    <li>
                        {essayData.length} essay type questions.{" "}
                        <span
                            className="is-link"
                            onClick={() => exportToJSON(essayData, "essay.json")}
                        >
                            Backup
                        </span>
                    </li>
                    <li>
                        {subjectsData.length} {subjectsData.length > 1 ? "subjects" : "subject"}.{" "}
                        <span
                            className="is-link"
                            onClick={() => exportToJSON(subjectsData, "subjects.json")}
                        >
                            Backup
                        </span>
                    </li>
                    <li>
                        {specificationData.length}{" "}
                        {specificationData.length > 1 ? "specifications" : "specification"}.{" "}
                        <span
                            className="is-link"
                            onClick={() => exportToJSON(specificationData, "specification.json")}
                        >
                            Backup
                        </span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default BackupData;
