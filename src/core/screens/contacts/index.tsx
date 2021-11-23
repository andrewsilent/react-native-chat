import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { filter, sortBy } from 'lodash';

import { RootState } from '../../redux/store';
import { UserContactCard } from '../../components/user-contact-card';
import { theme } from '../../theme';
import { SearchBar } from '../../components/search-bar';
import { User } from '../../interfaces';
import { getFullName } from '../../utils';

export const Contacts = () => {
  const isDefaultTheme = useSelector((state: RootState) => state.settings.isDefaultTheme);
  const user = useSelector((state: RootState) => state.user);

  const [contacts, changeContacts] = useState<User[]>([]);
  const [searchBy, setSearchBy] = useState<string>('');

  const onChangeSearch = useCallback((value: string) => {
    setSearchBy(value ? value : '');
  }, []);

  useEffect(() => {
    let list = user.contacts;
    if (searchBy.length > 0) {
      list = filter(user.contacts, e => getFullName(e).toLowerCase().search(searchBy.toLowerCase()) >= 0);
    }
    changeContacts(sortBy(list, 'firstName'));
  }, [user.contacts, searchBy]);

  const containerTheme = useMemo(
    () => ({
      backgroundColor: isDefaultTheme ? theme.colors.neutral.white : theme.colors.neutral.active,
    }),
    [isDefaultTheme]
  );

  const userCardWrapperTheme = useMemo(
    () => ({
      borderColor: isDefaultTheme ? theme.colors.neutral.line : theme.colors.neutral.dark,
    }),
    [isDefaultTheme]
  );

  const renderItem = useCallback(
    ({ item: user }) => {
      return (
        <View key={user.firstName} style={[styles.userCardWrapper, userCardWrapperTheme]}>
          <UserContactCard user={user} />
        </View>
      );
    },
    [userCardWrapperTheme]
  );

  return (
    <SafeAreaView style={[styles.container, containerTheme]}>
      <View style={styles.searchBarWrapper}>
        <SearchBar onChangeSearch={onChangeSearch} searchBy={searchBy} />
      </View>
      <FlatList data={contacts} renderItem={renderItem} keyExtractor={item => item.phoneNumber.number as string} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingBottom: 36,
    width: '100%',
  },
  searchBarWrapper: {
    marginVertical: 16,
  },
  userCardWrapper: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
});
