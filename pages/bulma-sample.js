import Head from "next/head";

export default function Bulma() {
    return (
        <>
            <Head>
                <title>Bulma</title>
            </Head>

            <main>
                <button className="button is-primary mr-4">Info Button</button>
                <button className="button is-success">Success Button</button>

                <div className="card">
                    <div className="card-content">Content of the card</div>
                </div>

                <section id="columns" className="mb-6">
                    <h1 className="title">Columns</h1>
                    <h2 className="subtitle">Basics</h2>
                    <div class="columns">
                        <div class="column has-background-primary-dark has-text-primary-light">
                            First column
                        </div>
                        <div class="column has-background-primary-dark has-text-primary-light">
                            Second column
                        </div>
                        <div class="column has-background-primary-dark has-text-primary-light">
                            Third column
                        </div>
                        <div class="column has-background-primary-dark has-text-primary-light">
                            Fourth column
                        </div>
                    </div>

                    <h2 className="subtitle">Sizes</h2>
                    <div className="columns">
                        <div className="column is-1 has-background-info-dark has-text-info-light">
                            is-1
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-2 has-background-info-dark has-text-info-light">
                            is-2
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-3 has-background-info-dark has-text-info-light">
                            is-3
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-4 has-background-info-dark has-text-info-light">
                            is-4
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-5 has-background-info-dark has-text-info-light">
                            is-5
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-6 has-background-info-dark has-text-info-light">
                            is-6
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-7 has-background-info-dark has-text-info-light">
                            is-7
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-8 has-background-info-dark has-text-info-light">
                            is-8
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-9 has-background-info-dark has-text-info-light">
                            is-9
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-10 has-background-info-dark has-text-info-light">
                            is-10
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-11 has-background-info-dark has-text-info-light">
                            is-11
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-12 has-background-info-dark has-text-info-light">
                            is-12
                        </div>
                    </div>
                    <div className="columns is-variable is-3">
                        <div className="column is-one-third has-background-info-dark has-text-info-light">
                            is-one-third
                        </div>
                        <div className="column is-one-third has-background-info-dark has-text-info-light">
                            is-one-third
                        </div>
                        <div className="column is-one-third has-background-info-dark has-text-info-light">
                            is-one-third
                        </div>
                    </div>
                </section>

                <section id="elements" className="mb-6">
                    <h1 className="title">Elements</h1>

                    <div id="elements-block">
                        <h2 className="subtitle">Block</h2>
                        <div className="block">Sample Block</div>
                        <div className="block">Sample Block</div>
                    </div>

                    <hr />

                    <div id="elements-box">
                        <h2 className="subtitle">Box</h2>
                        <div class="box">I'm in a box.</div>
                    </div>

                    <hr />

                    <div id="elements-button">
                        <h2 className="subtitle">Buttons</h2>
                        <div className="buttons">
                            <button class="button is-white">White</button>
                            <button class="button is-light">Light</button>
                            <button class="button is-dark">Dark</button>
                            <button class="button is-black">Black</button>
                            <button class="button is-text">Text</button>
                            <button class="button is-ghost">Ghost</button>
                        </div>

                        <div className="buttons">
                            <button class="button is-primary">Primary</button>
                            <button class="button is-link">Link</button>
                            <button class="button is-info">Info</button>
                            <button class="button is-success">Success</button>
                            <button class="button is-warning">Warning</button>
                            <button class="button is-danger">Danger</button>
                        </div>

                        <div className="buttons">
                            <button class="button is-primary is-light">Primary</button>
                            <button class="button is-link is-light">Link</button>
                            <button class="button is-info is-light">Info</button>
                            <button class="button is-success is-light">Success</button>
                            <button class="button is-warning is-light">Warning</button>
                            <button class="button is-danger is-light">Danger</button>
                        </div>

                        <div className="buttons is-responsive">
                            <button class="button is-responsive">Responsive Default</button>
                            <button class="button is-normal is-responsive">
                                Responsive Normal
                            </button>
                        </div>

                        <div className="buttons is-responsive">
                            <button class="button is-outlined">Outlined</button>
                            <button class="button is-primary is-outlined">Outlined</button>
                            <button class="button is-link is-outlined">Outlined</button>
                            <button class="button is-info is-outlined">Outlined</button>
                            <button class="button is-success is-outlined">Outlined</button>
                            <button class="button is-danger is-outlined">Outlined</button>
                        </div>
                    </div>

                    <hr />

                    <div id="elements-delete">
                        <div className="subtitle">Delete</div>
                        <button class="delete is-small"></button>
                        <button class="delete"></button>
                        <button class="delete is-medium"></button>
                        <button class="delete is-large"></button>

                        <div class="block">
                            <span class="tag is-success">
                                Hello World
                                <button class="delete is-small"></button>
                            </span>
                        </div>

                        <div class="notification is-danger">
                            <button class="delete"></button>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum
                            dolor sit amet, consectetur adipiscing elit
                        </div>

                        <article class="message is-info">
                            <div class="message-header">
                                Info
                                <button class="delete"></button>
                            </div>
                            <div class="message-body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Pellentesque risus mi, tempus quis placerat ut, porta nec nulla.
                                Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus
                                diam, et dictum felis venenatis efficitur. Aenean ac eleifend lacus,
                                in mollis lectus. Donec sodales, arcu et sollicitudin porttitor,
                                tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui
                                urna, vehicula et sem eget, facilisis sodales sem.
                            </div>
                        </article>
                    </div>

                    <hr />

                    <div id="elements-icon">
                        <h2 className="subtitle">Icon</h2>

                        <span class="icon">
                            <i class="fas fa-home"></i>
                        </span>

                        <span class="icon-text">
                            <span class="icon">
                                <i class="fas fa-home"></i>
                            </span>
                            <span>Home</span>
                        </span>
                    </div>
                </section>
            </main>
        </>
    );
}
