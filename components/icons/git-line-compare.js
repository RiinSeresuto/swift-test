const GitLineCompare = ({ size, color }) => {
    return (
        <>
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M18 14C16.3431 14 15 15.3431 15 17C15 18.6569 16.3431 20 18 20C19.6569 20 21 18.6569 21 17C21 15.3431 19.6569 14 18 14ZM18 14V9C18 7.89543 17.1046 7 16 7H15M13 7L15 5V7M13 7H15M13 7L15 9V7"
                    stroke={color ? color : "#000000"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
                <path
                    d="M6 11C7.65685 11 9 9.65685 9 8C9 6.34315 7.65685 5 6 5C4.34315 5 3 6.34315 3 8C3 9.65685 4.34315 11 6 11ZM6 11V16C6 17.1046 6.89543 18 8 18H9M11 18L9 20V18M11 18H9M11 18L9 16V18"
                    stroke={color ? color : "#000000"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
            </svg>
        </>
    );
};

export default GitLineCompare;
