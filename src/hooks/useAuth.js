import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuth = (includeReviews = false, firstReviews = 5) => {
    const variables = { includeReviews, first: firstReviews };
    const { data, loading, fetchMore, ...result } = useQuery(GET_AUTHORIZED_USER, { variables, fetchPolicy: 'cache-and-network' });

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_AUTHORIZED_USER,
            variables: {
                after: data.authorizedUser.reviews.pageInfo.endCursor,
                ...variables,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    authorizedUser: {
                        ...fetchMoreResult.authorizedUser,
                        reviews: {
                            ...fetchMoreResult.authorizedUser.reviews,
                            edges: [
                                ...previousResult.authorizedUser.reviews.edges,
                                ...fetchMoreResult.authorizedUser.reviews.edges,
                            ]
                        }
                    },
                };

                return nextResult;
            },
        });
    };

    return {
        authorizedUser: data && data.authorizedUser,
        fetchMore: handleFetchMore,
        loading,
        ...result
    };
};

export default useAuth;