import React from 'react';
import { FlatList, View, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { ReviewItem } from './RepositoryItem';
import * as WebBrowser from 'expo-web-browser';
import useAuth from '../hooks/useAuth';
import useDeleteReview from '../hooks/useDeleteReview';


const ReviewContainer = ({ review, refetch }) => {
    const [deleteReview] = useDeleteReview();

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 15,
            paddingBottom: 15,
            backgroundColor: theme.colors.white,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        },
        button: {
            height: 50,
            marginTop: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            flexGrow: 1,
        },
        viewButton: {
            backgroundColor: theme.colors.primary,
            marginRight: 7.5
        },
        deleteButton: {
            backgroundColor: theme.colors.warning,
            marginLeft: 7.5
        },
        buttonText: {
            color: theme.colors.white,
        }
    });

    const onViewRepository = () => {
        WebBrowser.openBrowserAsync(review.repository.url);
    };

    const onDeleteReview = async () => {
        try {
            await deleteReview(review.id);
            await refetch();
        } catch (error) {
            console.log(error);
        }

    };

    const onPressDelete = () =>
        Alert.alert(
            'Delete review',
            'Are you sure you want to delete this review?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: onDeleteReview
                }
            ],
            { cancelable: false }
        );

    return (
        <View style={styles.container}>
            <ReviewItem
                review={review}
                showUsername={false}
            />
            <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback onPress={onViewRepository} >
                    <View style={[styles.button, styles.viewButton]}>
                        <Text fontWeight='bold' style={styles.buttonText}>View repository</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={onPressDelete} >
                    <View style={[styles.button, styles.deleteButton]}>
                        <Text fontWeight='bold' style={styles.buttonText}>Delete review</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewListContainer = ({ reviews, refetch, onEndReach }) => {
    const reviewNodes = reviews
        ? reviews.edges.map(edge => edge.node)
        : [];

    return (
        <FlatList
            data={reviewNodes}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index, separators }) => (
                <ReviewContainer
                    key={index}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}
                    review={item}
                    refetch={refetch}
                />
            )}
        />
    );
};

const ReviewList = () => {
    const { authorizedUser, fetchMore, refetch } = useAuth(true, 6);

    const onEndReach = () => {
        fetchMore();
    };

    if (!authorizedUser) {
        return null;
    }

    return (
        <ReviewListContainer
            reviews={authorizedUser.reviews}
            refetch={refetch}
            onEndReach={onEndReach}
        />
    );
};

export default ReviewList;