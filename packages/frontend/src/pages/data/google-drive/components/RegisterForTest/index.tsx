import React, { FunctionComponent } from 'react';
import TextInput from '@/components/BaseFormFields/TextInput';
import FormFieldWrapper from '@/components/FormFieldWrapper';
import styles from './styles.module.scss';
import clsx from 'clsx';
import apiInstance from '@/helpers/api';
import { toast } from 'react-toastify';
import Button from '@/components/Button';

type Props = {
  className?: string;
};

async function register(email: string) {
  const res = await apiInstance.post('/test-register/google-api-app', {
    email,
  });
  toast(res.data.message, {
    type: 'success',
  });
}

const RegisterForTest: FunctionComponent<Props> = ({ className }) => {
  const [email, setEmail] = React.useState('');
  return (
    <section className={clsx(styles.RegisterForTest, className)}>
      <h2>Register for Test</h2>
      <p>
        Google API app is in test mode, to be able to use it you should be
        registered as a tester. Request joining as a tester by providing your
        Google account email below.
      </p>
      <div className={styles.form}>
        <TextInput
          className={styles.input}
          id={'email'}
          name={'email'}
          placeholder={'Enter your email'}
          type={'email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button disabled={!email} onClick={() => register(email)}>
          Register
        </Button>
      </div>
    </section>
  );
};

export default RegisterForTest;
