"use client"
import React, { useState, useEffect } from 'react';
import styles from './Profile.module.scss';
import Image from 'next/image';
// Es necesario importar el servicio.
import { getProfileByUserName } from '../../../services/profileService';

type ProfileProps  = {
    userName : string;
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
    }, [userName]);

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    if (!profile) {
        return <p>Cargando perfil...</p>;
    }
    const bannerImage = profile.background_img
        ? `/img/defaultBackground/${profile.background_img}`
        : '/img/defaultBackground/default.jpg';
    return (
        <>
            {/* Perfil de Usuario Estilo Facebook/Steam */}
            <section className={` py-5 ${styles.profile_section}`}>
                <div className="container">
                    <div className={`card ${styles.profile_card} shadow-sm mx-auto`}>
                        {/* Banner de Perfil */}
                        <div
                            className={`${styles.profile_banner}`}
                            style={{ backgroundImage: `url(${bannerImage})` /* Hay que cambiar la imagen por una default*/}} 
                        ></div>

                        {/* Información del Usuario */}
                        <div className={`${styles.profile_info} d-flex align-items-center justify-content-start p-4`}>
                            {/* Avatar del Usuario */}
                            <div className={`${styles.profile_avatar_container}`}>
                                <Image src={`/img/defaultProfiles/${profile.avatar}`}
                                       alt="Avatar del Usuario" 
                                        width={100}
                                        height={100}
                                 className={`${styles.profile_avatar} rounded-circle`}></Image>
                            </div>
                            {/* Nombre y Botón de Solicitud */}
                            <div className="ms-4 d-flex flex-column align-items-start">
                                <h2 className={`${styles.profile_name}`}>{profile.user.name}</h2>
                                {profile.user.couple_id ? (
                                    <div className={`${styles.relation_section} mt-2`}>
                                        <small>Pareja de:</small>
                                        <span className={`${styles.relation_section}`}>{profile.user.couple_id} 💕</span>
                                    </div>
                                ) : (
                                    <button className={`${styles.btn_request} btn mt-2`} id="requestButton">Solicitar Pareja</button>
                                )}
                            </div>
                        </div>

                        {/* Información Adicional */}
                        <div className="card-body text-center">
                            <p className={`${styles.profile_bio}`}>{profile.bio || '¡Hola! Soy un usuario nuevo.'}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}
