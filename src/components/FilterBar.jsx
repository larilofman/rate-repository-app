import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

const FilterBar = ({ searchQuery, setSearchQuery }) => {

    const styles = StyleSheet.create({
        container: {
            padding: 15
        }
    });

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search repositories"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
        </View>

    );
};

export default FilterBar;