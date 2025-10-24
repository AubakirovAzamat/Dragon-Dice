# Dragon Dice 🎲

Мобильное приложение для бросков кубиков D&D с красивой анимацией и настройками.

## Особенности

- 🎲 Анимированные кубики с реалистичной физикой
- ⚙️ Настройки количества и размера кубиков
- 📱 Современный и интуитивный интерфейс
- 🎨 Красивые цвета и анимации
- 📊 Подсчет общей суммы бросков
- 💾 Сохранение настроек
- 🔄 Автоматическая сборка APK через GitHub Actions

## Установка и запуск

### Предварительные требования

- Node.js 18+
- npm или yarn
- Expo CLI
- Android Studio (для эмулятора) или физическое Android устройство

### Локальная разработка

1. Клонируйте репозиторий:
```bash
git clone <your-repo-url>
cd dragon-dice
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите приложение:
```bash
npm start
```

4. Отсканируйте QR-код в приложении Expo Go или запустите на эмуляторе:
```bash
npm run android
```

### Сборка APK

#### Локальная сборка

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

#### Автоматическая сборка через GitHub Actions

1. Создайте аккаунт на [expo.dev](https://expo.dev)
2. Создайте новый проект в Expo
3. Получите токен доступа в настройках аккаунта
4. Добавьте токен в секреты GitHub репозитория:
   - Перейдите в Settings → Secrets and variables → Actions
   - Добавьте новый секрет с именем `EXPO_TOKEN`
   - Вставьте ваш токен Expo

5. Запустите workflow:
   - При push в main ветку
   - Или вручную через Actions → Build APK → Run workflow

## Структура проекта

```
dragon-dice/
├── src/
│   ├── components/          # React компоненты
│   │   └── Dice.tsx        # Компонент кубика с анимацией
│   ├── screens/            # Экраны приложения
│   │   ├── DiceScreen.tsx  # Главный экран с кубиками
│   │   └── SettingsScreen.tsx # Экран настроек
│   ├── hooks/              # Пользовательские хуки
│   │   └── useSettings.ts  # Хук для управления настройками
│   └── utils/              # Утилиты
├── assets/                 # Статические ресурсы
├── .github/workflows/      # GitHub Actions
├── App.tsx                 # Главный компонент приложения
├── app.json               # Конфигурация Expo
├── eas.json               # Конфигурация EAS Build
└── package.json           # Зависимости проекта
```

## Настройки

- **Количество кубиков**: от 1 до 10
- **Размер кубика**: d4, d6, d8, d10, d12, d20, d100
- **Скорость анимации**: от 0.5x до 2.0x

## Технологии

- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage
- Expo Haptics
- React Native Reanimated
- EAS Build

## Лицензия

MIT License

## Автор

Создано с ❤️ для сообщества D&D
