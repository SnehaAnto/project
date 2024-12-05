import React, { useState, useEffect } from 'react';
import {
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle,
  IonList, IonItem, IonLabel, IonButton, IonIcon,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, useIonToast
} from '@ionic/react';
import { logOut, person } from 'ionicons/icons';
import { useIonRouter, useIonViewWillEnter } from '@ionic/react';
import './Profile.css';

interface UserProfile {
  username: string;
  email: string;
  role: string;
}

const Profile: React.FC = () => {
  const router = useIonRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [present] = useIonToast();

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:3001/users/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        const errorData = await response.json();
        present({
          message: errorData.message || 'Failed to load profile',
          duration: 2000,
          position: 'bottom',
          color: 'danger'
        });
      }
    } catch (error) {
      present({
        message: 'Network error. Please try again.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [present]);

  useIonViewWillEnter(() => {
    fetchProfile();
  });

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch('http://localhost:3001/users/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (response.ok) {
        present({
          message: 'Profile updated successfully',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
      } else {
        const errorData = await response.json();
        present({
          message: errorData.message || 'Failed to update profile',
          duration: 2000,
          position: 'bottom',
          color: 'danger'
        });
      }
    } catch (error) {
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {profile && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>User Profile</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonIcon icon={person} slot="start" />
                  <IonLabel>
                    <h2>Username</h2>
                    <p>{profile.username}</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h2>Email</h2>
                    <p>{profile.email}</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h2>Role</h2>
                    <p>{profile.role}</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        )}

        <IonButton 
          expand="block" 
          color="danger" 
          className="ion-margin-top"
          onClick={handleLogout}
        >
          <IonIcon icon={logOut} slot="start" />
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profile; 