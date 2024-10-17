import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Конфигурация Firebase (взята из Firebase консоли)
const firebaseConfig = {
  apiKey: "AIzaSyDtgbKuAAPKtPeOz27vJcH0JqIPtbxH6G0",
  authDomain: "pennywise-50c4b.firebaseapp.com",
  databaseURL: "https://pennywise-50c4b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pennywise-50c4b",
  storageBucket: "pennywise-50c4b.appspot.com",
  messagingSenderId: "677718301346",
  appId: "1:677718301346:web:b44b38f03919122d0355fb",
  measurementId: "G-YS2SG2378P"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт аутентификации и базы данных для использования в других файлах
export const auth = getAuth(app);
export const database = getDatabase(app);

/**
 * Функция для записи данных пользователя в Realtime Database Firebase
 * @param {string} userId - Идентификатор пользователя (uid)
 * @param {string} firstName - Имя пользователя
 * @param {string} lastName - Фамилия пользователя
 * @param {string} email - Email пользователя
 * @param {string} nickname - Никнейм пользователя
 * @param {string} phone - Телефон пользователя
 */
export const writeData = async (userId, firstName, lastName, email, nickname, phone) => {
  try {
    await set(ref(database, 'users/' + userId), {
      firstName,
      lastName,
      email,
      nickname,
      phone
    });
    console.log('Данные успешно записаны.');
  } catch (error) {
    console.error('Ошибка при записи данных:', error);
  }
};

/**
 * Функция для чтения данных пользователя из Realtime Database Firebase
 * @param {string} userId - Идентификатор пользователя (uid)
 * @returns {Object|null} - Данные пользователя или null, если данные отсутствуют
 */
export const readData = async (userId) => {
  const dbRef = ref(database); // Ссылка на базу данных
  try {
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) {
      console.log(`Данные для пользователя ${userId} успешно получены.`);
      return snapshot.val(); // Возвращаем данные пользователя
    } else {
      console.log(`Данные для пользователя ${userId} отсутствуют.`);
      return null;
    }
  } catch (error) {
    console.error(`Ошибка при чтении данных для пользователя ${userId}:`, error);
    return null;
  }
};
