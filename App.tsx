import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import DiceScreen from './src/screens/DiceScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <View style={styles.container}>
                <StatusBar style="light" />
                <Stack.Navigator
                    initialRouteName="Dice"
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#1a1a1a',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                >
                    <Stack.Screen
                        name="Dice"
                        component={DiceScreen}
                        options={{ title: 'Dragon Dice' }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{ title: 'Настройки' }}
                    />
                </Stack.Navigator>
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
});
