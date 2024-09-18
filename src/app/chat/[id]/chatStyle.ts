const chatStyles = {
    chatContainer: {
        padding: 4,
    },
    messageContainer: {
        maxHeight: '400px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        padding: 2,
        marginBottom: 2,
    },
    messageBox: (isUserMessage: boolean) => ({
        display: 'flex',
        justifyContent: isUserMessage ? 'flex-end' : 'flex-start',
        marginBottom: '10px',
    }),
    message: (isUserMessage: boolean) => ({
        backgroundColor: isUserMessage ? '#007bff' : '#e0e0e0',
        color: isUserMessage ? '#fff' : '#000',
        borderRadius: '10px',
        padding: '10px',
        maxWidth: '60%',
    }),
    textField: {
        width: '100%',
    },
    sendButton: {
        marginTop: 2,
    },
};

export default chatStyles;
