import React, { useState } from 'react';
import { useIonRouter } from '@ionic/react';
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  useIonToast,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent
} from '@ionic/react';
import './Register.css';

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  role: 'hr' | 'employee';
}

const Register: React.FC = () => {
  const router = useIonRouter();
  const [present] = useIonToast();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    username: '',
    password: '',
    role: 'employee'
  });

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        present({
          message: 'Registration successful! Please login.',
          duration: 2000,
          position: 'top',
          color: 'success'
        });
        router.push('/login');
      } else {
        const errorData = await response.json();
        present({
          message: errorData.message || 'Registration failed',
          duration: 2000,
          position: 'top',
          color: 'danger'
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      present({
        message: 'Registration failed. Please try again.',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="register-page">
        <IonCard className="register-form">
          <IonCardContent>
            <h2 className="ion-text-center ion-padding-bottom">Create Account</h2>
            
            <IonItem>
              <IonLabel>Email</IonLabel>
              <IonInput
                type="email"
                value={formData.email}
                onIonChange={e => setFormData({...formData, email: e.detail.value || ''})}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel>Username</IonLabel>
              <IonInput
                type="text"
                value={formData.username}
                onIonChange={e => setFormData({...formData, username: e.detail.value || ''})}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel>Password</IonLabel>
              <IonInput
                type="password"
                value={formData.password}
                onIonChange={e => setFormData({...formData, password: e.detail.value || ''})}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel>Role</IonLabel>
              <IonSelect
                value={formData.role}
                onIonChange={e => setFormData({...formData, role: e.detail.value})}
              >
                <IonSelectOption value="employee">Employee</IonSelectOption>
                <IonSelectOption value="hr">HR</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonButton expand="block" onClick={handleRegister} className="ion-margin-top">
              Register
            </IonButton>

            <IonButton 
              expand="block" 
              fill="clear" 
              onClick={() => router.push('/login')}
              className="login-link"
              size="small"
            >
              Already have an account? Login
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register; 