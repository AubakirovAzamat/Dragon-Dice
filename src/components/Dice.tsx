import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import * as Haptics from 'expo-haptics';

interface DiceProps {
    size: number;
    animationSpeed: number;
    onRoll?: (result: number) => void;
}

const { width } = Dimensions.get('window');

export const Dice: React.FC<DiceProps> = ({ size, animationSpeed, onRoll }) => {
    const rotateX = useRef(new Animated.Value(0)).current;
    const rotateY = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;
    const [isRolling, setIsRolling] = React.useState(false);
    const [result, setResult] = React.useState(1);

    const rollDice = () => {
        if (isRolling) return;

        setIsRolling(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        // Сброс анимации
        rotateX.setValue(0);
        rotateY.setValue(0);
        scale.setValue(1);

        // Анимация вращения
        const rotationAnimation = Animated.loop(
            Animated.parallel([
                Animated.timing(rotateX, {
                    toValue: 1,
                    duration: 200 / animationSpeed,
                    useNativeDriver: true,
                }),
                Animated.timing(rotateY, {
                    toValue: 1,
                    duration: 300 / animationSpeed,
                    useNativeDriver: true,
                }),
            ]),
            { iterations: 8 }
        );

        // Анимация масштаба
        const scaleAnimation = Animated.sequence([
            Animated.timing(scale, {
                toValue: 1.1,
                duration: 100 / animationSpeed,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 100 / animationSpeed,
                useNativeDriver: true,
            }),
        ]);

        Animated.parallel([rotationAnimation, scaleAnimation]).start(() => {
            const newResult = Math.floor(Math.random() * size) + 1;
            setResult(newResult);
            setIsRolling(false);
            onRoll?.(newResult);
        });
    };

    const rotateXInterpolate = rotateX.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const rotateYInterpolate = rotateY.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const getDiceColor = () => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
        return colors[result % colors.length];
    };

    return (
        <TouchableOpacity onPress={rollDice} activeOpacity={0.8}>
            <Animated.View
                style={[
                    styles.dice,
                    {
                        backgroundColor: getDiceColor(),
                        transform: [
                            { rotateX: rotateXInterpolate },
                            { rotateY: rotateYInterpolate },
                            { scale },
                        ],
                    },
                ]}
            >
                <Text style={styles.diceText}>{result}</Text>
                <View style={styles.diceBorder} />
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    dice: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    diceText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    diceBorder: {
        position: 'absolute',
        top: 2,
        left: 2,
        right: 2,
        bottom: 2,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
});
