import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP } from '../graphql/mutations';

const useSignUp = () => {
    const [mutate, result] = useMutation(SIGN_UP, { fetchPolicy: 'no-cache' });

    const signUp = async ({ username, password }) => {
        const auth = await mutate({ variables: { username, password } });
        return auth;
    };

    return [signUp, result];
};

export default useSignUp;