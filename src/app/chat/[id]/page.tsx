"use client"

import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, addDoc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/app/firebase/clientApp';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/clientApp';
import chatStyles from '../[id]/chatStyle';

type Message = {
    id: string;
    text: string;
    chatId: string;
    createdAt: Date;
    user: string;
    userId: string;
};

const ChatPage = () => {
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (!id) return;
            const messagesQuery = query(
                collection(db, 'messages'),
                where('chatId', '==', id),
                orderBy('createdAt', 'asc')
            );

            const unsubscribe = onSnapshot(
                messagesQuery,
                (snapshot) => {
                    if (snapshot.empty) return;

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
        }
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

    const messageEndRef = useRef<null | HTMLDivElement>(null)

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <Box sx={chatStyles.chatContainer}>
            <Typography variant="h5" gutterBottom>
                Chat Room: {id}
            </Typography>
            <Box sx={chatStyles.messageContainer}>
                {messages.map((msg) => (
                    <Box
                        key={msg.id}
                        sx={chatStyles.messageBox(msg.userId === user?.uid)}
                    >
                        <Box sx={chatStyles.message(msg.userId === user?.uid)}>
                            <Typography variant="body1">{msg.text}</Typography>
                        </Box>
                    </Box>
                ))}
                <div ref={messageEndRef} />
            </Box>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                sx={chatStyles.textField}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                sx={chatStyles.sendButton}
            >
                Send
            </Button>
        </Box>
    );
};

export default ChatPage;
