import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, sendEmailVerification } from 'firebase/auth';
import { auth, readData } from './firebase'; // Импорт readData из firebase.js

// Функция для регистрации пользователя
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Отправляем письмо с подтверждением почты
    await sendEmailVerification(user);

    // Выполняем выход из аккаунта после регистрации, чтобы заставить пользователя подтвердить email
    await firebaseSignOut(auth);

    return user;
  } catch (error) {
    throw error;
  }
};

// Функция для входа пользователя
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Проверяем, подтвержден ли email
    if (!user.emailVerified) {
      throw new Error('Email не подтвержден. Пожалуйста, проверьте вашу почту для подтверждения.');
    }

    // Запрашиваем дополнительные данные пользователя из базы данных
    const userData = await readData(user.uid);
    return {
      ...user, // Информация о пользователе из Firebase Authentication
      ...userData // Дополнительные данные из базы данных
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
