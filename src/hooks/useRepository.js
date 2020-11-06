import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
    if (id) {
        const { data, loading, error, refetch } = useQuery(GET_REPOSITORY, { variables: { id }, fetchPolicy: 'cache-and-network' });
        return { repository: data && data.repository, loading, error, refetch };
    }

    return { repository: undefined };

};

export default useRepository;