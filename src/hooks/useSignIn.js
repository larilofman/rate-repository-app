import { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { AUTHORIZE } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
    const authStorage = useContext(AuthStorageContext);
    const [mutate, result] = useMutation(AUTHORIZE, { fetchPolicy: 'no-cache' });
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        const auth = await mutate({ variables: { username, password } });
        await authStorage.setAccessToken(auth.data.authorize.accessToken);
        await apolloClient.resetStore();
        return auth;
    };

    return [signIn, result];
};

export default useSignIn;