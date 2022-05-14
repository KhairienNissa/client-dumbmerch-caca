import React, { useState,  useEffect, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../../component/style.css';
import Navbar from '../../component/Navbar'
import '../../component/style.css'
import Contact from '../../component/complain/Contact'
import Chat from '../../component/complain/Chat'
import {io} from 'socket.io-client'
import { UserContext } from '../../context/userContext'

let socket
const ComplainByAdmin = () => {

    const title = "Complain";
    document.title = "DumbMerch | " + title;

  const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    // code here
    const [messages, setMessages] = useState([])

    // code here
    const [context, dispatch] = useContext(UserContext)


    useEffect(() =>{
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem('token')
            },
            // code here
            query: {
                id: context.user.id
            }
        })

        // code here
        socket.on("new message", () => {
            console.log("contact", contact)
            console.log("triggered", contact?.id)
            socket.emit("load messages", contact?.id)
        })

        // code here
        loadContacts()
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages]) // code here

    const loadContacts = () => {
        socket.emit("load customer contacts")
        socket.on("customer contacts", (data) => {
            // filter just customers which have sent a message
            let dataContacts = data.filter((item)=>(item.status!=='admin') && (item.recipientMessage.length  >0||item.senderMessage.length>0))
            
            // manipulate customers to add message property with the newest message
            // code here
            dataContacts = dataContacts.map((item)=>({
                ...item,
            }))
            setContacts(dataContacts)
        })
    }

    // used for active style when click contact
    const onClickContact = (data) => {
        setContact(data)
        // code here
        socket.emit("load messages",data.id)
    }

    // code here
    const loadMessages = (value) => {
            
        socket.on("messages", (data)=>{
            if(data.length>0){
                const dataMessages = data.map((item)=>({
                    idSender:  item.sender.id,
                    message: item.message
                }))
                console.log(dataMessages);
                setMessages(dataMessages)
            }
            loadContacts()
            const chatMessages = document.getElementById("chat-messages")
            chatMessages.scrollTop = chatMessages?.scrollHeight
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
            <Navbar/>
            <Container fluid style={{height: '85vh'}}>
                <Row className='mx-4'>
                    <Col md={3} style={{height: '85.9vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts}  clickContact={onClickContact} contact={contact} />
                    </Col>
                    {/* code here */}
                    <Col  md={9} style={{maxHeight: '85.9vh'}} className="px-0">
                     {/* <Chat contact={contact} messages={messages} user={context.user} sendMessage={onSendMessage}/> */}
                        <Chat contact={contact} messages={messages} user={context.user} sendMessage={onSendMessage}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default ComplainByAdmin;