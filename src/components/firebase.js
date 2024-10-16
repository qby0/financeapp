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

// Экспортируем аутентификацию и базу данных для использования в других файлах
export const auth = getAuth(app);
export const database = getDatabase(app);

// Асинхронная функция для записи данных в базу данных
export const writeData = async (userId, firstName, lastName, email, nickname, phone) => {
  try {
    await set(ref(database, 'users/' + userId), {
      firstName: firstName,
      lastName: lastName,  // Записываем фамилию
      email: email,
      nickname: nickname,
      phone: phone  // Записываем телефон
    });
    console.log('Data written successfully');
  } catch (error) {
    console.error('Error writing data:', error);
  }
};

// Асинхронная функция для чтения данных из базы данных
export const readData = async (userId) => {
  const dbRef = ref(database);  // Получаем ссылку на базу данных
  try {
    // Получаем данные из базы данных по пути users/{userId}
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) {
      console.log('Data fetched for user:', userId);
      return snapshot.val();  // Возвращаем данные
    } else {
      console.log("No data available for user:", userId);
      return null;  // Если данных нет
    }
  } catch (error) {
    console.error('Error reading data for user:', userId, error);
    return null;  // Возвращаем null в случае ошибки
  }
};
