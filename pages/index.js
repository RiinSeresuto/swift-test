import { useState } from "react";
import Head from "next/head";
import AddItemSidebar from "../components/AddItemSidebar";
import Navigation from "../components/Navigation";
import alpha from "../lib/Alphabet";
import { db } from "../lib/Database";

const Home = () => {
    const [subject, setSubject] = useState("");
    const [chapter, setChapter] = useState(0);
    const [specification, setSpecifications] = useState("");
    const [type, setType] = useState("identification");
    const [question, setQuestion] = useState("");
    const [choices, setChoices] = useState([""]);
    const [keyAnswer, setKeyAnswer] = useState("");
    const [emptySubject, setEmptySubject] = useState(false);
    const [emptySpecification, setEmptySpecification] = useState(false);
    const [enterTestItemSucsess, setEnterTestItemSuccess] = useState(false);

    const updateData = (event) => {
        //console.log("====>", event.target.name);
        event.target.name == "subject" && setSubject(event.target.value);
        event.target.name == "chapter" && setChapter(event.target.value);
        event.target.name == "type" && setType(event.target.value);
        event.target.name == "question" && setQuestion(event.target.value);
        event.target.name == "answer" && setKeyAnswer(event.target.value);
        event.target.name == "specification" && setSpecifications(event.target.value);
    };

    const addItem = (event) => {
        event.preventDefault();
        setChoices([...choices, ""]);
    };

    const deleteItem = (event, index) => {
        let data = [...choices];
        data.splice(index, 1);

        setChoices(data);
    };

    const updateChoices = (event, index) => {
        let data = [...choices];
        data[index] = event.target.value;

        setChoices(data);
    };

    const clearNotification = (notif) => {
        notif === "subject" && setEmptySubject(false);
        notif === "specification" && setEmptySpecification(false);
        notif === "addTest" && setEnterTestItemSuccess(false);
    };

    const clearForm = () => {
        setSubject("");
        setChapter(0);
        setSpecifications("");
        setType("identification");
        setQuestion("");
        setChoices([""]);
        setKeyAnswer("");
    };

    const saveItem = () => {
        if (!subject) {
            setEmptySubject(true);
            setTimeout(() => clearNotification("subject"), 5000);
            return false;
        }

        if (!specification) {
            setEmptySpecification(true);
            setTimeout(() => clearNotification("specification"), 5000);
            return false;
        }

        console.log("Form Submitted");
        saveData();
    };

    const saveData = () => {
        var data = {};
        var uuid = crypto.randomUUID();

        if (type == "multiple choice") {
            db.collection("multipleChoice")
                .add(
                    {
                        id: uuid,
                        subject: subject,
                        chapterNo: chapter,
                        specification: specification,
                        question: question,
                        choices: choices,
                        answer: keyAnswer,
                    },
                    uuid
                )
                .then((res) => {
                    clearForm();
                    setEnterTestItemSuccess(true);
                    setTimeout(() => clearNotification("addTest"), 3000);
                })
                .catch((err) => {
                    console.log("Item not Saved");
                });
        }

        if (type == "identification") {
            db.collection("identification")
                .add(
                    {
                        id: uuid,
                        subject: subject,
                        chapterNo: chapter,
                        specification: specification,
                        question: question,
                        answer: keyAnswer,
                    },
                    uuid
                )
                .then((res) => {
                    clearForm();
                    setEnterTestItemSuccess(true);
                    setTimeout(() => clearNotification("addTest"), 3000);
                })
                .catch((err) => {
                    console.log("Item not Saved");
                });
        }

        if (type == "essay") {
            db.collection("essay")
                .add(
                    {
                        id: uuid,
                        subject: subject,
                        chapterNo: chapter,
                        specification: specification,
                        question: question,
                    },
                    uuid
                )
                .then((res) => {
                    clearForm();
                    setEnterTestItemSuccess(true);
                    setTimeout(() => clearNotification("addTest"), 3000);
                })
                .catch((err) => {
                    console.log("Item not Saved");
                });
        }

        console.log("====>", data);
    };

    return (
        <>
            <Head>
                <title>Cwician</title>
            </Head>

            <div className="container-fluid">
                <div className="columns is-desktop">
                    <div className="column is-4 sidebar">
                        <div className="p-5 sidebar--content z-10">
                            <AddItemSidebar
                                updateData={updateData}
                                addItem={addItem}
                                deleteItem={deleteItem}
                                updateChoices={updateChoices}
                                submitForm={saveItem}
                                type={type}
                                chapter={chapter}
                                choices={choices}
                                question={question}
                                specification={specification}
                                keyAnswer={keyAnswer}
                            />
                        </div>
                    </div>

                    <div className="column is-8 question-interface">
                        <Navigation />
                        <div className="px-5 w-100">
                            <h1 className="title">NEW TEST ITEM</h1>

                            {/*START QUESTION CARD */}
                            <div className="card question-card">
                                <div className="card-content">
                                    <div className="tags">
                                        <div className="tag is-info">{subject}</div>
                                        <div className="tag is-info">{type}</div>
                                        <div className="tag is-info">Chapter: {chapter}</div>
                                        <div className="tag is-info">
                                            {specification.toUpperCase().charAt(0) +
                                                specification.slice(1)}
                                        </div>
                                    </div>
                                    <p>{question}</p>
                                    {type == "multiple choice" && (
                                        <div>
                                            {choices.map((item, index) => (
                                                <div key={index} className="ml-5">
                                                    {`${alpha()[index]}. ${item}`}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {type != "essay" && (
                                        <div className="mt-3">Answer: {keyAnswer}</div>
                                    )}
                                </div>
                            </div>
                            {/*END QUESTION CARD */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="notification-area mr-4 mb-4">
                {emptySubject && (
                    <div className="notification is-danger">
                        <div className="delete" onClick={() => clearNotification("subject")}></div>
                        No subject selected
                    </div>
                )}

                {emptySpecification && (
                    <div className="notification is-danger">
                        <div
                            className="delete"
                            onClick={() => clearNotification("specification")}
                        ></div>
                        No specification selected
                    </div>
                )}

                {enterTestItemSucsess && (
                    <div className="notification is-success">
                        <div className="delete"></div>
                        Test Item Added to Test Bank
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
