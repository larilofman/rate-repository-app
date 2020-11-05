import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import useAuth from '../hooks/useAuth';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBarBackground
    },
    scrollView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    }
});

const AppBar = () => {
    const { authorizedUser } = useAuth();
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab text="Repositories" link="/" />
                {authorizedUser
                    ?
                    <AppBarTab text="Sign out" link="sign-out" />
                    :
                    <AppBarTab text="Sign in" link="sign-in" />}

            </ScrollView>
        </View>
    );
};

export default AppBar;