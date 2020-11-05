import React, { useEffect } from 'react';
import useSignOut from '../hooks/useSignOut';
import { useHistory } from 'react-router-native';
import { View } from 'react-native';
import Text from './Text';

const SignOut = () => {
    const signOut = useSignOut();
    const history = useHistory();

    useEffect(() => {
        const signOutUser = async () => {
            await signOut();
            history.goBack();
        };
        signOutUser();
    });

    return (
        <View>
            <Text>Signing out...</Text>
        </View>
    );
};

export default SignOut;