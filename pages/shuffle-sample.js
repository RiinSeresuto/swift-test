import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import shuffle from "../lib/FisherYatesShuffle";

export default function ShuffleSample() {
    const [numbers, setNumbers] = useState([]);

    const shuffleNumber = () => {
        setNumbers(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
    };

    return (
        <>
            <Head>
                <title>Shuffle Sample</title>
            </Head>
            <section className="container">
                <h1 className="mb-6">Shuffle Numbers</h1>

                <Link href="/">Back to Home</Link>

                <button className="button is-primary mb-4" onClick={shuffleNumber}>
                    Reshuffle
                </button>
                {numbers.map((number) => {
                    return (
                        <div className="card mb-5" key={number}>
                            <div className="card-content">{number}</div>
                        </div>
                    );
                })}
            </section>
        </>
    );
}
