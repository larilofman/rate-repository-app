import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import Text from './Text';

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
                <Text style={styles.info} fontWeight='bold'>{fullName}</Text>
                <Text style={styles.info} color='textSecondary'>{description}</Text>
                <Text style={styles.languageContainer}>{language}</Text>
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
            <Text fontWeight='bold'>{count}</Text>
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
            {/* <Text>Stars: {stargazersCount}</Text>
            <Text>Forks: {forksCount}</Text>
            <Text>Reviews: {reviewCount}</Text>
            <Text>Rating: {ratingAverage}</Text> */}
        </View>
    );
};


const RepositoryItem = ({ item }) => {
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            backgroundColor: theme.colors.white,
            padding: 15,
        },
        tinyLogo: {
            width: 50,
            height: 50,
        },
    });

    const formatCount = (number) => {
        // return Math.abs(number) > 999 ? Math.sign(number) * ((Math.abs(number) / 1000).toFixed(1)) + 'k' : Math.sign(number) * Math.abs(number);
        return number > 999 ? (number / 1000).toFixed(1) + 'k' : number;
    };

    return (
        <View style={styles.container}>
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
        </View>
    );
};

export default RepositoryItem;