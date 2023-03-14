import { useState, useEffect } from "react";
import { db } from "../lib/Database";

const EditModal = ({
    open,
    action,
    type,
    id,
    subject,
    chapter,
    specification,
    question,
    choices,
    answer,
    trigger,
}) => {
    const [subjectsList, setSubjectList] = useState([]);
    const [specificationsList, setSpecificationsList] = useState([]);

    const [editingId, setEditingId] = useState("");
    const [editingSubject, setEditingSubject] = useState("");
    const [editingChapter, setEditingChapter] = useState("");
    const [editingSpecification, setEditingSpecification] = useState("");
    const [editingQuestion, setEditingQuestion] = useState("");
    const [editingChoices, setEditingChoices] = useState([]);
    const [editingAnswer, setEditingAnswer] = useState("");

    const [editType, setEditType] = useState("");

    const toggle = () => {
        action("hide");
    };

    const getSubjectsSpecifications = () => {
        db.collection("subjects")
            .get()
            .then((subjects) => {
                setSubjectList(subjects);
            });

        db.collection("specifications")
            .get()
            .then((values) => {
                setSpecificationsList(values);
            });
    };

    const changeSubject = (event) => {
        setEditingSubject(event.target.value);
    };

    const changeChapter = (event) => {
        setEditingChapter(event.target.value);
    };

    const changeSpecification = (event) => {
        setEditingSpecification(event.target.value);
    };

    const changeQuestion = (event) => {
        setEditingQuestion(event.target.value);
    };

    const changeChoices = (event, index) => {
        let data = [...editingChoices];
        data[index] = event.target.value;

        setEditingChoices(data);
    };

    const deleteChoices = (event, index) => {
        let data = [...editingChoices];
        data.splice(index, 1);

        setEditingChoices(data);
    };

    const addchoices = () => {
        let data = [...editingChoices, ""];

        setEditingChoices(data);
    };

    const changeAnswer = (event) => {
        setEditingAnswer(event.target.value);
    };

    const saveChanges = () => {
        if (type === "multipleChoice") {
            db.collection(type)
                .doc({ id: editingId })
                .update({
                    answer: editingAnswer,
                    chapterNo: editingChapter,
                    choices: editingChoices,
                    question: editingQuestion,
                    specification: editingSpecification,
                    subject: editingSubject,
                })
                .then(() => {
                    trigger();
                })
                .then(() => {
                    toggle();
                });
        } else if (type === "identification") {
            db.collection(type)
                .doc({ id: editingId })
                .update({
                    answer: editingAnswer,
                    chapterNo: editingChapter,
                    question: editingQuestion,
                    specification: editingSpecification,
                    subject: editingSubject,
                })
                .then(() => {
                    trigger();
                })
                .then(() => {
                    toggle();
                });
        } else if (type === "essay") {
            db.collection(type)
                .doc({ id: editingId })
                .update({
                    chapterNo: editingChapter,
                    question: editingQuestion,
                    specification: editingSpecification,
                    subject: editingSubject,
                })
                .then(() => {
                    trigger();
                })
                .then(() => {
                    toggle();
                });
        }
    };

    const setType = () => {
        type === "multipleChoice" && setEditType("Multiple Choice");
        type === "identification" && setEditType("Identification");
        type === "essay" && setEditType("Essay");
    };

    useEffect(() => {
        getSubjectsSpecifications();
        setType();
    }, []);

    useEffect(() => {
        setEditingId(id);
        setEditingSubject(subject);
        setEditingChapter(chapter);
        setEditingSpecification(specification);
        setEditingQuestion(question);
        setEditingChoices(choices);
        setEditingAnswer(answer);
    }, [subjectsList, specificationsList]);
    return (
        <>
            <div className={`modal ${open && "is-active"}`}>
                <div className="modal-background" onClick={toggle}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Edit {editType}</p>
                        <button className="delete" aria-label="close" onClick={toggle}></button>
                    </header>
                    <section className="modal-card-body">
                        <label htmlFor="subjects" className="label">
                            Subject
                        </label>
                        <div className="control w-100">
                            <div className="select w-100">
                                <select
                                    className="w-100"
                                    value={editingSubject}
                                    name="subjects"
                                    onChange={changeSubject}
                                >
                                    {subjectsList.map((subject, index) => (
                                        <option key={index} value={subject.subjectName}>
                                            {subject.subjectName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <label className="label" htmlFor="chapter">
                            Chapter
                        </label>
                        <div className="control">
                            <input
                                className="input"
                                type="number"
                                name="chapter"
                                value={editingChapter}
                                onChange={changeChapter}
                            />
                        </div>

                        <label htmlFor="specification" className="label">
                            Specification
                        </label>
                        <div className="control w-100">
                            <div className="select w-100">
                                <select
                                    name="specification"
                                    className="w-100"
                                    value={editingSpecification}
                                    onChange={changeSpecification}
                                >
                                    {specificationsList.map((specification, index) => (
                                        <option
                                            key={index}
                                            value={specification.specificationsName}
                                        >
                                            {specification.specificationsName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <label htmlFor="question" className="label">
                            Question
                        </label>
                        <textarea
                            name="question"
                            rows="3"
                            className="textarea"
                            value={editingQuestion}
                            onChange={changeQuestion}
                        ></textarea>

                        {type === "multipleChoice" && (
                            <>
                                <label htmlFor="choices" className="label">
                                    Choices
                                </label>
                                {editingChoices.map((item, index) => (
                                    <div className="control mb-1" key={index}>
                                        <input
                                            value={item}
                                            type="text"
                                            name="choices"
                                            className="input"
                                            onChange={(event) => changeChoices(event, index)}
                                        />

                                        {editingChoices.length != 1 && (
                                            <div
                                                onClick={(event) => deleteChoices(event, index)}
                                                className="delete choices--delete"
                                            ></div>
                                        )}
                                    </div>
                                ))}
                                <span className="is-link" onClick={addchoices}>
                                    Add Item...
                                </span>
                            </>
                        )}

                        {type != "essay" && (
                            <>
                                <label htmlFor="answer" className="label">
                                    Answer
                                </label>
                                <input
                                    type="text"
                                    className="input"
                                    value={editingAnswer}
                                    onChange={changeAnswer}
                                />
                            </>
                        )}
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-info" onClick={saveChanges}>
                            Save changes
                        </button>
                        <button className="button" onClick={toggle}>
                            Cancel
                        </button>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default EditModal;
