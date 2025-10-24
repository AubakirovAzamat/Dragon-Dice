# Инструкция по настройке Dragon Dice

## Быстрый старт

### 1. Установка зависимостей

```bash
# Установите Node.js 18+ с официального сайта
# https://nodejs.org/

# Установите Expo CLI глобально
npm install -g @expo/cli

# Установите зависимости проекта
npm install
```

### 2. Запуск в режиме разработки

```bash
# Запустите Metro bundler
npm start

# Или запустите напрямую на Android
npm run android
```

### 3. Тестирование на устройстве

1. Установите приложение **Expo Go** на ваш Android телефон
2. Отсканируйте QR-код, который появится в терминале
3. Приложение загрузится на ваше устройство

## Сборка APK

### Локальная сборка

1. Установите EAS CLI:
```bash
npm install -g @expo/eas-cli
```

2. Войдите в аккаунт Expo:
```bash
eas login
```

3. Соберите APK:
```bash
eas build --platform android --profile preview
```

### Автоматическая сборка через GitHub

1. Создайте аккаунт на [expo.dev](https://expo.dev)
2. Создайте новый проект
3. Получите токен доступа в настройках
4. Добавьте токен в GitHub Secrets:
   - Settings → Secrets and variables → Actions
   - Новый секрет: `EXPO_TOKEN`
5. Запустите workflow в Actions

## Структура файлов

```
dragon-dice/
├── App.tsx                 # Главный компонент
├── src/
│   ├── components/
│   │   └── Dice.tsx       # Компонент кубика
│   ├── screens/
│   │   ├── DiceScreen.tsx # Главный экран
│   │   └── SettingsScreen.tsx # Настройки
│   └── hooks/
│       └── useSettings.ts # Управление настройками
├── .github/workflows/     # GitHub Actions
├── app.json              # Конфигурация Expo
└── eas.json              # Конфигурация сборки
```

## Возможные проблемы

### Ошибка "Metro bundler not found"
```bash
npm install -g @expo/cli
npx expo install --fix
```

### Ошибка с зависимостями
```bash
rm -rf node_modules
npm install
```

### Проблемы с Android SDK
- Установите Android Studio
- Настройте переменные окружения ANDROID_HOME
- Добавьте platform-tools в PATH

## Полезные команды

```bash
# Очистка кэша
npx expo start --clear

# Проверка конфигурации
npx expo doctor

# Обновление зависимостей
npx expo install --fix
```
