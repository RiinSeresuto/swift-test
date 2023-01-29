const DeleteBin = ({ size, color }) => {
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
                    d="M9 7V7C9 5.34315 10.3431 4 12 4V4C13.6569 4 15 5.34315 15 7V7M9 7H15M9 7H6M15 7H18M20 7H18M4 7H6M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7"
                    stroke={color ? color : "#000000"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
            </svg>
        </>
    );
};

export default DeleteBin;
