import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import RNPickerSelect from 'react-native-picker-select';
import FilterBar from './FilterBar';
import theme from '../theme';
import { useDebounce } from 'use-debounce';


const ListSortSelect = ({ sortingOrder, setSortingOrder }) => {
    const styles = StyleSheet.create({
        container: {
            padding: 10,
            paddingBottom: 20
        }
    });
    const pickerStyle = {
        inputIOS: {
            backgroundColor: theme.colors.appBackground,
            borderWidth: 0,
            height: 30,
            color: theme.colors.textPrimary,
            fontSize: theme.fontSizes.subheading,
            fontStyle: theme.fontStyle
        },
        inputAndroid: {
            backgroundColor: theme.colors.appBackground,
            borderWidth: 0,
            height: 30,
            color: theme.colors.textPrimary,
            fontSize: theme.fontSizes.subheading,
            fontStyle: theme.fontStyle
        },
        inputWeb: {
            backgroundColor: theme.colors.appBackground,
            borderWidth: 0,
            height: 30,
            color: theme.colors.textPrimary,
            fontSize: theme.fontSizes.subheading,
            fontStyle: theme.fontStyle,
        }
    };

    return (
        <View style={styles.container}>
            <RNPickerSelect
                placeholder={{
                    label: 'Select sorting of repositories...',
                    value: '',
                    color: theme.colors.textSecondary,
                }}
                style={pickerStyle}
                value={sortingOrder}
                onValueChange={(value) => setSortingOrder(value)}
                items={[
                    { label: 'Latest repositories', value: 'latest' },
                    { label: 'Highest rated repositories', value: 'highest' },
                    { label: 'Lowest rated repositories', value: 'lowest' },
                ]}
            />
        </View>

    );
};

const HeaderComponent = ({ sortingOrder, setSortingOrder, searchQuery, setSearchQuery }) => {
    return (
        <>
            <FilterBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <ListSortSelect sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
        </>
    );
};

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

// export const RepositoryListContainer = ({ repositories, sortingOrder, setSortingOrder, searchQuery, setSearchQuery }) => {
//     const history = useHistory();
//     const repositoryNodes = repositories
//         ? repositories.edges.map(edge => edge.node)
//         : [];

//     return (
//         <FlatList
//             data={repositoryNodes}
//             ListHeaderComponent={() =>
//                 <HeaderComponent
//                     sortingOrder={sortingOrder}
//                     setSortingOrder={setSortingOrder}
//                     searchQuery={searchQuery}
//                     setSearchQuery={setSearchQuery}
//                 />}
//             ItemSeparatorComponent={ItemSeparator}
//             renderItem={({ item, index, separators }) => (
//                 <TouchableOpacity onPress={() => history.push(`/${item.id}`)} >
//                     <RepositoryItem
//                         key={index}
//                         onShowUnderlay={separators.highlight}
//                         onHideUnderlay={separators.unhighlight}
//                         item={item}
//                     />
//                 </TouchableOpacity>
//             )}
//         />
//     );
// };

export class RepositoryListContainer extends React.Component {
    renderHeader = () => {
        const props = this.props;

        return (
            <HeaderComponent
                sortingOrder={props.sortingOrder}
                setSortingOrder={props.setSortingOrder}
                searchQuery={props.searchQuery}
                setSearchQuery={props.setSearchQuery}
            />
        );
    };

    render() {
        const props = this.props;
        const repositoryNodes = props.repositories
            ? props.repositories.edges.map(edge => edge.node)
            : [];

        return (
            <FlatList
                data={repositoryNodes}
                ListHeaderComponent={this.renderHeader}
                ItemSeparatorComponent={ItemSeparator}
                onEndReached={props.onEndReach}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index, separators }) => (
                    <TouchableOpacity onPress={() => props.history.push(`/${item.id}`)} >
                        <RepositoryItem
                            key={index}
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}
                            item={item}
                        />
                    </TouchableOpacity>
                )}
            />);
    }
}

const RepositoryList = () => {
    const history = useHistory();
    const [sortingOrder, setSortingOrder] = useState('latest');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filterText] = useDebounce(searchQuery, 500);
    const { repositories, fetchMore } = useRepositories({ sortingOrder, filterText, first: 8 });

    const onEndReach = () => {
        fetchMore();
    };

    return (
        <RepositoryListContainer
            repositories={repositories}
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            history={history}
            onEndReach={onEndReach}
        />
    );
};

export default RepositoryList;