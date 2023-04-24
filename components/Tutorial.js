import Image from "next/image";
import NavPointingAdd from "../images/tuts/nav-pointing-add-item.png";
import SidebarAddItem from "../images/tuts/sidebar-add-item.png";
import AddItemPreview from "../images/tuts/add-item-preview.png";
import NavPointingTestBank from "../images/tuts/nav-pointing-test-bank.png";
import SidebarTestBank from "../images/tuts/sidebar-test-bank.png";
import TestBankSearch from "../images/tuts/test-bank-search.png";
import TestBankFilter from "../images/tuts/test-bank-filter.png";
import NavPointingGenerate from "../images/tuts/nav-pointing-generate.png";
import SidebarTopGenerate from "../images/tuts/sidebar-top-generate.png";
import SidebarDownGenerate from "../images/tuts/sidebar-down-generate.png";
import GenerateMain from "../images/tuts/generate-main.png";
import NavPointingSettings from "../images/tuts/nav-pointing-settings.png";
import SettingsTop from "../images/tuts/settings-top.png";
import SettingsDown from "../images/tuts/settings-down.png";

const Tutorial = () => {
    return (
        <div className="content">
            <h3>Adding Item</h3>
            <Image src={NavPointingAdd} placeholder="blur" />
            <div className="is-flex is-justify-content-space-between is-align-items-center">
                <div style={{ width: "40%" }}>
                    <Image src={SidebarAddItem} placeholder="blur" />
                </div>
                <div style={{ width: "50%" }}>
                    <p>
                        To begin adding questions to the test bank, you need to fill up what is
                        being asked on the form placed on the sidebar of the application
                    </p>
                </div>
            </div>
            <p>
                While filling up the form in the sidebar, the preview of your inputs will be
                reflected in an instance in the right screen.
            </p>
            <Image src={AddItemPreview} placeholder="blur" />

            <h3>Viewing the Test Bank</h3>
            <Image src={NavPointingTestBank} placeholder="blur" />
            <div className="is-flex is-justify-content-space-between is-align-items-center">
                <div style={{ width: "50%" }}>
                    <p>
                        On the test bank page, where you can view the saved test items, the sidebar
                        is the area where you can filter the items you wanted to view. There are
                        checkboxes that corresponds on the category of the test item, in which you
                        can check if you want to view test items with that category.
                    </p>
                </div>
                <div style={{ width: "40%" }}>
                    <Image src={SidebarTestBank} placeholder="blur" />
                </div>
            </div>
            <Image src={TestBankSearch} placeholder="blur" />
            <p>
                Another filtering method is by using the search bar on top of the main interface.
                Type a keyword on the field and check the exam type in the sidebar. Once you enter
                any characters on the search bar, any items that has an exact words on the question,
                will appear below the search bar.
            </p>
            <Image src={TestBankFilter} placeholder="blur" />
            <p>
                The filtered list will also enable you to delete an item and modify any data of the
                choosen test item
            </p>

            <h3>Generating Test Item</h3>
            <Image src={NavPointingGenerate} placeholder="blur" />
            <div className="is-flex is-justify-content-space-between is-align-items-center">
                <div style={{ width: "40%" }}>
                    <Image src={SidebarTopGenerate} placeholder="blur" />
                </div>
                <div style={{ width: "50%" }}>
                    <p>
                        The sidebar shows the available subjects that are saved in the test bank.
                        One you are done selecting one subject, a list of available chapters under
                        that subject will be listed below.
                    </p>
                </div>
            </div>
            <div className="is-flex is-justify-content-space-between is-align-items-center">
                <div style={{ width: "50%" }}>
                    <p>
                        Scroll down on the sidebar, a list of specifications and count under the
                        selected chapters will appear. This is where you can specify the number of
                        test item you want to be in the test paper.
                    </p>
                </div>
                <div style={{ width: "40%" }}>
                    <Image src={SidebarDownGenerate} placeholder="blur" />
                </div>
            </div>
            <p>
                The main interface of the generate page is divided in to two columns. The first is a
                form fields wherein you can type additional information of for the test paper and
                the second column is a preview of the generated test paper that will update
                everytime there is changes.
            </p>
            <Image src={GenerateMain} placeholder="blur" />

            <h3>The Settings Page</h3>
            <Image src={NavPointingSettings} placeholder="blur" />
            <p>
                Settings page might probably the first page you will visit on first use of this
                application on new devices.
            </p>
            <Image src={SettingsTop} placeholder="blur" />
            <p>
                This is where you can see and add subjects and specifications that will be needed in
                saving test items in your test bank.
            </p>
            <Image src={SettingsDown} placeholder="blur" />
            <p>
                And scroll down on the settings page, you can see a component where you can backup
                and import data of your test bank. This is usable if you want to use this
                application on another devices.
            </p>
            <hr />
            <p>
                That's it! With these simple descriptions, you can easily generate a test paper
                using Swift Test.
            </p>
        </div>
    );
};

export default Tutorial;
