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

                <div className="control">
                    <label htmlFor="showMultipleChoice" className="checkbox">
                        <input
                            type="checkbox"
                            name="showMultipleChoice"
                            id="showMultipleChoice"
                            checked={showMultipleChoice}
                            onChange={changeExamTypeFilter}
                        />
                        Multiple Choice
                    </label>
                </div>

                <div className="control">
                    <label htmlFor="showIdentification" className="checkbox">
                        <input
                            type="checkbox"
                            name="showIdentification"
                            id="showIdentification"
                            checked={showIdentification}
                            onChange={changeExamTypeFilter}
                        />
                        Identification
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
                        Essay
                    </label>
                </div>
            </div>

            {listItems.map((item, index) => (
                <div className="mb-5" key={index}>
                    <h2 className="subtitle mb-2">{item.subject}</h2>

                    {item.lessons.map((lesson, index) => (
                        <div className="control" key={index}>
                            <label htmlFor={`${item.subject}-${lesson}`} className="checkbox">
                                <input
                                    type="checkbox"
                                    name={item.subject}
                                    id={`${item.subject}-${lesson}`}
                                    onChange={handleCheck}
                                    value={lesson}
                                />
                                Chapter {lesson}
                            </label>
                        </div>
                    ))}
                </div>
            ))}
        </form>
    );
};

export default FilterTestBankForm;
