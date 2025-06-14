"use client"
import React, { useState, useEffect } from 'react';
import styles from './Profile.module.scss';
import Image from 'next/image';
import { getProfileByUserName } from '../../../services/profileService';
import { sendCoupleRequest } from '../../../services/sendCoupleRequest';

type ProfileProps = {
    userName: string;
};

export default function Profile({ userName }: ProfileProps) {
    const [profile, setProfile] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [requestSent, setRequestSent] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
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

    const handleRequest = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No has iniciado sesión.');
            return;
        }

        try {
            const res = await sendCoupleRequest(userName, token);
            setFadeOut(true); // Dispara animación
            setTimeout(() => setRequestSent(true), 400); // Espera a que termine la animación
        } catch (err: any) {
            alert(err.message || 'Error al enviar solicitud');
        }
    };

    if (error) return <p className="text-danger">Error: {error}</p>;
    if (!profile) return <p>Cargando perfil...</p>;

    const bannerImage = profile.background_img
        ? `/img/defaultBackground/${profile.background_img}`
        : '/img/defaultBackground/default.jpg';

    return (
        <>
            <section className={`py-5 ${styles.profile_section}`}>
                <div className="container">
                    <div className={`card ${styles.profile_card} shadow-sm mx-auto`}>
                        <div
                            className={`${styles.profile_banner}`}
                            style={{ backgroundImage: `url(${bannerImage})` }}
                        ></div>

                        <div className={`${styles.profile_info} d-flex align-items-center justify-content-start p-4`}>
                            <div className={`${styles.profile_avatar_container}`}>
                                <Image
                                    src={`/img/defaultProfiles/${profile.avatar}`}
                                    alt="Avatar del Usuario"
                                    width={100}
                                    height={100}
                                    className={`${styles.profile_avatar} rounded-circle`}
                                />
                            </div>
                            <div className="ms-4 d-flex flex-column align-items-start">
                                <h2 className={`${styles.profile_name}`}>{profile.user.name}</h2>
                                {profile.user.couple_id ? (
                                    <div className={`${styles.relation_section} mt-2`}>
                                        <small>Pareja de:</small>
                                        <span className={`${styles.relation_section}`}>{profile.user.couple_id} 💕</span>
                                    </div>
                                ) : (
                                    <div className="mt-2">
                                        {!requestSent ? (
                                            <button
                                                className={`btn btn-primary ${fadeOut ? styles.fade_out : ''}`}
                                                onClick={handleRequest}
                                            >
                                                Solicitar Pareja
                                            </button>
                                        ) : (
                                            <span className={`text-muted ${styles.fade_in}`}>Solicitud enviada 💌</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="card-body text-center">
                            <p className={`${styles.profile_bio}`}>{profile.bio || '¡Hola! Soy un usuario nuevo.'}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
