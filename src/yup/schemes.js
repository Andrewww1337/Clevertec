import * as yup from 'yup';

export const schemaFirstStep = yup
  .object({
    username: yup
      .string()
      .required('о')
      .test('isLoverAndNumber', 'сринч', (value) => (value.match(/[а-я]/i) && !value.match(/[0-9]/i) ? false : true))
      .test('isLover', 'срич', (value) => (!value.match(/[а-я]/i) || !value.match(/[0-9]/i) ? true : false))
      .test('isRussian', 'ср', (value) => (value.match(/[а-я]/i) ? false : true))
      .matches(/[a-zA-Z]/i, 'нсб')
      .matches(/\d/, 'нсч'),
    password: yup
      .string()
      .required('о')
      .test('isShortAndLover', 'кнбич', (value) =>
        value.length < 8 && value.toLowerCase() === value && !value.match(/[0-9]/i) ? false : true
      )
      .test('isShortAndNoWord', 'кнб', (value) => (value.length < 8 && value.toLowerCase() === value ? false : true))
      .test('isLoverAndShort', 'кеб', (value) =>
        value.length < 8 && value.toLowerCase() !== value && !value.match(/[0-9]/i) ? false : true
      )
      .test('isLoverAndNumber', 'нббич', (value) =>
        value.toLowerCase() === value && !value.match(/[0-9]/i) ? false : true
      )
      .test('isLoverCase', 'нбб', (value) => (value.toLowerCase() === value ? false : true))
      .matches(/\d/, 'нсч')
      .min(8, 'к'),
  })
  .required();

export const schemaSecontStep = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  })
  .required();

export const schemaThirdStep = yup
  .object({
    phone: yup
      .string()
      .required('о')
      .test('isShort', 'неправильный код или длина', (value) =>
        value.replace(/\D/g, '').length === 12 &&
        ['29', '33', '44', '25'].includes(value.replace(/\D/g, '').substr(3, 2))
          ? true
          : false
      ),
    email: yup.string().required('о').email(),
  })
  .required();

export const schemaForgotPass = yup
  .object({
    password: yup
      .string()
      .required('о')
      .test('isLength', 'кнбич', (value) =>
        value.length < 8 && value.toLowerCase() === value && !value.match(/[0-9]/i) ? false : true
      )
      .test('isShort', 'кнб', (value) => (value.length < 8 && value.toLowerCase() === value ? false : true))
      .test('isShortAndWord', 'кеб', (value) =>
        value.length < 8 && value.toLowerCase() !== value && !value.match(/[0-9]/i) ? false : true
      )
      .test('isShortAndNoWord', 'нббич', (value) =>
        value.toLowerCase() === value && !value.match(/[0-9]/i) ? false : true
      )
      .test('isNoUpper', 'нбб', (value) => (value.toLowerCase() === value ? false : true))
      .matches(/\d/, 'нсч')
      .min(8, 'к'),
    passwordConfirmation: yup.string().required('о'),
  })
  .required();

export const schemaRecoveryPass = yup
  .object({
    email: yup.string().required('о').email(),
  })
  .required();

export const schemaAuth = yup
  .object({
    identifier: yup.string().required('о'),
    password: yup.string().required('о'),
  })
  .required();

export const schemaChangeUserInfo = yup
  .object({
    login: yup
      .string()
      .required('о')
      .test('isLoverAndNumber', 'сринч', (value) => (value.match(/[а-я]/i) && !value.match(/[0-9]/i) ? false : true))
      .test('isLover', 'срич', (value) => (!value.match(/[а-я]/i) || !value.match(/[0-9]/i) ? true : false))
      .test('isRussian', 'ср', (value) => (value.match(/[а-я]/i) ? false : true))
      .matches(/[a-zA-Z]/i, 'нсб')
      .matches(/\d/, 'нсч'),
    password: yup
      .string()
      .required('о')
      .test('isShortAndLover', 'кнбич', (value) =>
        value.length < 8 && value.toLowerCase() === value && !value.match(/[0-9]/i) ? false : true
      )
      .test('isShortAndNoWord', 'кнб', (value) => (value.length < 8 && value.toLowerCase() === value ? false : true))
      .test('isLoverAndShort', 'кеб', (value) =>
        value.length < 8 && value.toLowerCase() !== value && !value.match(/[0-9]/i) ? false : true
      )
      .test('isLoverAndNumber', 'нббич', (value) =>
        value.toLowerCase() === value && !value.match(/[0-9]/i) ? false : true
      )
      .test('isLoverCase', 'нбб', (value) => (value.toLowerCase() === value ? false : true))
      .matches(/\d/, 'нсч')
      .min(8, 'к'),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup
      .string()
      .test('isShort', 'неправильный код или длина', (value) =>
        value.replace(/\D/g, '').length === 12 &&
        ['29', '33', '44', '25'].includes(value.replace(/\D/g, '').substr(3, 2))
          ? true
          : false
      ),
    email: yup.string().required('о').email(),
  })
  .required();
