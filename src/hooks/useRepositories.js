import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ sortingOrder, filterText, first }) => {
    const sortingChoices = {
        latest: { orderBy: 'CREATED_AT' },
        highest: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
        lowest: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
    };

    const variables = { ...sortingChoices[sortingOrder], searchKeyword: filterText, first };

    const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, { variables, fetchPolicy: 'cache-and-network' });

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data && data.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_REPOSITORIES,
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    repositories: {
                        ...fetchMoreResult.repositories,
                        edges: [
                            ...previousResult.repositories.edges,
                            ...fetchMoreResult.repositories.edges,
                        ],
                    },
                };

                return nextResult;
            },
        });
    };

    return {
        repositories: data && data.repositories,
        fetchMore: handleFetchMore,
        loading,
        ...result
    };
};

export default useRepositories;