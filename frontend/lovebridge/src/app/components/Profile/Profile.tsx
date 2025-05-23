import React, { useState, useEffect } from 'react';

import Image from 'next/image';
// Es necesario importar el servicio.
import { getProfileByUserName } from '../../../services/profileService';

type ProfileProps  = {
    userName : string | null;
}
export default function Profile({ userName }: ProfileProps) {
    // Se setean dos estados. El del perfil, que obtendrá los datos de manera dinamica a partir de la api.
    // Si no devuelve un 200, seteará un error.
    const [profile, setProfile] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            // Obtenemos el token y también el username.
            const token = localStorage.getItem('token');
            // Si no hay token, hay que dar algún error de autenticación
            // TODO: Dar error.
            if (!token) {
                setError('Fallo en autentificación, inicie sesión para acceder a los perfiles de los usuarios.');
                return;
            }

            try {
                const data = await getProfileByUserName(userName, token);
                setProfile(data);
            } catch (err: any) {
                setError(err);
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    if (!profile) {
        return <p>Cargando perfil...</p>;
    }

    return (
        <>
            {/* Perfil de Usuario Estilo Facebook/Steam */}
            <section className="profile-section py-5">
                <div className="container">
                    <div className="card profile-card shadow-sm mx-auto">
                        {/* Banner de Perfil */}
                        <div
                            className="profile-banner"
                            style={{ backgroundImage: `url(${profile.background_img || 'img/pareja-feliz.png'})` /* Hay que cambiar la imagen por una default*/}} 
                        ></div>

                        {/* Información del Usuario */}
                        <div className="profile-info d-flex align-items-center justify-content-center p-4">
                            {/* Avatar del Usuario */}
                            <div className="profile-avatar-container">
                                <Image src={profile.avatar || 'img/pareja-feliz.png'} /* Hay que cambiar la imagen por una default*/
                                       alt="Avatar del Usuario" 
                                 className="profile-avatar rounded-circle"></Image>
                            </div>
                            {/* Nombre y Botón de Solicitud */}
                            <div className="ms-4 d-flex flex-column align-items-start">
                                <h2 className="profile-name">{profile.user.name}</h2>
                                {profile.user.couple_id ? (
                                    <div className="relation-section mt-2">
                                        <small>Pareja de:</small>
                                        <span className="relation-name">{profile.user.couple_id} 💕</span>
                                    </div>
                                ) : (
                                    <button className="btn btn-request mt-2" id="requestButton">Solicitar Pareja</button>
                                )}
                            </div>
                        </div>

                        {/* Información Adicional */}
                        <div className="card-body text-center">
                            <p className="profile-bio">{profile.bio || '¡Hola! Soy un usuario nuevo.'}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}
