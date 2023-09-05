import * as yup from 'yup';
const polishLettersString = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚżŻźŹ -]*$/;

export const userDataValidationSchema = yup.object({
    email: yup.string().email('Podaj prawidłowy adres email'),
    firstName: yup.string().matches(polishLettersString, {
        message: 'Imię zawiera nieodpowiednie znaki',
    }),
    lastName: yup.string().matches(polishLettersString, {
        message: 'Nazwisko zawiera nieodpowiednie znaki',
    }),

    phoneNumber: yup
        .string()
        .matches('^\\d{9}$', 'Podaj poprawny numer telefonu')
        .trim(),
    password: yup
        .string()
        .matches(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
            'Hasło musi zawierać od 8 do 16 znaków w tym co najmniej 1 dużą i małą literę, co najmniej 1 cyfrę i symbol specjalny nie może też zawierać odstępów'
        ),
});
export const loginValidationSchema = yup.object({
    email: yup.string().email('Podaj prawidłowy adres email'),
    password: yup
        .string()
        .matches(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
            'Hasło musi zawierać od 8 do 16 znaków w tym co najmniej 1 dużą i małą literę, co najmniej 1 cyfrę i symbol specjalny nie może też zawierać odstępów'
        ),
});
export const passwordValidationSchema = yup.object({
    actualPassword: yup
        .string()
        .matches(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
            'Hasło musi zawierać od 8 do 16 znaków w tym co najmniej 1 dużą i małą literę, co najmniej 1 cyfrę i symbol specjalny nie może też zawierać odstępów'
        ),
    newPassword: yup
        .string()
        .matches(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
            'Hasło musi zawierać od 8 do 16 znaków w tym co najmniej 1 dużą i małą literę, co najmniej 1 cyfrę i symbol specjalny nie może też zawierać odstępów'
        ),
});
