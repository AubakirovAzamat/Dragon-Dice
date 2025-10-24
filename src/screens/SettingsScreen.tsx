import React from 'react';
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

import { useSettings } from '../hooks/useSettings';

export default function SettingsScreen() {
    const navigation = useNavigation();
    const { settings, updateDiceCount, updateDiceSize, updateAnimationSpeed } = useSettings();

    const diceCountOptions = [1, 2, 3, 4, 5, 6, 8, 10];
    const diceSizeOptions = [4, 6, 8, 10, 12, 20, 100];
    const animationSpeedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

    const handleDiceCountChange = (count: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        updateDiceCount(count);
    };

    const handleDiceSizeChange = (size: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        updateDiceSize(size);
    };

    const handleAnimationSpeedChange = (speed: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        updateAnimationSpeed(speed);
    };

    const resetSettings = () => {
        Alert.alert(
            'Сброс настроек',
            'Вы уверены, что хотите сбросить все настройки к значениям по умолчанию?',
            [
                { text: 'Отмена', style: 'cancel' },
                {
                    text: 'Сбросить',
                    style: 'destructive',
                    onPress: () => {
                        updateDiceCount(2);
                        updateDiceSize(6);
                        updateAnimationSpeed(1.0);
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    },
                },
            ]
        );
    };

    const renderOption = (
        title: string,
        currentValue: number,
        options: number[],
        onSelect: (value: number) => void
    ) => (
        <View style={styles.optionContainer}>
            <Text style={styles.optionTitle}>{title}</Text>
            <View style={styles.optionsRow}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.optionButton,
                            currentValue === option && styles.selectedOption,
                        ]}
                        onPress={() => onSelect(option)}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                currentValue === option && styles.selectedOptionText,
                            ]}
                        >
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.title}>Настройки</Text>
                <Text style={styles.subtitle}>Настройте параметры кубиков</Text>
            </View>

            {renderOption(
                'Количество кубиков',
                settings.diceCount,
                diceCountOptions,
                handleDiceCountChange
            )}

            {renderOption(
                'Размер кубика (d)',
                settings.diceSize,
                diceSizeOptions,
                handleDiceSizeChange
            )}

            {renderOption(
                'Скорость анимации',
                settings.animationSpeed,
                animationSpeedOptions,
                handleAnimationSpeedChange
            )}

            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Информация</Text>
                <Text style={styles.infoText}>
                    • Количество кубиков: от 1 до 10
                </Text>
                <Text style={styles.infoText}>
                    • Размер кубика: стандартные размеры D&D
                </Text>
                <Text style={styles.infoText}>
                    • Скорость анимации: от 0.5x до 2.0x
                </Text>
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={resetSettings}>
                <Text style={styles.resetButtonText}>Сбросить настройки</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>← Назад к кубикам</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#ccc',
        textAlign: 'center',
    },
    optionContainer: {
        marginBottom: 30,
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 15,
        textAlign: 'center',
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    optionButton: {
        backgroundColor: '#333',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'transparent',
        minWidth: 50,
        alignItems: 'center',
    },
    selectedOption: {
        backgroundColor: '#4ECDC4',
        borderColor: '#4ECDC4',
    },
    optionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    selectedOptionText: {
        color: '#1a1a1a',
    },
    infoContainer: {
        backgroundColor: '#2a2a2a',
        padding: 20,
        borderRadius: 15,
        marginBottom: 30,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4ECDC4',
        marginBottom: 15,
    },
    infoText: {
        color: '#ccc',
        fontSize: 14,
        marginBottom: 8,
        lineHeight: 20,
    },
    resetButton: {
        backgroundColor: '#FF6B6B',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 20,
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#4ECDC4',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#4ECDC4',
        fontSize: 16,
        fontWeight: '600',
    },
});
