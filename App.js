import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/pages/HomeScreen';
import SettingsScreen from './src/pages/SettingsScreen';
import LoginPage from './src/pages/LoginPage';


const App = () => {

	const Tab = createBottomTabNavigator();

	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Login" component={LoginPage} />
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Settings" component={SettingsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default App;