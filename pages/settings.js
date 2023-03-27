import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "../images/swift-test-logo.png";
import Navigation from "../components/Navigation";
import SettingsForm from "../components/settingsform";
import { db } from "../lib/Database";
import DeleteBin from "../components/icons/delete-bin";
import BackupData from "../components/BackupData";
import ImportData from "../components/ImportData";

const Settings = () => {
    const [newSubject, setNewSubject] = useState("");
    const [newSpecification, setNewSpecification] = useState("");
    const [subjectList, setSubjectList] = useState([]);
    const [specificationList, setSpecificationList] = useState([]);
    const [trigger, setTrigger] = useState(false);

    const [drawer, setDrawer] = useState(false);

    useEffect(() => {
        getNewData();
    }, [trigger]);

    const changeTrigger = () => {
        setTrigger((value) => !value);
    };

    const getNewData = () => {
        db.collection("subjects")
            .get()
            .then((subjects) => {
                setSubjectList(subjects);
            });

        db.collection("specifications")
            .get()
            .then((values) => {
                setSpecificationList(values);
            });
    };

    const submitForm = (event, table) => {
        event.preventDefault();
        let uuid = crypto.randomUUID();

        if (table === "subjects") {
            db.collection(table).add(
                {
                    id: uuid,
                    subjectName: newSubject,
                },
                uuid
            );
        }

        if (table === "specifications") {
            db.collection(table).add(
                {
                    id: uuid,
                    specificationsName: newSpecification,
                },
                uuid
            );
        }

        getNewData();
        changeTrigger();
        setNewSubject("");
    };

    const onChange = (event) => {
        event.target.name == "subjects" && setNewSubject(event.target.value);
        event.target.name == "specifications" && setNewSpecification(event.target.value);
    };

    const deleteItem = (table, key) => {
        console.log("Item Deleted ==>", table, "==>", key);
        db.collection(table)
            .doc(key)
            .delete()
            .then((res) => {
                changeTrigger();
            });
    };

    return (
        <>
            <Head>
                <title>Settings</title>
            </Head>

            <div className="container-fluid">
                <div className="columns is-desktop">
                    <div className="column is-4 sidebar">
                        <div className="sidebar--content settings-mobile-sidebar-hide is-flex is-flex-direction-column is-justify-content-center is-align-items-center p-6">
                            <div className="content">
                                <div className="logo-area is-flex is-justify-content-center">
                                    <Image
                                        src={logo}
                                        width={100}
                                        height={100}
                                        alt="Swift Test Logo"
                                    />
                                </div>

                                <h2 className="has-text-centered">SwiftTest</h2>
                                <p className="has-text-centered">
                                    Fast and intuitive application designed to help educators for
                                    generating test paper on the fly.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="column is-8 question-interface small-main-interface">
                        <Navigation />

                        <div className="px-5 w-100">
                            <h1 className="title">SETTINGS</h1>
                            <hr />

                            <h2 className="subtitle">Subject Settings</h2>

                            <div className="columns">
                                <div className="column">
                                    <table className="table is-fullwidth is-hoverable">
                                        <thead>
                                            <tr>
                                                <th>List of Subjects</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subjectList.map((subjects, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="is-flex is-justify-content-center is-align-items-center">
                                                            <div>{subjects.subjectName}</div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="button is-danger"
                                                            onClick={() =>
                                                                deleteItem("subjects", subjects.id)
                                                            }
                                                        >
                                                            <DeleteBin
                                                                size={"15px"}
                                                                color={"#fff"}
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="column">
                                    <SettingsForm
                                        submitForm={() => submitForm(event, "subjects")}
                                        updateState={onChange}
                                        newSubject={newSubject}
                                        name={"subjects"}
                                        placeholder={"Biology"}
                                    />
                                </div>
                            </div>

                            <hr />
                            <h2 className="subtitle">Specification Settings</h2>
                            <div className="columns">
                                <div className="column">
                                    <table className="table is-fullwidth is-hoverable">
                                        <thead>
                                            <tr>
                                                <th>List of Specifications</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {specificationList.map((specification, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="is-flex is-justify-content-center is-align-items-center">
                                                            <div>
                                                                {specification.specificationsName}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="button is-danger"
                                                            onClick={() =>
                                                                deleteItem(
                                                                    "specifications",
                                                                    specification.id
                                                                )
                                                            }
                                                        >
                                                            <DeleteBin
                                                                size={"15px"}
                                                                color={"#fff"}
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="column">
                                    <SettingsForm
                                        submitForm={() => submitForm(event, "specifications")}
                                        updateState={onChange}
                                        newSpecification={newSpecification}
                                        name={"specifications"}
                                        placeholder={"Remembering"}
                                    />
                                </div>
                            </div>

                            <hr />
                            <h2 className="subtitle">Backup Data</h2>
                            <div>
                                <BackupData
                                    subjectsData={subjectList}
                                    specificationData={specificationList}
                                    refreshTrigger={setTrigger}
                                />
                            </div>

                            <hr />
                            <h2 className="subtitle">Import Data</h2>
                            <div>
                                <ImportData refreshTrigger={setTrigger} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
