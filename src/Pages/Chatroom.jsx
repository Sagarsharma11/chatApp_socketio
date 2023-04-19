import React, { useState, useEffect, useReducer } from 'react'
import { HiPlusCircle } from 'react-icons/hi'
import { MdSend } from 'react-icons/md'
import io from 'socket.io-client'

const Chatroom = () => {
    const [ignore, forceUpdate] = useReducer(x => x + 1, 0);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [chat, setChat] = useState([])
    const [sender, setSender] = useState('')
    const [receiver, setReceiver] = useState('')
    const currentUser = JSON.parse(localStorage.getItem('current-user'))
    const SENDER = 'h-auto ml-2 w-64 mt-4 text-white bg-sender rounded'
    const RECEIVER = 'h-auto mr-2 w-64 mt-4 rounded bg-reciver'


    useEffect(() => {
        // console.log('use effect 1')
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket);
        return () => newSocket.disconnect();
    }, []);

    useEffect(() => {
        // console.log('use effect 2')

        if (socket) {
            socket.on('message', (obj) => {
                console.log('hero')
                const senderEmail = JSON.parse(localStorage.getItem('dataKey')).email
                const receiverEmail = JSON.parse(localStorage.getItem('current-user')).user.email;
                setSender(senderEmail)
                setReceiver(receiverEmail)

                if (senderEmail === obj.sender || receiverEmail === obj.receiver || senderEmail === obj.receiver) {
                    let newarr = []
                    newarr = chat
                    newarr.push({ user: obj.receiver, data: obj.message, sender: obj.sender })
                    setChat(newarr)
                    console.log('chat array =>', chat)
                    forceUpdate()
                }
            });
        }
    }, [socket]);

    useEffect(() => {
        // console.log('use effect 3 rerender component')
    }, [ignore])

    const sendMessage = () => {
        if (socket) {
            const senderEmail = JSON.parse(localStorage.getItem('dataKey')).email
            const receiverEmail = JSON.parse(localStorage.getItem('current-user')).user.email;
            socket.emit('chat message', message, senderEmail, receiverEmail);
            setMessage('');
        }
    };
    return (
        <div className='flex relative items-center justify-center h-screen bg-indigo-700'>
            <div className='flex flex-col  '>
                <div className=' overflow-auto h-128 w-128 border bg-slate-900 rounded-xl'>
                    <div className='flex justify-center'>
                        <img className="rounded-full w-32 h-32 mt-4 mb-4" src={`${currentUser.user.picture}`} alt="Rounded avatar" />
                    </div>
                    <div className='flex flex-col '>
                        {
                            chat.length ?
                                chat.map((e) => {
                                    return e.sender === sender || e.sender === receiver ? <div className={`flex ${currentUser.user.email === e.user ? 'justify-start' : 'justify-end'}`}>
                                        <div className="flex flex-col">
                                            <div className={currentUser.user.email === e.user ? SENDER : RECEIVER}>
                                                <h1 className='font-bold py-1'>
                                                    {e.data}
                                                </h1>
                                            </div>
                                        </div>
                                    </div> : ''
                                }) : ''
                        }
                    </div>

                </div>
                <div className='flex justify-center space-x-8  mt-3 '>
                    <div className='flex-none w-14 text-4xl ml-2 mt-1 '>
                        <HiPlusCircle className='fill-reciver  cursor-pointer hover:fill-orange-300' />
                    </div>
                    <div className=' flex-grow '>
                        <div className="relative w-full">
                            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                    </div>
                    <div className='flex-none w-14 text-4xl ml-2'>
                        <MdSend onClick={sendMessage} className='fill-yellow-400 cursor-pointer hover:fill-yellow-500' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatroom

