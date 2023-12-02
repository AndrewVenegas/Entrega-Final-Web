import React, { useState, useContext, useEffect } from 'react';
import Message from './Message.jsx';
import {useNavigate, useParams} from "react-router-dom";
import './ChatBox.css'; // Estilos del chat
import { AuthContext } from '../../../auth/AuthContext.jsx';
import axios from 'axios';
import API_URL from '../../config.js';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');


    const { id } = useParams(); // id del viaje

    const { token } = useContext(AuthContext);
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const userId = parseInt(tokenPayload.sub, 10); // Convierte userId a enter

    const navigate = useNavigate();

    const [userName, setUserName] = useState();
    const [idChat, setIdChat] = useState();
    const [chatVacio, setChatVacio] = useState(false);

    // Servirá para actualizar cuando yo cree un mensaje
    const [contador, setContador] = useState(0);

    const config = {
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    }

    useEffect(() => {
        // Obtenemos todos los mensajes:
        axios.get(`${API_URL}/mensajes/${id}`, config)
        .then((response) => {
            console.log(`El estatus de la respuesta es: ${response.status}`);
            if (response.data) {
                setMessages(response.data);
                console.log("Los mensajes que hay en el chat son:")
                console.log(response.data)
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 404) {
                console.log("No hay mensajes en este chat!");
                setChatVacio(true);
            } else {
                console.log(error);
            }
        });

        // Obtenemos el id del chat
        axios.get(`${API_URL}/mensajes/chat/${id}`, config)
        .then((response) => {
            if (response.data) {
                setIdChat(response.data.id_chat);
                console.log("El id del chat es:", idChat)
                console.log("El id del viaje es:", id)
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 404) {
                console.log("No hay chat para este viaje!");
                setIdChat(null);
            } else {
                console.log(error);
            }
        })

    }, [contador]);


    const handleClickSendMessage = () => { 
        if (inputValue.trim() !== '') {
            console.log("Enviando mensaje", id)
            const nuevoMensaje = {
                id_chat: idChat,
                id_pasajero: userId,
                contenido: inputValue
            }
    
            axios.post(`${API_URL}/mensajes`, nuevoMensaje, config)
            .then((response) => {
                if (response.data) {
                    console.log("Se ha creado el mensaje");
                    setContador(contador + 1);
                }
            })
            .catch((error) => {
                console.log("Hubo un error al crear el mensaje");
                console.log(error);
            })
            setInputValue('');
        }
    };

    


    // Para que el usuario pueda enviar el mensaje con la tecla Enter
    // Donde debo ponerlo?
    // Quizas mejor hacer un primary botton
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClickSendMessage();
        }
    }


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };


    const handleClickGoBack = () => {
        navigate(`/viajes/${id}`)
    };

    return (
        <div className="chat-container">
            {chatVacio && <h2>No hay mensajes</h2>}
            <div className="messages-container">
                {messages.map((message) => (
                    <Message key={message.id} text={message.contenido} message={message} userId={userId} />
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Escribe un mensaje..."
                    className="message-input"
                />
                <button onClick={handleClickSendMessage } className="send-button">
                    Enviar
                </button>
            </div>
            <button onClick={handleClickGoBack} className="btn btn-outline-secondary"> Volver </button>
        </div>
    );
};

export default ChatBox;





// const handleClickSendMessage = () => {
//     console.log("Enviando mensaje", id)
//     if (inputValue.trim() !== '') {
//         const newMessage = {
//             id: messages.length + 1,
//             text: inputValue,
//             // Puedes agregar más detalles, como el remitente, hora, etc.
//         };
//         setMessages([...messages, newMessage]);
//         setInputValue('');
//     }
// };