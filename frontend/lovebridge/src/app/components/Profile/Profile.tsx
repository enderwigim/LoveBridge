import React from 'react';
import Image from 'next/image';

export default function Profile() {
    return (
        <>
            {/* Perfil de Usuario Estilo Facebook/Steam */}
            <section className="profile-section py-5">
                <div className="container">
                    <div className="card profile-card shadow-sm mx-auto">
                        {/* Banner de Perfil */}
                        <div className="profile-banner" style="background-image: url('img/pareja-feliz.png');"></div>

                        {/* Información del Usuario */}
                        <div className="profile-info d-flex align-items-center justify-content-center p-4">
                            {/* Avatar del Usuario */}
                            <div className="profile-avatar-container">
                                <Image src="img/pareja-feliz.png" alt="Avatar del Usuario" className="profile-avatar rounded-circle">
                            </div>
                            {/* Nombre y Botón de Solicitud */}
                            <div className="ms-4 d-flex flex-column align-items-start">
                                <h2 className="profile-name">Alex Johnson</h2>
                                <button className="btn btn-request mt-2" id="requestButton">Solicitar Pareja</button>
                                <div class="relation-section mt-2" id="relationText" style="display: none;">
                                    <small>Pareja de:</small>
                                    <span className="relation-name">Emma Smith 💕</span>
                                </div>
                            </div>
                        </div>

                        {/* Información Adicional */}
                        <div className="card-body text-center">
                            <p className="profile-bio">
                                ¡Hola! Soy Alex, un apasionado de los viajes y la fotografía. Me encanta descubrir nuevos lugares y compartir experiencias con mis seres queridos. ❤️
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}
