import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Settings {
    diceCount: number;
    diceSize: number;
    animationSpeed: number;
}

const DEFAULT_SETTINGS: Settings = {
    diceCount: 2,
    diceSize: 6,
    animationSpeed: 1.0,
};

export const useSettings = () => {
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const savedSettings = await AsyncStorage.getItem('diceSettings');
            if (savedSettings) {
                setSettings(JSON.parse(savedSettings));
            }
        } catch (error) {
            console.error('Ошибка загрузки настроек:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveSettings = async (newSettings: Settings) => {
        try {
            await AsyncStorage.setItem('diceSettings', JSON.stringify(newSettings));
            setSettings(newSettings);
        } catch (error) {
            console.error('Ошибка сохранения настроек:', error);
        }
    };

    const updateDiceCount = (count: number) => {
        const newSettings = { ...settings, diceCount: count };
        saveSettings(newSettings);
    };

    const updateDiceSize = (size: number) => {
        const newSettings = { ...settings, diceSize: size };
        saveSettings(newSettings);
    };

    const updateAnimationSpeed = (speed: number) => {
        const newSettings = { ...settings, animationSpeed: speed };
        saveSettings(newSettings);
    };

    return {
        settings,
        isLoading,
        updateDiceCount,
        updateDiceSize,
        updateAnimationSpeed,
    };
};
