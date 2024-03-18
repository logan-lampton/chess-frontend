function ConfirmationPopUp({ message, onDialogue }) {
    return (
        <div>
            <div
                className='fixed inset-0 bg-white'
                style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
            >
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg border border-black'>
                    <h2 className='select-none'>{`${message}`}</h2>
                    <div className='flex justify-center items-center text-white p-5 space-x-10'>
                        <button
                            onClick={() => onDialogue(true)}
                            className='bg-green-500'
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => onDialogue(false)}
                            className='bg-red-500'
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationPopUp;
