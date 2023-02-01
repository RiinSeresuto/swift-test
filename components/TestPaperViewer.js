import { useState } from "react";
import { usePDF, PDFViewer } from "@react-pdf/renderer";
import PDFWindow from "./PDFViewer/PDFWindow";

const TestPaperViewer = ({ title }) => {
    const [instance, setInstance] = usePDF({ document: PDFWindow });
    const [docTitle, setDocTitle] = useState("");

    const changeDocTitle = (event) => {
        const { value } = event.target;

        setDocTitle(value);
    };

    return (
        <>
            <input type="text" onChange={changeDocTitle} />

            <PDFViewer>
                <PDFWindow title={docTitle} />
            </PDFViewer>
        </>
    );
};

export default TestPaperViewer;
