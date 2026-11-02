import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types';

interface AuthState {
  user: Profile | null;
  loading: boolean;
  isAdmin: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    isAdmin: false,
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setState({
          user: profile,
          loading: false,
          isAdmin: profile?.role === 'administrator',
        });
      } else {
        setState({ user: null, loading: false, isAdmin: false });
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setState({
          user: profile,
          loading: false,
          isAdmin: profile?.role === 'administrator',
        });
      } else {
        setState({ user: null, loading: false, isAdmin: false });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return state;
}
