import Link from "next/link";
import Settings from "../components/icons/settings";
import GitLineCompare from "../components/icons/git-line-compare";
import RadioList from "../components/icons/radio-list";
import PlusClipboard from "../components/icons/plus-clipboard";

const Nav = () => {
    const size = "85px";
    const color = "#363636";

    return (
        <section className="mb-4 w-100">
            <div className="nav is-flex is-justify-content-space-evenly is-align-items-center">
                <Link href="/" className="nav--link">
                    <div className="nav--link--buttons is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
                        <PlusClipboard size={size} color={color} />
                        <div>ADD ITEM</div>
                    </div>
                </Link>
                <Link href="/test-bank" className="nav--link">
                    <div className="nav--link--buttons is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
                        <RadioList size={size} color={color} />
                        <div>TEST BANK</div>
                    </div>
                </Link>
                <Link href="/generate" className="nav--link">
                    <div className="nav--link--buttons is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
                        <GitLineCompare size={size} color={color} />
                        <div>GENERATE</div>
                    </div>
                </Link>
                <Link href="/settings" className="nav--link">
                    <div className="nav--link--buttons is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
                        <Settings size={size} color={color} />
                        <div>SETTINGS</div>
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default Nav;
