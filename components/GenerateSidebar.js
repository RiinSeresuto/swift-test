import { useState, useEffect } from "react";
import SidebarTitle from "./SidebarTitle";

const { log } = console;

const GenerateSidebar = ({
    testItems,
    selectingSubject,
    availableChapters,
    selectingAvailableChapters,
    selectedChapters,
    specificationMultipleChoice,
    specificationIdentification,
    specificationEssay,
    updateCount,
}) => {
    const [availableSubjects, setAvailableSubjects] = useState([]);

    const getSubjectList = () => {
        let temp = Array.from(new Set(testItems.map((item) => item.subject)));
        setAvailableSubjects(temp);
    };

    useEffect(() => {
        getSubjectList();
    }, [testItems]);
    return (
        <>
            <SidebarTitle />
            <h1 className="title">Select</h1>

            <h2 className="subtitle mb-2">Available Subjects</h2>

            <div className="available-subjects mb-5" onChange={selectingSubject}>
                {availableSubjects.map((subject, index) => (
                    <div className="control mb-1" key={index}>
                        <label className="radio">
                            <input type="radio" name="subject" value={subject} />
                            <span className="ml-2">{subject}</span>
                        </label>
                    </div>
                ))}
            </div>

            <h2 className="subtitle mb-2">Available Chapters</h2>

            <div className="mb-5">
                {availableChapters.map((chapter, index) => (
                    <div className="control mb-1" key={index}>
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                value={chapter}
                                onChange={() => selectingAvailableChapters(event, index)}
                                checked={selectedChapters.includes(chapter)}
                            />
                            <span className="ml-2">Chapter {chapter}</span>
                        </label>
                    </div>
                ))}
            </div>

            <div className="mb-5">
                <div className="mb-3">
                    <h2 className="subtitle mb-2">Multiple Choice</h2>
                    {specificationMultipleChoice.map((item, index) => (
                        <div className="field is-flex is-align-items-center" key={index}>
                            <div
                                className="button is-info"
                                onClick={() => {
                                    updateCount(false, "multipleChoice", item.name);
                                }}
                            >
                                -
                            </div>
                            <div className="ml-3 mr-3">
                                {item.count}/{item.data.length}
                            </div>
                            <div
                                className="button is-info mr-4"
                                onClick={() => {
                                    updateCount(true, "multipleChoice", item.name);
                                }}
                            >
                                +
                            </div>
                            <div> | {item.name}</div>
                        </div>
                    ))}
                </div>
                <div className="mb-3">
                    <h2 className="subtitle mb-2">Identification</h2>
                    {specificationIdentification.map((item, index) => (
                        <div className="field is-flex is-align-items-center" key={index}>
                            <div
                                className="button is-info"
                                onClick={() => {
                                    updateCount(false, "identification", item.name);
                                }}
                            >
                                -
                            </div>
                            <div className="ml-3 mr-3">
                                {item.count}/{item.data.length}
                            </div>
                            <div
                                className="button is-info mr-4"
                                onClick={() => {
                                    updateCount(true, "identification", item.name);
                                }}
                            >
                                +
                            </div>
                            <div> | {item.name}</div>
                        </div>
                    ))}
                </div>
                <div className="mb-3">
                    <h2 className="subtitle mb-2">Essay</h2>
                    {specificationEssay.map((item, index) => (
                        <div className="field is-flex is-align-items-center" key={index}>
                            <div
                                className="button is-info"
                                onClick={() => {
                                    updateCount(false, "essay", item.name);
                                }}
                            >
                                -
                            </div>
                            <div className="ml-3 mr-3">
                                {item.count}/{item.data.length}
                            </div>
                            <div
                                className="button is-info mr-4"
                                onClick={() => {
                                    updateCount(true, "essay", item.name);
                                }}
                            >
                                +
                            </div>
                            <div> | {item.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default GenerateSidebar;
