import { useQuery } from '@apollo/client';
import { Q_CURRENT_USER } from '../gql/queries';

export const useUser = (initital) => {
  const { data, loading, error } = useQuery(Q_CURRENT_USER);
  return { user: data?.authenticatedItem, loading, error };
};
