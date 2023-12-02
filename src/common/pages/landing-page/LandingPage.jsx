import { useRef, useEffect, useState } from 'react';
import './LandingPage.css';

export default function LandingPage() {


    const s1Ref = useRef();
    const [s1IsVisible, setS1IsVisible] = useState();

    useEffect(() => {
        const observer = new IntersectionObserver( (entries) => {
            const entry = entries[0];
            setS1IsVisible(entry.isIntersecting)
        })
        observer.observe(s1Ref.current)
    }, [])

    const s2Ref = useRef();
    const [s2IsVisible, setS2IsVisible] = useState();

    useEffect(() => {
        const observer = new IntersectionObserver( (entries) => {
            const entry = entries[0];
            setS2IsVisible(entry.isIntersecting)
        })
        observer.observe(s2Ref.current)
    }, [])

    const s3Ref = useRef();
    const [s3IsVisible, setS3IsVisible] = useState();

    useEffect(() => {
        const observer = new IntersectionObserver( (entries) => {
            const entry = entries[0];
            setS3IsVisible(entry.isIntersecting)
        })
        observer.observe(s3Ref.current)
    }, [])
    
    return (
        <div>
            <div className="div-background-image"> </div>
            <div>
                <section ref={s1Ref} className={`section-landing ${s1IsVisible ? 'slide-in-right' : ""}`}>
                    <h1 className="h1-landing">🚗 TurnosUC</h1>
                </section>
                <div ref={s2Ref} className={`intermediate-section ${s2IsVisible ? 'slide-in-left' : ""}`}>
                    <p>
                        <strong>Gracias a TurnosUC ya no tendrás que batallar por encontrar ida y vuelta. Todas los viajes, en un solo lugar.</strong>
                    </p>
                </div >
                <div ref={s3Ref} className={`sub-container ${s3IsVisible ? 'slide-in-right' : ""}`}>
                    <div className='sub-intermediate-section'>
                        Filtra tu búsqueda!
                    </div>
                    <div className='sub-intermediate-section'>
                        <a href="/instrucciones">¿Cómo se usa?</a>
                    </div>
                    <div className='sub-intermediate-section'>
                        <a href="/login">Iniciar sesión</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
