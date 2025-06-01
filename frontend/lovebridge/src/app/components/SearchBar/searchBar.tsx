"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './searchBar.module.scss';
import Image from 'next/image';
import { searchUsersByUsername, User } from '../../../services/searchUsersByUsername';

type Props = {
  onClose: () => void;
};

export default function SearchModal({ onClose }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchResults = async () => {
      if (!token || query.length < 2) return;

      try {
        const users = await searchUsersByUsername(query, token);
        setResults(users.slice(0, 5));
        setError(null);
      } catch (err: any) {
        setError(typeof err === 'string' ? err : 'Error al buscar usuarios');
        setResults([]);
      }
    };

    const timeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      handleUserClick(results[0].username);
    }
  };

  const handleUserClick = (username: string) => {
    router.push(`/profiles/${username}`);
    onClose();
  };

  return (
    
    <div className={styles.searchModalOverlay} onClick={onClose}>
      <div className={styles.searchModal} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="d-flex flex-column w-100">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Buscar un perfil..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn_custom mb-3">
            Buscar
          </button>

          {error && <div className="text-danger mb-2">{error}</div>}

          {results.length > 0 && (
            <ul className="list-group">
              {results.map((user) => {
                const avatarSrc = `/img/defaultProfiles/${user.profile.avatar}`;
                        console.log('🖼️ Avatar src:', avatarSrc);
              return(
                
                <li
                  key={user.id}
                  className={`${styles.searchResultItem} list-group-item d-flex align-items-center`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleUserClick(user.username)}
                >
                

                <Image src={`/img/defaultProfiles/${user.profile.avatar}`}
                    alt="Avatar del Usuario" 
                    width={40}
                    height={40}
                    className="rounded-circle me-2"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                ></Image>
                  <span>{user.username}</span>
                </li>
                
              )}
              )}
            </ul>
          )}
        </form>
      </div>
    </div>
  );
}
