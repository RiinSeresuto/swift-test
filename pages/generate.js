import Head from "next/head";
import { useState, useEffect } from "react";
import { db } from "../lib/Database";
import Navigation from "../components/Navigation";
import GenerateSidebar from "../components/GenerateSidebar";
import shuffle from "../lib/FisherYatesShuffle";

const { log, table } = console;

/**
 * specification data type
 * [
 *      {
 *          name: "specification"
 *          data: [{}, {}, {}]
 *      }
 *      {
 *          name: "specification"
 *          data: [{}, {}, {}]
 *      }
 * ]
 *
 * TODO
 * [/] after chapters are selected, shuffle
 * [/] filter each specification, save in own variable or in an array of object
 * [ ] get user input on how many items per specification
 * [ ] get the first N of each specification
 * [ ] save all specification in one variable
 * [ ] shuffle all specification
 */

const Generate = () => {
    const [multipleChoice, setMultipleChoice] = useState([]);
    const [identification, setIdentification] = useState([]);
    const [essay, setEssay] = useState([]);

    const [selectedSubject, setSelectedSubject] = useState("");
    const [availableChapters, setAvailableChapters] = useState([]);
    const [selectedChapters, setSelectedChapters] = useState([]);

    const [selectedChaptersMultipleChoice, setSelectedChaptersMultipleChoice] = useState([]);
    const [selectedChaptersIdentification, setSelectedChaptersIdentification] = useState([]);
    const [selectedChaptersEssay, setSelectedChaptersEssay] = useState([]);

    const [shuffledSelectedMultipleChoice, setShuffledSelectedMultipleChoice] = useState([]);
    const [shuffledSelectedIdentification, setShuffledSelectedIdentification] = useState([]);
    const [shuffledSelectedEssay, setShuffledSelectedEssay] = useState([]);

    const [specificationMultipleChoice, setSpecificationMultipleChoice] = useState([]);
    const [specificationIdentification, setSpecificationIdentification] = useState([]);
    const [specificationEssay, setSpecificationEssay] = useState([]);

    const getData = () => {
        db.collection("multipleChoice")
            .get()
            .then((data) => setMultipleChoice(data));

        db.collection("identification")
            .get()
            .then((data) => setIdentification(data));

        db.collection("essay")
            .get()
            .then((data) => setEssay(data));
    };

    const selectingSubject = (event) => {
        const { value } = event.target;

        setSelectedSubject(value);
        setSelectedChapters([]);
    };

    const getAvailableLessons = () => {
        const subjectList = [...multipleChoice, ...identification, ...essay];
        const filteredSubject = subjectList.filter((item) => {
            return item.subject == selectedSubject;
        });

        let tempLessons = Array.from(new Set(filteredSubject.map((item) => item.chapterNo)));

        setAvailableChapters(tempLessons);
    };

    const selectingAvailableChapters = (event) => {
        const { checked, value } = event.target;

        if (checked === true) {
            setSelectedChapters((old) => [...old, value]);
        } else {
            let tempData = [...selectedChapters];
            let index = tempData.indexOf(value);

            tempData.splice(index, 1);

            setSelectedChapters(tempData);
        }
    };

    const getSelectedChapters = () => {
        let tempSelectedChaptersMultipleChoice = [];
        let tempSelectedChaptersIdentification = [];
        let tempSelectedChaptersEssay = [];

        selectedChapters.forEach((chapter) => {
            let tempFilterMultiple = multipleChoice.filter((item) => {
                return item.chapterNo === chapter && item.subject === selectedSubject;
            });

            let tempFilterIdentification = identification.filter((item) => {
                return item.chapterNo === chapter && item.subject === selectedSubject;
            });

            let tempFilterEssay = essay.filter((item) => {
                return item.chapterNo === chapter && item.subject === selectedSubject;
            });

            tempSelectedChaptersMultipleChoice = [
                ...tempSelectedChaptersMultipleChoice,
                ...tempFilterMultiple,
            ];

            tempSelectedChaptersIdentification = [
                ...tempSelectedChaptersIdentification,
                ...tempFilterIdentification,
            ];

            tempSelectedChaptersEssay = [...tempSelectedChaptersEssay, ...tempFilterEssay];
        });

        setSelectedChaptersMultipleChoice(tempSelectedChaptersMultipleChoice);
        setSelectedChaptersIdentification(tempSelectedChaptersIdentification);
        setSelectedChaptersEssay(tempSelectedChaptersEssay);
    };

    const shuffleSelectedChapters = () => {
        setShuffledSelectedMultipleChoice(shuffle(selectedChaptersMultipleChoice));
        setShuffledSelectedIdentification(shuffle(selectedChaptersIdentification));
        setShuffledSelectedEssay(shuffle(selectedChaptersEssay));
    };

    const getFilteredAvailableSpecification = () => {
        let tempSpecificationMultipleChoice = [];
        let tempSpecificationIdentification = [];
        let tempSpecificationEssay = [];

        let tempMultipleChoiceSpecification = Array.from(
            new Set(shuffledSelectedMultipleChoice.map((item) => item.specification))
        );

        let tempIdentificationSpecification = Array.from(
            new Set(shuffledSelectedIdentification.map((item) => item.specification))
        );

        let tempEssaySpecification = Array.from(
            new Set(shuffledSelectedEssay.map((item) => item.specification))
        );

        tempMultipleChoiceSpecification.forEach((specification) => {
            let temp = shuffledSelectedMultipleChoice.filter((item) => {
                return item.specification === specification;
            });

            tempSpecificationMultipleChoice = [
                ...tempSpecificationMultipleChoice,
                { name: specification, data: temp },
            ];
        });

        tempIdentificationSpecification.forEach((specification) => {
            let temp = shuffledSelectedIdentification.filter((item) => {
                return item.specification === specification;
            });

            tempSpecificationIdentification = [
                ...tempSpecificationIdentification,
                { name: specification, data: temp },
            ];
        });

        tempEssaySpecification.forEach((specification) => {
            let temp = shuffledSelectedEssay.filter((item) => {
                return item.specification === specification;
            });

            tempSpecificationEssay = [
                ...tempSpecificationEssay,
                { name: specification, data: temp },
            ];
        });

        setSpecificationMultipleChoice(tempSpecificationMultipleChoice);
        setSpecificationIdentification(tempSpecificationIdentification);
        setSpecificationEssay(tempSpecificationEssay);
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getAvailableLessons();
    }, [selectedSubject]);

    useEffect(() => {
        getSelectedChapters();
    }, [selectedChapters]);

    useEffect(() => {
        shuffleSelectedChapters();
    }, [selectedChaptersMultipleChoice, selectedChaptersIdentification, selectedChaptersEssay]);

    useEffect(() => {
        getFilteredAvailableSpecification();
    }, [shuffledSelectedMultipleChoice, shuffledSelectedIdentification, shuffledSelectedEssay]);

    return (
        <>
            <Head>
                <title>Generate</title>
            </Head>

            <div className="container-fluid">
                <div className="columns">
                    <div className="column is-4 sidebar">
                        <div className="p-5 sidebar--content z-10">
                            <GenerateSidebar
                                testItems={[...multipleChoice, ...identification, ...essay]}
                                selectingSubject={selectingSubject}
                                availableChapters={availableChapters}
                                selectingAvailableChapters={selectingAvailableChapters}
                                selectedChapters={selectedChapters}
                                specificationMultipleChoice={specificationMultipleChoice}
                                specificationIdentification={specificationIdentification}
                                specificationEssay={specificationEssay}
                            />
                        </div>
                    </div>
                    <div className="column is-8 question-interface">
                        <Navigation />

                        <div className="px-5 w-100">
                            <h1 className="title">GENERATE</h1>
                        </div>

                        {selectedChapters.map((chapter, index) => (
                            <p key={index}>Chapter | {chapter}</p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Generate;
