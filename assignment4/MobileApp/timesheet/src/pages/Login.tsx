import { IonContent, IonPage, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, useIonToast } from '@ionic/react';
import React, { useState, FormEvent } from 'react';
import { useIonRouter } from '@ionic/react';
import './Login.css';

const Login: React.FC = () => {
  const router = useIonRouter();
  const [present] = useIonToast();
  const [loginMethod, setLoginMethod] = useState('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!identifier || !password) {
      present({
        message: 'Please fill in all fields',
        duration: 3000,
        color: 'danger'
      });
      return;
    }

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
        
        // Store user data from token
        const tokenPayload = JSON.parse(atob(data.access_token.split('.')[1]));
        localStorage.setItem('userData', JSON.stringify({
          username: tokenPayload.username,
          email: tokenPayload.email,
          role: tokenPayload.role
        }));
        
        router.push('/tabs/new-entry', 'forward', 'replace');
        present({
          message: 'Login successful!',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
      } else {
        const errorData = await response.json();
        present({
          message: errorData.message || 'Login failed',
          duration: 2000,
          position: 'bottom',
          color: 'danger'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      present({
        message: 'Network error. Please try again.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
    }
  };

  return (
    <IonPage>
      <IonContent className="login-page">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="ion-text-center ion-padding-bottom">Login</h2>
          
          <IonItem className="ion-margin-bottom">
            <IonLabel>Login Method</IonLabel>
            <IonSelect value={loginMethod} onIonChange={e => setLoginMethod(e.detail.value)}>
              <IonSelectOption value="email">Email</IonSelectOption>
              <IonSelectOption value="username">Username</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem className="ion-margin-bottom">
            <IonLabel>{loginMethod === 'email' ? 'Email' : 'Username'}</IonLabel>
            <IonInput
              type={loginMethod === 'email' ? 'email' : 'text'}
              value={identifier}
              onIonInput={e => setIdentifier(e.detail.value!)}
              required
              className="ion-padding-top"
            />
          </IonItem>

          <IonItem className="ion-margin-bottom">
            <IonLabel>Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonInput={e => setPassword(e.detail.value!)}
              required
              className="ion-padding-top"
            />
          </IonItem>

          <IonButton expand="block" type="submit" className="ion-margin-top">
            Login
          </IonButton>

          <IonButton 
            expand="block" 
            fill="clear" 
            onClick={() => router.push('/register')}
            className="ion-margin-top"
            size="small"
          >
            Don't have an account? Sign up!
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login; 