import { useQuery } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';

const useAuth = () => {
    const { data, loading, error, refetch } = useQuery(AUTHORIZED_USER, { fetchPolicy: 'cache-and-network' });
    return { authorizedUser: data && data.authorizedUser, loading, error, refetch };
};

export default useAuth;