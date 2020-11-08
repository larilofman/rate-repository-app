import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';
import { useHistory } from 'react-router-native';

const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: ''
};

const SignUpForm = ({ onSubmit }) => {
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
            <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" style={styles.input} secureTextEntry />
            <TouchableWithoutFeedback testID="submitButton" onPress={onSubmit} >
                <View style={styles.button}>
                    <Text fontWeight='bold' style={styles.buttonText}>Sign Up</Text>
                </View>
            </TouchableWithoutFeedback>
        </View >
    );
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1)
        .max(30)
        .required('Username is required'),
    password: yup
        .string()
        .min(5)
        .max(50)
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .min(5)
        .max(50)
        .oneOf([yup.ref('password'), null], "Passwords don't match")
        .required('Password confirmation is required'),
});

export const SignUpContainer = ({ onSubmit }) => {

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const SignUp = () => {
    const [signIn] = useSignIn();
    const [signUp] = useSignUp();
    const history = useHistory();

    const onSubmit = async (values) => {
        const { username, password } = values;
        console.log(values);
        try {
            const { data } = await signUp({ username, password });
            console.log(data);
            await signIn({ username, password });

            history.push('/');
        } catch (e) {
            console.log(e);
        }
    };

    return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;