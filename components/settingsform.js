const SettingsForm = ({ submitForm, updateState, name, placeholder }) => {
    const clearForm = (event) => {
        event.preventDefault;

        var settingsInput = document.querySelectorAll(".input");

        submitForm();

        settingsInput.forEach((input) => (input.value = ""));
    };

    return (
        <form>
            <div className="field">
                <label htmlFor="subject" className="label">
                    Add New {name.charAt(0).toUpperCase() + name.slice(1)}
                </label>
                <div className="control">
                    <input
                        type="text"
                        name={name}
                        id={name}
                        className="input"
                        placeholder={placeholder}
                        onChange={updateState}
                    />
                </div>
            </div>
            <div className="control">
                <button type="submit" className="button is-info" onClick={clearForm}>
                    Add {name.charAt(0).toUpperCase() + name.slice(1)}
                </button>
            </div>
        </form>
    );
};

export default SettingsForm;
