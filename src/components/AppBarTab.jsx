import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const AppBarTab = ({ text, link }) => {
    const styles = StyleSheet.create({
        container: {
            paddingTop: 20,
            paddingHorizontal: 10,
            paddingBottom: 20,
        }
    });

    return (
        <Link to={link} component={TouchableOpacity} activeOpacity={0.8}>
            <Text style={styles.container} color="white" fontSize="subheading" fontWeight="bold">
                {text}
            </Text>
        </Link >
    );
};

export default AppBarTab;