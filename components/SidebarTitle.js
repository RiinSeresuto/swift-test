import Link from "next/link";

const SidebarTitle = () => {
    return (
        <div className="content">
            <Link href="/">
                <h2 className="has-text-centered mb-0">SWIFT TEST</h2>
                <h5 className="has-text-centered">A TEST PAPER GENERATOR</h5>
            </Link>
        </div>
    );
};

export default SidebarTitle;
