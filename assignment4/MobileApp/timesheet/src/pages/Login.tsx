import { IonContent, IonPage, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import React, { useState, FormEvent } from 'react';
import { useIonRouter } from '@ionic/react';
import './Login.css';

const Login: React.FC = () => {
  const router = useIonRouter();
  const [loginMethod, setLoginMethod] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const payload = loginMethod === 'email' 
        ? { email: identifier, password }
        : { username: identifier, password };

      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access_token);
        router.push('/tabs/new-entry');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <IonPage>
      <IonContent className="login-page">
        <div className="login-form">
          <form onSubmit={handleSubmit} className="login-form">
            <IonItem>
              <IonLabel position="stacked">Login Method</IonLabel>
              <IonSelect value={loginMethod} onIonChange={e => setLoginMethod(e.detail.value)}>
                <IonSelectOption value="username">Username</IonSelectOption>
                <IonSelectOption value="email">Email</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">{loginMethod === 'email' ? 'Email' : 'Username'}</IonLabel>
              <IonInput
                type={loginMethod === 'email' ? 'email' : 'text'}
                value={identifier}
                onIonChange={e => setIdentifier(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={e => setPassword(e.detail.value!)}
              />
            </IonItem>

            <IonButton expand="block" type="submit" className="ion-margin-top">
              Login
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login; 