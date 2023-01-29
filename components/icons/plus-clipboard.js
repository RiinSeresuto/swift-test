const PlusClipboard = ({ size, color }) => {
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
                    d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V7C20 5.89543 19.1046 5 18 5H16M8 5V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V5M8 5V5C8 6.10457 8.89543 7 10 7H14C15.1046 7 16 6.10457 16 5V5"
                    stroke={color ? color : "#000000"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
                <path
                    d="M12 11V14M12 17V14M12 14H9M12 14H15"
                    stroke={color ? color : "#000000"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
            </svg>
        </>
    );
};

export default PlusClipboard;
