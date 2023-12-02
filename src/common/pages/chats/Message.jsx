import React from 'react';
import './Message.css';

const Message = ({ message, userId }) => {
    // Obtener el nombre del usuario que envía el mensaje
    const senderName = message.Pasajero.nombre;

    // Formatear la fecha del mensaje
    const messageDate = new Date(message.createdAt);
    const messageTime = messageDate.toLocaleTimeString('es-ES', {
        hour: 'numeric',
        minute: 'numeric',
    });

    return (
        <>
            <div className={`message ${message.id_pasajero === userId ? 'sent' : 'received'}`}>
                <div className="sender-info">
                    <span className="sender-name">{senderName}</span>
                    <span className="timestamp">{messageTime}</span>
                </div>
                <div className="message-content">{message.contenido}</div>
            </div>
        </>
    );
};

export default Message;