import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import { Dice } from '../components/Dice';
import { useSettings } from '../hooks/useSettings';

export default function DiceScreen() {
    const navigation = useNavigation();
    const { settings } = useSettings();
    const [results, setResults] = useState<number[]>([]);
    const [total, setTotal] = useState(0);

    const handleDiceRoll = (result: number, index: number) => {
        setResults(prev => {
            const newResults = [...prev];
            newResults[index] = result;
            return newResults;
        });
    };

    const rollAllDice = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setResults([]);
        setTotal(0);
    };

    const calculateTotal = () => {
        const sum = results.reduce((acc, result) => acc + result, 0);
        setTotal(sum);
    };

    React.useEffect(() => {
        if (results.length === settings.diceCount && results.every(r => r > 0)) {
            calculateTotal();
        }
    }, [results, settings.diceCount]);

    const clearResults = () => {
        setResults([]);
        setTotal(0);
    };

    const showRollHistory = () => {
        if (results.length === 0) {
            Alert.alert('История бросков', 'Пока нет бросков');
            return;
        }

        const historyText = results.map((result, index) =>
            `Кубик ${index + 1}: ${result}`
        ).join('\n') + `\n\nОбщая сумма: ${total}`;

        Alert.alert('Результаты броска', historyText);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Dragon Dice</Text>
                    <Text style={styles.subtitle}>
                        {settings.diceCount} кубик{settings.diceCount > 1 ? 'а' : ''} d{settings.diceSize}
                    </Text>
                </View>

                <View style={styles.diceContainer}>
                    {Array.from({ length: settings.diceCount }, (_, index) => (
                        <Dice
                            key={index}
                            size={settings.diceSize}
                            animationSpeed={settings.animationSpeed}
                            onRoll={(result) => handleDiceRoll(result, index)}
                        />
                    ))}
                </View>

                {total > 0 && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.totalText}>Общая сумма: {total}</Text>
                    </View>
                )}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={rollAllDice}>
                        <Text style={styles.buttonText}>Бросить все кубики</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryButton} onPress={showRollHistory}>
                        <Text style={styles.secondaryButtonText}>Показать результаты</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryButton} onPress={clearResults}>
                        <Text style={styles.secondaryButtonText}>Очистить</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => navigation.navigate('Settings' as never)}
            >
                <Text style={styles.settingsButtonText}>⚙️</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 100,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: '#ccc',
    },
    diceContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 30,
    },
    resultContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    totalText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4ECDC4',
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#4ECDC4',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        marginBottom: 15,
        shadowColor: '#4ECDC4',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#4ECDC4',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
        marginBottom: 10,
    },
    secondaryButtonText: {
        color: '#4ECDC4',
        fontSize: 16,
        fontWeight: '600',
    },
    settingsButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4ECDC4',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4ECDC4',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    settingsButtonText: {
        fontSize: 24,
    },
});
