import { useState, useEffect } from "react";

const FilterTestBankForm = ({
    handleCheck,
    testItems,
    showMultipleChoice,
    showIdentification,
    showEssay,
    changeExamTypeFilter,
}) => {
    const [subjects, setSubjects] = useState([]);
    const [listItems, setListItems] = useState([]);

    const filterSubjects = () => {
        let temp = Array.from(new Set(testItems.map((item) => item.subject)));
        setSubjects(temp);
    };

    const getLessons = () => {
        let temp = [];

        subjects.forEach((subjectName) => {
            let filtered = testItems.filter((item) => {
                return item.subject == subjectName;
            });

            let filteredLessons = Array.from(new Set(filtered.map((filter) => filter.chapterNo)));

            filteredLessons.sort((a, b) => a - b);

            temp.push({ subject: subjectName, lessons: filteredLessons });
        });

        setListItems(temp);
    };

    useEffect(() => {
        filterSubjects();
        getLessons();
    }, [testItems]);

    return (
        <form>
            <div className="mb-5">
                <h2 className="subtitle mb-2">Filter Items by Exam Type</h2>

                <div className="control mb-1">
                    <label htmlFor="showMultipleChoice" className="checkbox">
                        <input
                            type="checkbox"
                            name="showMultipleChoice"
                            id="showMultipleChoice"
                            checked={showMultipleChoice}
                            onChange={changeExamTypeFilter}
                        />
                        <span className="ml-2">Multiple Choice</span>
                    </label>
                </div>

                <div className="control mb-1">
                    <label htmlFor="showIdentification" className="checkbox">
                        <input
                            type="checkbox"
                            name="showIdentification"
                            id="showIdentification"
                            checked={showIdentification}
                            onChange={changeExamTypeFilter}
                        />
                        <span className="ml-2">Identification</span>
                    </label>
                </div>

                <div className="control">
                    <label htmlFor="showEssay" className="checkbox">
                        <input
                            type="checkbox"
                            name="showEssay"
                            id="showEssay"
                            checked={showEssay}
                            onChange={changeExamTypeFilter}
                        />
                        <span className="ml-2">Essay</span>
                    </label>
                </div>
            </div>

            {listItems.map((item, index) => (
                <details className="mb-5" key={index}>
                    <summary className="subtitle mb-2 summary-subject-list">{item.subject}</summary>

                    {item.lessons.map((lesson, index) => (
                        <div className="control mb-1" key={index}>
                            <label htmlFor={`${item.subject}-${lesson}`} className="checkbox">
                                <input
                                    type="checkbox"
                                    name={item.subject}
                                    id={`${item.subject}-${lesson}`}
                                    onChange={handleCheck}
                                    value={lesson}
                                />
                                <span className="ml-2">Chapter {lesson}</span>
                            </label>
                        </div>
                    ))}
                </details>
            ))}
        </form>
    );
};

export default FilterTestBankForm;
