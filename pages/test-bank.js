import Head from "next/head";
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import FilterTestBankForm from "../components/FilterTestBankForm";
import EditModal from "../components/EditModal";
import { db } from "../lib/Database";

const TestBank = () => {
    const [lessons, setLessons] = useState([]);

    const [multipleChoice, setMultipleChoice] = useState([]);
    const [essay, setEssay] = useState([]);
    const [identification, setIdentification] = useState([]);

    const [filteredMultipleSet, setFilteredMultipleSet] = useState([]);
    const [filteredIdentificationSet, setFilteredIdentificationSet] = useState([]);
    const [filteredEssaySet, setFilteredEssaySet] = useState([]);

    const [showAnswer, setShowAnswer] = useState(true);
    const [showMultipleChoice, setShowMultipleChoice] = useState(false);
    const [showIdentification, setShowIdentification] = useState(false);
    const [showEssay, setShowEssay] = useState(false);

    const [trigger, setTrigger] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [editingType, setEditingType] = useState("");
    const [editingId, setEditingId] = useState("");
    const [editingSubject, setEditingSubject] = useState("");
    const [editingChapter, setEditingChapter] = useState("");
    const [editingSpecification, setEditingSpecification] = useState("");
    const [editingQuestion, setEditingQuestion] = useState("");
    const [editingChoices, setEditingChoices] = useState([]);
    const [editingAnswer, setEditingAnswer] = useState("");

    const [drawer, setDrawer] = useState(false);

    const [searchMultipleChoice, setSearchMultipleChoice] = useState([]);
    const [searchIndentification, setSearchIdentification] = useState([]);
    const [searchEssay, setSearchEssay] = useState([]);

    const triggerShowAnswer = () => {
        setShowAnswer((old) => !old);
    };

    const triggerRerender = () => {
        setTrigger((old) => !old);
    };

    const toggleModal = (action) => {
        if (action === "show") {
            setShowEditModal(true);
        }

        if (action === "hide") {
            setShowEditModal(false);
        }
    };

    const editingItems = (
        type,
        id,
        subject,
        chapterNo,
        specification,
        question,
        choices,
        answer
    ) => {
        setEditingType(type);
        setEditingId(id);
        setEditingSubject(subject);
        setEditingChapter(chapterNo);
        setEditingSpecification(specification);
        setEditingQuestion(question);
        setEditingChoices(choices);
        setEditingAnswer(answer);
    };

    const deleteItem = (type, id) => {
        db.collection(type)
            .doc({ id: id })
            .delete()
            .then((response) => {
                console.log(response);
                setTrigger((old) => !old);
            });
    };

    const changeExamTypeFilter = (event) => {
        const { name, checked } = event.target;

        name === "showMultipleChoice" && setShowMultipleChoice(checked);
        name === "showIdentification" && setShowIdentification(checked);
        name === "showEssay" && setShowEssay(checked);
    };

    const getData = () => {
        db.collection("multipleChoice")
            .get()
            .then((data) => setMultipleChoice(data));

        db.collection("essay")
            .get()
            .then((data) => setEssay(data));

        db.collection("identification")
            .get()
            .then((data) => setIdentification(data));
    };

    const handleCheck = (event) => {
        const { checked, name, value } = event.target;

        if (checked === true) {
            let data = { subject: name, lessonNo: value };
            setLessons((oldData) => [...oldData, data]);
        } else {
            let data = [...lessons];
            let index = data.findIndex((i) => i.subject === name && i.lessonNo === value);

            data.splice(index, 1);
            setLessons(data);
        }
    };

    const filterData = () => {
        let tempMultipleSet = [];
        let tempIdentificationSet = [];
        let tempEssaySet = [];

        lessons.forEach((lesson) => {
            let tempMultiple = multipleChoice.filter((data) => {
                return data.chapterNo === lesson.lessonNo && data.subject === lesson.subject;
            });

            tempMultipleSet = [...tempMultipleSet, ...tempMultiple];

            let tempIdentification = identification.filter((data) => {
                return data.chapterNo === lesson.lessonNo && data.subject === lesson.subject;
            });

            tempIdentificationSet = [...tempIdentificationSet, ...tempIdentification];

            let tempEssay = essay.filter((data) => {
                return data.chapterNo === lesson.lessonNo && data.subject === lesson.subject;
            });

            tempEssaySet = [...tempEssaySet, ...tempEssay];
        });

        setFilteredMultipleSet(tempMultipleSet);
        setFilteredIdentificationSet(tempIdentificationSet);
        setFilteredEssaySet(tempEssaySet);
    };

    const highlight = (answer, correct) => {
        let ans = answer.toLowerCase();
        let index = ans.charCodeAt(0) - "a".charCodeAt(0);
        return correct === index ? "answer-highlight" : "";
    };

    const applySearch = (event) => {
        const keyword = event.target.value;

        var filterSearchMultipleChoice = [];
        var filterSearchIdentificaion = [];
        var filterSearchEssay = [];

        if (keyword === "") {
            filterSearchMultipleChoice = [];
            filterSearchIdentificaion = [];
            filterSearchEssay = [];
        } else {
            filterSearchMultipleChoice = multipleChoice.filter((item) => {
                return item.question.toLowerCase().includes(keyword.toLowerCase());
            });

            filterSearchIdentificaion = identification.filter((item) => {
                return item.question.toLowerCase().includes(keyword.toLowerCase());
            });

            filterSearchEssay = essay.filter((item) => {
                return item.question.toLowerCase().includes(keyword.toLowerCase());
            });
        }

        setSearchMultipleChoice(filterSearchMultipleChoice);
        setSearchIdentification(filterSearchIdentificaion);
        setSearchEssay(filterSearchEssay);
    };

    const search = () => {
        console.log("searched");
    };

    useEffect(() => {
        getData();
    }, [trigger]);

    useEffect(() => {
        filterData();
    }, [lessons, multipleChoice, essay, identification]);

    return (
        <>
            <Head>
                <title>Test Bank</title>
            </Head>

            <div className="container-fluid">
                <div className="columns is-desktop">
                    <div className="column is-4 sidebar">
                        <div
                            className={`p-5 sidebar--content z-10 small-drawer ${
                                drawer == true ? "open" : "close"
                            }`}
                        >
                            <div
                                className="delete close-drawer"
                                onClick={() => {
                                    setDrawer((old) => !old);
                                }}
                            ></div>

                            <h1 className="title">Filter</h1>

                            <p className="is-link mb-3" onClick={triggerShowAnswer}>
                                {showAnswer ? "Hide Answer..." : "Show Answer..."}
                            </p>

                            <FilterTestBankForm
                                handleCheck={handleCheck}
                                testItems={[...multipleChoice, ...essay, ...identification]}
                                showMultipleChoice={showMultipleChoice}
                                showIdentification={showIdentification}
                                showEssay={showEssay}
                                changeExamTypeFilter={changeExamTypeFilter}
                            />
                        </div>
                    </div>
                    <div className="column is-8 question-interface small-main-interface">
                        <Navigation />

                        <div
                            className="small-drawer-button"
                            onClick={() => {
                                setDrawer((old) => !old);
                            }}
                        >
                            <span></span>
                        </div>

                        <div className="px-5 w-100">
                            <div className="is-flex">
                                <h1 className="title column">TEST BANK</h1>
                                <div className="column">
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Search"
                                            value={searchKeywords}
                                            onChange={applySearch}
                                        />
                                    </div>
                                </div>
                            </div>

                            {showEditModal && (
                                <EditModal
                                    open={showEditModal}
                                    action={toggleModal}
                                    type={editingType}
                                    id={editingId}
                                    subject={editingSubject}
                                    chapter={editingChapter}
                                    specification={editingSpecification}
                                    question={editingQuestion}
                                    choices={editingChoices}
                                    answer={editingAnswer}
                                    trigger={triggerRerender}
                                />
                            )}

                            {showMultipleChoice && (
                                <h2 className="subtitle mt-6">Multiple Choice</h2>
                            )}

                            {showMultipleChoice &&
                                searchMultipleChoice.length == 0 &&
                                filteredMultipleSet &&
                                filteredMultipleSet.map((item, index) => (
                                    <div className="card mb-3" key={index}>
                                        {/*id, subject, chapterNo, specification, question, choices, answer*/}
                                        <div className="card-content">
                                            <div className="tags">
                                                <div className="tag is-info">{item.subject}</div>
                                                <div className="tag is-info">
                                                    Chapter {item.chapterNo}
                                                </div>
                                                <div className="tag is-info">
                                                    Specification: {item.specification}
                                                </div>
                                            </div>
                                            <p>{item.question}</p>
                                            <div className="content">
                                                <ol type="A">
                                                    {item.choices.map((choice, index) => (
                                                        <li key={index}>
                                                            <span
                                                                className={
                                                                    showAnswer &&
                                                                    highlight(item.answer, index)
                                                                }
                                                            >
                                                                {choice}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                            <span
                                                className="is-link"
                                                onClick={() => {
                                                    deleteItem("multipleChoice", item.id);
                                                }}
                                            >
                                                Delete
                                            </span>
                                            <span> | </span>
                                            <span
                                                className="is-link"
                                                onClick={() => {
                                                    editingItems(
                                                        "multipleChoice",
                                                        item.id,
                                                        item.subject,
                                                        item.chapterNo,
                                                        item.specification,
                                                        item.question,
                                                        item.choices,
                                                        item.answer
                                                    );
                                                    toggleModal("show");
                                                }}
                                            >
                                                Edit
                                            </span>
                                        </div>
                                    </div>
                                ))}

                            {showMultipleChoice &&
                                searchMultipleChoice.length > 0 &&
                                searchMultipleChoice.map((item, index) => (
                                    <div className="card mb-3" key={index}>
                                        {/*id, subject, chapterNo, specification, question, choices, answer*/}
                                        <div className="card-content">
                                            <div className="tags">
                                                <div className="tag is-info">{item.subject}</div>
                                                <div className="tag is-info">
                                                    Chapter {item.chapterNo}
                                                </div>
                                                <div className="tag is-info">
                                                    Specification: {item.specification}
                                                </div>
                                                <div className="tag is-success">Search Result</div>
                                            </div>
                                            <p>{item.question}</p>
                                            <div className="content">
                                                <ol type="A">
                                                    {item.choices.map((choice, index) => (
                                                        <li key={index}>
                                                            <span
                                                                className={
                                                                    showAnswer &&
                                                                    highlight(item.answer, index)
                                                                }
                                                            >
                                                                {choice}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                            <span
                                                className="is-link"
                                                onClick={() => {
                                                    deleteItem("multipleChoice", item.id);
                                                }}
                                            >
                                                Delete
                                            </span>
                                            <span> | </span>
                                            <span
                                                className="is-link"
                                                onClick={() => {
                                                    editingItems(
                                                        "multipleChoice",
                                                        item.id,
                                                        item.subject,
                                                        item.chapterNo,
                                                        item.specification,
                                                        item.question,
                                                        item.choices,
                                                        item.answer
                                                    );
                                                    toggleModal("show");
                                                }}
                                            >
                                                Edit
                                            </span>
                                        </div>
                                    </div>
                                ))}

                            {showIdentification && (
                                <h2 className="subtitle mt-6">Identification</h2>
                            )}

                            {showIdentification &&
                                searchIndentification.length == 0 &&
                                filteredIdentificationSet &&
                                filteredIdentificationSet.map((item, index) => (
                                    <div className="card mb-3" key={index}>
                                        {/**{id, subject, chapterNo, specification, question, answer} 
                                        <div
                                            className="delete delete--item"
                                            onClick={() => {
                                                deleteItem("identification", item.id);
                                            }}
                                        ></div>*/}
                                        <div className="card-content">
                                            <div className="tags">
                                                <div className="tag is-info">{item.subject}</div>
                                                <div className="tag is-info">
                                                    Chapter {item.chapterNo}
                                                </div>
                                                <div className="tag is-info">
                                                    Specification: {item.specification}
                                                </div>
                                            </div>
                                            <p>{item.question}</p>
                                            {showAnswer && (
                                                <span className="answer-highlight">
                                                    Answer: {item.answer}
                                                </span>
                                            )}
                                            <br />
                                            <span
                                                className="is-link"
                                                onClick={() => {
                                                    deleteItem("identification", item.id);
                                                }}
                                            >
                                                Delete
                                            </span>
                                            <span> | </span>
                                            <span
                                                className="is-link"
                                                onClick={() => {
                                                    editingItems(
                                                        "identification",
                                                        item.id,
                                                        item.subject,
                                                        item.chapterNo,
                                                        item.specification,
                                                        item.question,
                                                        item.choices,
                                                        item.answer
                                                    );
                                                    toggleModal("show");
                                                }}
                                            >
                                                Edit
                                            </span>
                                        </div>
                                    </div>
                                ))}

                            {showIdentification &&
                                searchIndentification.length > 0 &&
                                searchIndentification.map((item, index) => (
                                    <div className="card mb-3" key={index}>
                                        {/**{id, subject, chapterNo, specification, question, answer} 
                                        <div
                                            className="delete delete--item"
                                            onClick={() => {
                                                deleteItem("identification", item.id);
                                            }}
                                        ></div>*/}
                                        <div className="card-content">
                                            <div className="tags">
                                                <div className="tag is-info">{item.subject}</div>
                                                <div className="tag is-info">
                                                    Chapter {item.chapterNo}
                                                </div>
                                                <div className="tag is-info">
                                                    Specification: {item.specification}
                                                </div>
                                                <div className="tag is-success">Search Result</div>
                                            </div>
                                            <p>{item.question}</p>
                                            {showAnswer && (
                                                <span className="answer-highlight">
                                                    Answer: {item.answer}
                                                </span>
                                            )}
                                            <br />
                                            <span
                                                className="is-link"
                                                onClick={() => {
                                                    deleteItem("identification", item.id);
                                                }}
                                            >
                                                Delete
                                            </span>
                                            <span> | </span>
                                            <span
                                                className="is-link"
                                                onClick={() => {
                                                    editingItems(
                                                        "identification",
                                                        item.id,
                                                        item.subject,
                                                        item.chapterNo,
                                                        item.specification,
                                                        item.question,
                                                        item.choices,
                                                        item.answer
                                                    );
                                                    toggleModal("show");
                                                }}
                                            >
                                                Edit
                                            </span>
                                        </div>
                                    </div>
                                ))}

                            {showEssay && <h2 className="subtitle mt-6">Essay</h2>}

                            {showEssay &&
                                searchEssay.length == 0 &&
                                filteredEssaySet &&
                                filteredEssaySet.map((item, index) => (
                                    <div className="card mb-3" key={index}>
                                        {/**{id, subject, chapterNo, specification, question} */}
                                        {/*<div
                                            className="delete delete--item"
                                            onClick={() => {
                                                deleteItem("essay", item.id);
                                            }}
                                        ></div>*/}
                                        <div className="card-content">
                                            <div className="tags">
                                                <div className="tag is-info">{item.subject}</div>
                                                <div className="tag is-info">
                                                    Chapter {item.chapterNo}
                                                </div>
                                                <div className="tag is-info">
                                                    Specification: {item.specification}
                                                </div>
                                            </div>
                                            <p>{item.question}</p>
                                            <br />
                                            <span
                                                className="is-link"
                                                onClick={() => {
                                                    deleteItem("essay", item.id);
                                                }}
                                            >
                                                Delte
                                            </span>
                                            <span> | </span>
                                            <span
                                                className="is-link"
                                                onClick={() => {
                                                    editingItems(
                                                        "essay",
                                                        item.id,
                                                        item.subject,
                                                        item.chapterNo,
                                                        item.specification,
                                                        item.question,
                                                        item.choices,
                                                        item.answer
                                                    );
                                                    toggleModal("show");
                                                }}
                                            >
                                                Edit
                                            </span>
                                        </div>
                                    </div>
                                ))}

                            {showEssay &&
                                searchEssay.length > 0 &&
                                searchEssay.map((item, index) => (
                                    <div className="card mb-3" key={index}>
                                        {/**{id, subject, chapterNo, specification, question} */}
                                        {/*<div
                                            className="delete delete--item"
                                            onClick={() => {
                                                deleteItem("essay", item.id);
                                            }}
                                        ></div>*/}
                                        <div className="card-content">
                                            <div className="tags">
                                                <div className="tag is-info">{item.subject}</div>
                                                <div className="tag is-info">
                                                    Chapter {item.chapterNo}
                                                </div>
                                                <div className="tag is-info">
                                                    Specification: {item.specification}
                                                </div>
                                                <div className="tag is-success">Search Result</div>
                                            </div>
                                            <p>{item.question}</p>
                                            <br />
                                            <span
                                                className="is-link"
                                                onClick={() => {
                                                    deleteItem("essay", item.id);
                                                }}
                                            >
                                                Delte
                                            </span>
                                            <span> | </span>
                                            <span
                                                className="is-link"
                                                onClick={() => {
                                                    editingItems(
                                                        "essay",
                                                        item.id,
                                                        item.subject,
                                                        item.chapterNo,
                                                        item.specification,
                                                        item.question,
                                                        item.choices,
                                                        item.answer
                                                    );
                                                    toggleModal("show");
                                                }}
                                            >
                                                Edit
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestBank;
