import PlusClipboard from "./icons/plus-clipboard";
import { useState, useEffect } from "react";
import { db } from "../lib/Database";
import SidebarTitle from "./SidebarTitle";

const AddItemSidebar = ({
    updateData,
    addItem,
    deleteItem,
    updateChoices,
    submitForm,
    type,
    chapter,
    choices,
    question,
    specification,
    keyAnswer,
}) => {
    const [listSubject, setListsubject] = useState([]);
    const [listSpecification, setListSpecification] = useState([]);

    useEffect(() => {
        getSubjects();
    }, []);

    const getSubjects = () => {
        db.collection("subjects")
            .get()
            .then((subjects) => {
                setListsubject(subjects);
            });

        db.collection("specifications")
            .get()
            .then((values) => {
                setListSpecification(values);
            });
    };

    const clearForm = (event) => {
        event.preventDefault();
        const subjectField = document.querySelector(".subject-selector");
        const specificationField = document.querySelector(".specification-selector");

        subjectField.value = "";
        specificationField.value = "";

        submitForm();
    };

    return (
        <>
            <SidebarTitle />
            <form method="post">
                <div className="field">
                    <label htmlFor="subject" className="label">
                        Subject
                    </label>
                    <div className="control w-100">
                        <div className="select w-100">
                            <select
                                className="subject-selector w-100"
                                type="text"
                                name="subject"
                                id="subject"
                                onChange={updateData}
                                required
                            >
                                <option disabled selected value="">
                                    -- Select --
                                </option>
                                {listSubject.map((subject, index) => (
                                    <option key={index} value={subject.subjectName}>
                                        {subject.subjectName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label" htmlFor="chapter">
                        Chapter No.
                    </label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            name="chapter"
                            id="chapter"
                            onChange={updateData}
                            value={chapter}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label" htmlFor="type">
                        Exam Type
                    </label>
                    <div className="control w-100">
                        <div className="select w-100">
                            <select
                                name="type"
                                id="type"
                                className="w-100"
                                onChange={updateData}
                                value={type}
                            >
                                <option value="identification">Identification</option>
                                <option value="multiple choice">Multiple Choice</option>
                                <option value="essay">Essay</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="specification" className="label">
                        Specification
                    </label>
                    <div className="control w-100">
                        <div className="select w-100">
                            <select
                                name="specification"
                                id="specification"
                                className="specification-selector w-100"
                                onChange={updateData}
                                required
                            >
                                <option disabled selected value="">
                                    -- Select --
                                </option>
                                {listSpecification.map((specification, index) => (
                                    <option key={index} value={specification.specificationsName}>
                                        {specification.specificationsName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="question" className="label">
                        Question
                    </label>
                    <div className="control">
                        {/*<input
                            type="text"
                            name="question"
                            id="question"
                            className="input"
                            placeholder="What is the longest english word?"
                            value={question}
                            onChange={updateData}
                                />*/}
                        <textarea
                            className="textarea"
                            name="question"
                            id="question"
                            rows="5"
                            value={question}
                            onChange={updateData}
                        ></textarea>
                    </div>
                </div>

                {type == "multiple choice" && (
                    <div className="field">
                        <label htmlFor="choices" className="label">
                            Choices
                        </label>

                        {choices.map((item, index) => (
                            <div className="control mb-1 choices" key={index}>
                                <input
                                    type="text"
                                    name="choices"
                                    id="choices"
                                    className="input"
                                    placeholder="Item choices"
                                    onChange={(event) => updateChoices(event, index)}
                                    value={item}
                                />

                                {choices.length != 1 && (
                                    <div
                                        onClick={(event) => deleteItem(event, index)}
                                        className="delete choices--delete"
                                    ></div>
                                )}
                            </div>
                        ))}

                        <span onClick={addItem} className="is-link">
                            Add Choices...
                        </span>
                    </div>
                )}

                {(type == "multiple choice" || type == "identification") && (
                    <div className="field">
                        <label htmlFor="answer" className="label">
                            Answer
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                name="answer"
                                id="answer"
                                className="input"
                                placeholder="Answer"
                                onChange={updateData}
                                value={keyAnswer}
                            />
                        </div>
                    </div>
                )}

                <div className="control">
                    <button type="submit" className="button is-info" onClick={clearForm}>
                        <PlusClipboard size={"16px"} color={"#fff"} />{" "}
                        <span className="ml-3">Add to Test Bank</span>
                    </button>
                </div>
            </form>
        </>
    );
};

export default AddItemSidebar;
