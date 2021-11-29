import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Screens
import Home from './screens/Home';
import RocketDetail from './screens/RocketDetail';
import RocketImages from './screens/RocketImages';
import SearchLaunches from './screens/SearchLaunches';
import LaunchResults from './screens/LaunchResults';
import FirstTimePopup from './components/FirstTimePopup';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql',
  cache: new InMemoryCache()
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <FirstTimePopup />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={RocketDetail} />
          <Stack.Screen name="Images" component={RocketImages} />
          <Stack.Screen name="Search" component={SearchLaunches} />
          <Stack.Screen name="Results" component={LaunchResults} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
