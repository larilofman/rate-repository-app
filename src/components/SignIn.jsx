import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const initialValues = {
    username: '',
    password: '',
};

const SignInForm = ({ onSubmit }) => {
    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 15,
            paddingBottom: 15,
            backgroundColor: theme.colors.white,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
        },
        input: {
            height: 50,
            marginTop: 15,
            paddingLeft: 15,
            borderColor: theme.colors.border,
            borderWidth: 1,
            borderRadius: 4,
        },
        button: {
            height: 50,
            backgroundColor: theme.colors.primary,
            marginTop: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
        },
        buttonText: {
            color: theme.colors.white,
        }
    });
    return (
        <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" style={styles.input} />
            <FormikTextInput name="password" placeholder="Password" style={styles.input} secureTextEntry />
            <TouchableWithoutFeedback onPress={onSubmit} >
                <View style={styles.button}>
                    <Text fontWeight='bold' style={styles.buttonText}>Sign In</Text>
                </View>
            </TouchableWithoutFeedback>
        </View >
    );
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
});

const SignIn = () => {
    const [signIn] = useSignIn();
    const history = useHistory();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const { data } = await signIn({ username, password });
            console.log(data);
            history.push('/');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;