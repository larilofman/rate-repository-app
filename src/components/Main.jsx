import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import { SingleRepository } from './RepositoryItem';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SignUp from './SignUp';
import CreateReview from './CreateReview';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.appBackground
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path="/sign-in" exact>
                    <SignIn />
                </Route>
                <Route path="/sign-out" exact>
                    <SignOut />
                </Route>
                <Route path="/sign-up" exact>
                    <SignUp />
                </Route>
                <Route path="/create-review" exact>
                    <CreateReview />
                </Route>
                <Route path="/:id" exact>
                    <SingleRepository />
                </Route>
                <Route path="/" exact>
                    <RepositoryList />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main;