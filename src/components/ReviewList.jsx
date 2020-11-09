import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Text from './Text';
import { useHistory } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import RNPickerSelect from 'react-native-picker-select';
import FilterBar from './FilterBar';
import theme from '../theme';
import { useDebounce } from 'use-debounce';
import { ReviewItem } from './RepositoryItem';

import useAuth from '../hooks/useAuth';


const ReviewContainer = ({ review }) => {

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
    return (
        <View style={styles.container}>
            <ReviewItem
                review={review}
                showUsername={false}
            />
            <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback onPress={() => console.log('view')} >
                    <View style={[styles.button, styles.viewButton]}>
                        <Text fontWeight='bold' style={styles.buttonText}>View repository</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => console.log('delete')} >
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

export const ReviewListContainer = ({ reviews, onEndReach }) => {
    const history = useHistory();
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
                />
            )}
        />
    );
};

const ReviewList = () => {
    const { authorizedUser, fetchMore } = useAuth(true, 6);

    const onEndReach = () => {
        fetchMore();
    };

    return (
        <ReviewListContainer
            reviews={authorizedUser.reviews}
            onEndReach={onEndReach}
        />
    );
};

export default ReviewList;