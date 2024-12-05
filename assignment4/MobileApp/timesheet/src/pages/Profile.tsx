import React, { useState, useEffect } from 'react';
import {
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle,
  IonList, IonItem, IonLabel, IonButton, IonIcon,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle
} from '@ionic/react';
import { logOut, person } from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import './Profile.css';

interface UserProfile {
  username: string;
  email: string;
  role: string;
}

const Profile: React.FC = () => {
  const router = useIonRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/user/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
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