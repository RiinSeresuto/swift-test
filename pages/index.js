import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import style from "../styles/Splash.module.css";
import logo from "../images/swift-test-logo.png";
import Tutorial from "../components/Tutorial";

const Home = () => {
    const [open, setOpen] = useState(false);

    const modal = (action) => {
        if (action == "hide") {
            setOpen(false);
        }

        if (action == "show") {
            setOpen(true);
        }
    };

    useEffect(() => {
        console.log(open);
    }, [open]);

    return (
        <>
            <Head>
                <title>Swift Test</title>
            </Head>
            <main
                className={`${style.main} is-flex is-flex-direction-column is-flex-wrap-wrap is-justify-content-center is-align-content-center`}
            >
                <div
                    className={`${style.center} p-6 is-flex is-flex-direction-column is-justify-content-center`}
                >
                    <div className="is-flex is-justify-content-center">
                        <Image src={logo} width={150} height={150} alt="Swift Test Logo" />
                    </div>
                    <div className="mt-5">
                        <div className="title has-text-centered">
                            <h1>SWIFT TEST</h1>
                        </div>
                    </div>
                    <div className="my-3">
                        <div className="subtitle has-text-centered">
                            <h2>
                                Fast and intuitive application designed to help educators for
                                generating test paper on the fly.
                            </h2>
                        </div>
                    </div>
                    <div className="actions mt-3">
                        <div className={style.buttons}>
                            <div className="columns">
                                <div className="home-cta column is-flex is-justify-content-end">
                                    <Link href="/add" className="button is-info">
                                        HOME
                                    </Link>
                                </div>
                                <div className="home-cta column is-flex is-justify-content-start">
                                    <button
                                        className="button is-info"
                                        data-target="tutorial"
                                        onClick={() => modal("show")}
                                    >
                                        Overview
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/** tutorial modal */}
            <div className={`modal ${open && "is-active"}`} id="tutorial">
                <div className="modal-background" onClick={() => modal("hide")}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Overview</p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={() => modal("hide")}
                        ></button>
                    </header>
                    <section className="modal-card-body" style={{ backgroundColor: "#f5f5f5" }}>
                        <Tutorial />
                    </section>
                    <footer className="modal-card-foot">
                        <Link className="button is-info" href="/add">
                            Start
                        </Link>
                        <button className="button" onClick={() => modal("hide")}>
                            Done
                        </button>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Home;
