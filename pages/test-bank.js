import Head from "next/head";
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import FilterTestBankForm from "../components/FilterTestBankForm";
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

    const triggerShowAnswer = () => {
        setShowAnswer((old) => !old);
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

            //log(lesson); subject: 'Physical Science-2', lessonNo: '2'
        });

        setFilteredMultipleSet(tempMultipleSet);
        setFilteredIdentificationSet(tempIdentificationSet);
        setFilteredEssaySet(tempEssaySet);
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        filterData();
    }, [lessons]);

    return (
        <>
            <Head>
                <title>Test Bank</title>
            </Head>

            <div className="container-fluid">
                <div className="columns is-desktop">
                    <div className="column is-4 sidebar">
                        <div className="p-5 sidebar--content z-10">
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
                    <div className="column is-8 question-interface">
                        <Navigation />

                        <div className="px-5 w-100">
                            <h1 className="title">TEST BANK</h1>

                            {showMultipleChoice && (
                                <h2 className="subtitle mt-6">Multiple Choice</h2>
                            )}

                            {showMultipleChoice &&
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
                                                        <li key={index}>{choice}</li>
                                                    ))}
                                                </ol>
                                            </div>
                                            {showAnswer && `Answer: ${item.answer}`}
                                        </div>
                                    </div>
                                ))}

                            {showIdentification && (
                                <h2 className="subtitle mt-6">Identification</h2>
                            )}

                            {showIdentification &&
                                filteredIdentificationSet &&
                                filteredIdentificationSet.map((item, index) => (
                                    <div className="card mb-3" key={index}>
                                        {/**{id, subject, chapterNo, specification, question, answer} */}
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
                                            {showAnswer && `Answer: ${item.answer}`}
                                        </div>
                                    </div>
                                ))}

                            {showEssay && <h2 className="subtitle mt-6">Essay</h2>}

                            {showEssay &&
                                filteredEssaySet &&
                                filteredEssaySet.map((item, index) => (
                                    <div className="card mb-3" key={index}>
                                        {/**{id, subject, chapterNo, specification, question} */}
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
