"use client";
import { useState, useEffect } from 'react';

export default function useProfile() {


  const [profile, setProfile] = useState<{ name: string, email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/getUser', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch profile');

        const data = await response.json() as {
          data: {
            name: string
            email: string
          }
        }
        setProfile(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
}