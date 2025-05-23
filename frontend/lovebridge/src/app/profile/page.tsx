import Profile from "../components/Profile/Profile";   

import { useEffect, useState } from "react"; 
import { useRouter } from 'next/router';



export default function ProfilePage() {
  const router = useRouter();
  const { userName } = router.query;

  if (typeof userName !== 'string') return <p>Cargando perfil...</p>;

  return (
    <>
        <Profile userName={userName} />
    </>
  )
}