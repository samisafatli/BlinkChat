"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, addDoc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { Box, Button, TextField, Typography } from '@mui/material';
import { db } from '@/app/firebase/clientApp';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/clientApp';

type Message = {
    id: string;
    text: string;
    chatId: string;
    createdAt: Date;
    user: string;
};

const ChatPage = () => {
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [user] = useAuthState(auth);


    useEffect(() => {
        if (!id) {
            console.log('No chat ID available');
            return;
        }

        console.log('Setting up query for chat ID:', id);

        const messagesQuery = query(
            collection(db, 'messages'),
            where('chatId', '==', id),
            orderBy('createdAt', 'asc')
        );

        const unsubscribe = onSnapshot(
            messagesQuery,
            (snapshot) => {
                if (snapshot.empty) return

                const fetchedMessages = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Message[];
                setMessages(fetchedMessages);
            },
            (error) => {
                console.error('Error fetching messages:', error);
            }
        );
        return () => {
            unsubscribe();
        };
    }, [id]);



    const handleSendMessage = async () => {
        if (!message.trim()) return;
        try {
            await addDoc(collection(db, 'messages'), {
                text: message,
                chatId: id,
                createdAt: new Date(),
                user: user?.displayName || 'Anonymous',
                userId: user?.uid,

            });
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h5" gutterBottom>Chat Room: {id}</Typography>
            <Box
                sx={{
                    maxHeight: '400px',
                    overflowY: 'auto',
                    border: '1px solid #ccc',
                    padding: 2,
                    marginBottom: 2,
                }}
            >
                {messages.map((msg) => (
                    <Typography key={msg.id} variant="body1">
                        {msg.user}: {msg.text}
                    </Typography>
                ))}
            </Box>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSendMessage} sx={{ marginTop: 2 }}>
                Send
            </Button>
        </Box>
    );
};

export default ChatPage;
