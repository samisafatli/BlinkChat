"use client"

import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { collection, addDoc, onSnapshot, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/app/firebase/clientApp';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/clientApp';
import chatStyles from '../[id]/chatStyle';
import GoBackButton from '@/app/Components/GoBackButton/GoBackButton';

type Message = {
    id: string;
    text: string;
    chatId: string;
    createdAt: Timestamp;
    user: string;
    userId: string;
};

const ChatPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [user, loading, error] = useAuthState(auth);

    const messageEndRef = useRef<null | HTMLDivElement>(null)

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        if (!loading) {
            if (error) {
                console.error('Authentication error:', error);
                router.push('/');
            } else if (!user) {
                router.push('/');
            }
        }
    }, [loading, user, error, router]);


    useEffect(() => {
        if (typeof window !== "undefined" && user) {
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

                    const fetchedMessages = snapshot.docs.map((doc) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            ...data,
                            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(), // Convert Firebase Timestamp to JS Date
                        };
                    }) as Message[];

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
    }, [id, user]);

    useEffect(() => {
        scrollToBottom()
    }, [messages])

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Box sx={chatStyles.chatContainer}>
            <GoBackButton />
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
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                    }
                }}
                sx={chatStyles.textField}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                sx={chatStyles.sendButton}
                disabled={!message.trim()}
            >
                Send
            </Button>
        </Box>
    );
};

export default ChatPage;
