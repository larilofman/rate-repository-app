import React from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, FlatList } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import * as WebBrowser from 'expo-web-browser';
import { format } from 'date-fns';

const ItemHeader = ({ ownerAvatarUrl, fullName, description, language }) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexGrow: 1,
        },
        avatar: {
            width: 50,
            height: 50,
            borderRadius: 4,
        },
        avatarContainer: {
            flexGrow: 0,
        },
        infoContainer: {
            paddingLeft: 15,
            paddingBottom: 10,
            flexShrink: 1,
        },
        info: {
            flexWrap: 'wrap',
            paddingBottom: 10
        },
        languageContainer: {
            backgroundColor: theme.colors.primary,
            color: theme.colors.white,
            padding: 3,
            borderRadius: 3,
            flexGrow: 0,
            alignSelf: 'flex-start'
        }
    });
    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
            </View>
            <View style={styles.infoContainer}>
                <Text testID="fullName" style={styles.info} fontWeight='bold'>{fullName}</Text>
                <Text testID="description" style={styles.info} color='textSecondary'>{description}</Text>
                <Text testID="language" style={styles.languageContainer}>{language}</Text>
            </View>

        </View >
    );
};

const CountDisplay = ({ name, count }) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'column',
        },
    });
    return (
        <View style={styles.container}>
            <Text testID={`${name}Count`} fontWeight='bold'>{count}</Text>
            <Text color='textSecondary'>{name}</Text>
        </View>
    );
};

const ItemFooter = ({ stargazersCount, forksCount, reviewCount, ratingAverage }) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexGrow: 1,
            justifyContent: 'space-evenly'
        },
    });
    return (
        <View style={styles.container}>
            <CountDisplay name='Stars' count={stargazersCount} />
            <CountDisplay name='Forks' count={forksCount} />
            <CountDisplay name='Reviews' count={reviewCount} />
            <CountDisplay name='Rating' count={ratingAverage} />
        </View>
    );
};

export const ReviewItem = ({ review, showUsername = true }) => {
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: theme.colors.white,
            padding: 15
        },
        ratingContainer: {
            width: 40,
            height: 40,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: theme.colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 15
        },
        textContainer: {
            display: 'flex',
            flexShrink: 1,
        },
        review: {
            flexWrap: 'wrap',
            paddingTop: 5,
        }

    });
    return (
        <View style={styles.container}>
            <View style={styles.ratingContainer}>
                <Text color='primary' fontWeight='bold' fontSize='subheading'>
                    {review.rating}
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text fontWeight='bold'>
                    {showUsername
                        ? review.user.username
                        : `${review.repository.ownerName}/${review.repository.name}`}
                </Text>
                <Text color='textSecondary'>
                    {format(new Date(review.createdAt), 'dd.MM.yyyy')}
                </Text>
                <Text style={styles.review}>
                    {review.text}
                </Text>
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

export const SingleRepository = () => {
    const params = useParams();
    const { repository, fetchMore } = useRepository({ id: params.id, firstReviews: 5 });
    const reviews = repository?.reviews.edges.map(e => e.node);

    if (!repository) {
        return null;
    }

    const onEndReach = () => {
        fetchMore();
    };

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={() => <RepositoryItem item={repository} showButton={true} />}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};

const RepositoryItem = ({ item, showButton }) => {
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            backgroundColor: theme.colors.white,
            padding: 15,
        },
        extraMargin: {
            marginBottom: 10
        },
        button: {
            height: 50,
            backgroundColor: theme.colors.primary,
            marginTop: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4
        },
        buttonText: {
            color: theme.colors.white,
        }
    });

    const formatCount = (number) => {
        return number > 999 ? (number / 1000).toFixed(1) + 'k' : number;
    };

    const handleOpenWithBrowser = (url) => {
        WebBrowser.openBrowserAsync(url);
    };

    const containerStyle = [
        styles.container,
        showButton && styles.extraMargin
    ];

    return (
        <View style={containerStyle} testID='repositoryItem'>
            <ItemHeader
                ownerAvatarUrl={item.ownerAvatarUrl}
                fullName={item.fullName}
                description={item.description}
                language={item.language}
            />
            <ItemFooter
                stargazersCount={formatCount(item.stargazersCount)}
                forksCount={formatCount(item.forksCount)}
                reviewCount={formatCount(item.reviewCount)}
                ratingAverage={formatCount(item.ratingAverage)}
            />
            {showButton &&
                <TouchableWithoutFeedback onPress={() => handleOpenWithBrowser(item.url)} >
                    <View style={styles.button}>
                        <Text fontWeight='bold' style={styles.buttonText}>Open in GitHub</Text>
                    </View>
                </TouchableWithoutFeedback>}
        </View>
    );
};

export default RepositoryItem;