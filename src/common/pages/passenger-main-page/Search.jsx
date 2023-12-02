import './Search.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import React, { useState } from "react";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

export default function Search(){
    const [date, setDate] = useState(new Date());
    const weekend = (date) => new Date() <= date;
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const handleFiltrarClick = () => {
        // Llama a la función de filtrado que se pasa como prop
        onFiltrarClick({origen, destino});
      };

    return(
        <div className='search'>
            <div className='search-container'>
            
                <div className='buscadores'>
                    <h2> ¿Desde dónde vas?</h2>
                    <input 
                    placeholder='Ingrese lugar de origen' 
                    value={origen}
                    onChange={(e) => setOrigen(e.target.value)}>
                    </input>
                    <h2> ¿Hacia dónde quieres ir?</h2>
                    <input 
                    placeholder='Ingrese lugar de destino'
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}>
                    </input>
                </div>
                </div>

                <div className='search-container'>

                <h2>¿Cuándo quieres ir?</h2>

                <div div className='horario'>

                    <DatePicker 
                    showTimeInput
                    showIcon
                    dateFormat= "h:mm aa dd/MM/yyyy"
                    timeCaption = {"Hora"}
                    title = "Fecha"
                    filterDate={weekend}
                    locale = "es"
                    selected={date} 
                    onChange={(date) => setDate(date)}
                    />

                    <button className='button-filtrar'>Filtrar</button>
                </div>
                
                </div>


            

        </div>      
    )
}
