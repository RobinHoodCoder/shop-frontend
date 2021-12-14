import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { M_LOGOUT } from '../../gql/mutations';
import { Q_CURRENT_USER } from '../../gql/queries';
import { useRouter } from 'next/router';

const Logout = (props) => {
  const router = useRouter();
  const [logout] = useMutation(M_LOGOUT, {
    refetchQueries: [
      { query: Q_CURRENT_USER },
    ],
  });

  useEffect(() => {
    logout().then(() => {
      return router.push('/login');
    });
  }, [logout, router]);
  return (
    <div>

    </div>
  );
};

export default Logout;
