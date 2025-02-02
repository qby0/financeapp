import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Конфігурація Firebase (взята з Firebase консоль)
const firebaseConfig =  {
    apiKey: "AIzaSyDtgbKuAAPKtPeOz27vJcH0JqIPtbxH6G0",
    authDomain: "pennywise-50c4b.firebaseapp.com",
    databaseURL: "https://pennywise-50c4b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pennywise-50c4b",
    storageBucket: "pennywise-50c4b.appspot.com",
    messagingSenderId: "677718301346",
    appId: "1:677718301346:web:b44b38f03919122d0355fb",
    measurementId: "G-YS2SG2378P"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Експорт аутентифікації та бази даних для використання в інших файлах
export const auth = getAuth(app);
export const database = getDatabase(app);

/**
 * Функція для запису даних користувача в Realtime Database Firebase
 * @param {string} userId - Ідентифікатор користувача (uid)
 * @param {string} firstName - Ім'я користувача
 * @param {string} lastName - Прізвище користувача
 * @param {string} email - Email користувача
 * @param {string} nickname - Нікнейм користувача
 * @param {string} phone - Телефон користувача
 */
export const writeData = async (userId, firstName, lastName, email, nickname, phone) => {
    try {
        await set(ref(database, `users/${userId}`), {
            firstName,
            lastName,
            email,
            nickname,
            phone
        });
        console.log('Дані успішно записані.');
    } catch (error) {
        console.error('Помилка при записі даних:', error);
    }
};

/**
 * Функція для читання даних користувача з Realtime Database Firebase
 * @param {string} userId - Ідентифікатор користувача (uid)
 * @returns {Object|null} - Дані користувача або null, якщо дані відсутні
 */
export const readData = async (userId) => {
    const dbRef = ref(database); // Посилання на базу даних
    try {
        const snapshot = await get(child(dbRef, `users/${userId}`));
        if (snapshot.exists()) {
            console.log(`Дані для користувача ${userId} успішно отримані.`);
            return snapshot.val(); // Повертаємо дані користувача
        } else {
            console.log(`Дані для користувача ${userId} відсутні.`);
            return null;
        }
    } catch (error) {
        console.error(`Помилка при читанні даних для користувача ${userId}:`, error);
        return null;
    }
};
