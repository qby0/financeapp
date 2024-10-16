import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, database, readData } from './firebase'; // Импорт readData из firebase.js

// Функция для регистрации пользователя
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Функция для входа пользователя
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Запрашиваем данные пользователя из базы данных
    const userData = await readData(user.uid); // Чтение данных пользователя из базы
    return {
      ...user, // Информация о пользователе из Firebase Authentication
      ...userData // Дополнительные данные, такие как nickname, из базы данных
    };
  } catch (error) {
    throw error;
  }
};

// Функция для выхода пользователя
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};
