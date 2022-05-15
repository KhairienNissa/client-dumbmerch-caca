import React, { useState,  useEffect, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../../component/style.css';
import NavbarUser from '../../component/NavbarUser';
import '../../component/style.css'
import Contact from '../../component/complain/Contact'
import Chat from '../../component/complain/Chat'
import {io} from 'socket.io-client'
import { UserContext } from '../../context/userContext'

let socket
export default function Complain() {
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    // code here
    const [messages, setMessages] = useState([])

    
    const title = "Complain admin"
    document.title = 'DumbMerch | ' + title
    
    // code here
    const [context, dispatch] = useContext(UserContext)
    useEffect(() =>{

        const title = "Complain by User";
        document.title = "DumbMerch | " + title;
        
        socket = io('https://dumbmerch-khairien.herokuapp.com', {
            auth: {
                token: localStorage.getItem("token")
            },
            // code here
            query: {
                id: context.user.id
            }
        })

        // code here
        // define corresponding socket listener 
        socket.on("new message", () => {
            console.log("contact", contact)
            console.log("triggered", contact?.id)
            socket.emit("load messages", contact?.id)
        })
                
        // listen error sent from server
        socket.on("connect_error", (err) => {
            console.error(err.message); // not authorized
        });
        // code here
        loadContact()
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages]) // code here

    const loadContact = () => {
        // emit event load admin contact
        socket.emit("load admin contact")
        // listen event to get admin contact

        socket.on("admin contact",async(data)=>{
            const dataContact={
                ...data,
                message: messages.length > 0 ? messages[messages.length - 1].message : "Click here to start message"
            }
            setContacts([dataContact])
        })

    }

    // used for active style when click contact
    const onClickContact = (data) => {
        setContact(data)
        // code here
        socket.emit("load messages", data.id)
    }

    // code here
    const loadMessages = (value) => {
        socket.on("admin contact", (data) => {
            
            socket.on("messages",async(data)=>{
                if(data.length>0){
                    const dataMessages = data.map((item)=>({
                        idSender:  item.sender.id,
                        message: item.message
                    }))
                    console.log(dataMessages);
                    setMessages(dataMessages)
                }
                const chatMessages = document.getElementById("chat-messages")
                chatMessages.scrollTop = chatMessages?.scrollHeight
            })

        })
    }

    const onSendMessage = (e)=>{
        if(e.key === 'Enter'){
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }

            socket.emit("send messages",data)
            e.target.value = ""
        }
    }


    return (
        <>
            <NavbarUser title={title} />
            <Container fluid style={{height: '84vh'}}>
                <Row className="mx-4">
                    <Col md={3} style={{height: '84.9vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts}  clickContact={onClickContact} contact={contact} />
                    </Col>
                    {/* code here */}
                    <Col  md={9} style={{maxHeight: '84.9vh'}} className="px-0">
                        <Chat contact={contact} messages={messages} user={context.user} sendMessage={onSendMessage}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
