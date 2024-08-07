import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useRef,
  useState
} from 'react';
import { IFormProps } from './types';

import styles from './form.module.css';
import clsx from 'clsx';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
// Используйте для проверки формата введённого имени
import { namePattern } from '../../utils/constants';

export const Form: FC<IFormProps> = ({ setMode, className }) => {
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [repeatError, setRepeatError] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
    if (password !== '' && password !== e.target.value) {
      setRepeatError(true);
    } else {
      setRepeatError(false);
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() && password === repeatPassword) {
      setMode('complete');
    }
  }

  return (
  <form
    className={clsx(styles.form, className)}
    data-testid='form'
    name='register'
    onSubmit={onSubmit}>
    <div className={styles.icon} />
    <div className={styles.text_box}>
      <p className='text text_type_main-large'>Мы нуждаемся в вашей силе!</p>
      <p className={clsx(styles.text, 'text text_type_main-medium')}>
        Зарегистрируйтесь на нашей платформе, чтобы присоединиться к списку
        контрибьюторов
      </p>
    </div>
    <fieldset className={styles.fieldset}>
      {
        /* Ваш код здесь */
        <>
          <Input
            data-testid='name-input'
            required
            type='text'
            placeholder='Имя'
            onChange={(e) => {
              if (!e.target.checkValidity() || e.target.value === '' || !namePattern.test(e.target.value)) {
                setUserNameError(true);
              } else {
                setUserNameError(false);
              }
              setUserName(e.target.value);
            }}
            value={userName}
            name='name'
            error={userNameError}
            errorText='Некорректный формат имени'
            size='default'
          />

          <EmailInput
            data-testid='email-input'
            required
            placeholder='E-mail'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name='email'
            size='default'
          />

          <PasswordInput
            data-testid='password-input'
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name='password'
          />

          {repeatError ? (
            <PasswordInput
            data-testid='repeat-password-input'
            required
            error={repeatError}
            errorText='Пароли не совпадают'
            onChange={onChange}
            value={repeatPassword}
            name='repeatPassword'
          />
          ) : (
            <PasswordInput
            data-testid='repeat-password-input'
            required
            onChange={onChange}
            value={repeatPassword}
            name='repeatPassword'
          />
          )}
          

          <Button type='primary' size='medium' htmlType='submit'>
            Зарегистрироваться
          </Button>
        </>
      }</fieldset>
    <div className={styles.signin_box}>
      <p className='text text_type_main-default text_color_inactive'>
        Уже зарегистрированы?
      </p>
      <Button
        htmlType='button'
        type='secondary'
        size='medium'
        extraClass={styles.signin_btn}
      >
        Войти
      </Button>
    </div>
  </form>
)};
