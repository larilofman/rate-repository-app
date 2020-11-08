import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
import { useHistory } from 'react-router-native';

const initialValues = {
    owner: '',
    repository: '',
    rating: '',
    review: '',
};

const ReviewForm = ({ onSubmit }) => {
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
            paddingHorizontal: 15,
            borderColor: theme.colors.border,
            borderWidth: 1,
            borderRadius: 4,
        },
        review: {
            height: 50,
            textAlignVertical: 'top',
            padding: 15
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
            <FormikTextInput name="owner" placeholder="Repository owner name" style={styles.input} />
            <FormikTextInput name="repository" placeholder="Repository name" style={styles.input} />
            <FormikTextInput name="rating" placeholder="Rating between 0 and 100" style={styles.input} />
            <FormikTextInput name="review" placeholder="Review" multiline style={[styles.input, styles.review]} />
            <TouchableWithoutFeedback onPress={onSubmit} >
                <View style={styles.button}>
                    <Text fontWeight='bold' style={styles.buttonText}>Create a review</Text>
                </View>
            </TouchableWithoutFeedback>
        </View >
    );
};

const validationSchema = yup.object().shape({
    owner: yup
        .string()
        .required('Repository owner name is required'),
    repository: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .typeError('Rating must be a number between 0 and 100')
        .min(0, 'Rating must be greater than or equal to 0')
        .max(100, 'Rating must be less than or equal to 100')
        .required('Rating is required'),
    review: yup
        .string()
});

export const SignInContainer = ({ onSubmit }) => {

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const CreateReview = () => {
    const [createReview] = useCreateReview();
    const history = useHistory();

    const onSubmit = async (values) => {
        const { repository, owner, rating, review } = values;

        try {
            const repositoryId = await createReview({ repositoryName: repository, ownerName: owner, rating, text: review });
            console.log(repositoryId);
            history.push(`/${repositoryId}`);
        } catch (e) {
            console.log(e);
        }
    };

    return <SignInContainer onSubmit={onSubmit} />;
};

export default CreateReview;