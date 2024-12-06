import React, { useState, useEffect } from 'react';
import {
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle,
  IonList, IonItem, IonLabel, IonButton, IonIcon,
  IonCard, IonCardContent, IonCardHeader, useIonToast, IonAvatar, IonSkeletonText
} from '@ionic/react';
import { logOut, person, mail, shield } from 'ionicons/icons';
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
  const [loading, setLoading] = useState(true);
  const [present] = useIonToast();

  useEffect(() => {
    const loadProfile = () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        setProfile({
          username: userData.username || '',
          email: userData.email || '',
          role: userData.role || ''
        });
      } catch (error) {
        present({
          message: 'Failed to load profile data',
          duration: 3000,
          color: 'danger'
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [present]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    router.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading ? (
          <IonCard>
            <IonCardContent>
              <IonSkeletonText animated style={{ width: '60%' }} />
              <IonSkeletonText animated style={{ width: '80%' }} />
              <IonSkeletonText animated style={{ width: '70%' }} />
            </IonCardContent>
          </IonCard>
        ) : (
          profile && (
            <div className="ion-text-center">
              <IonCard>
                <IonCardHeader>
                  <IonAvatar style={{ margin: '0 auto', width: '100px', height: '100px' }}>
                    <img 
                      src={`https://ui-avatars.com/api/?name=${profile.username}&background=random&size=200`} 
                      alt="avatar"
                    />
                  </IonAvatar>
                </IonCardHeader>

                <IonCardContent>
                  <IonList lines="none">
                    <IonItem>
                      <IonIcon icon={person} slot="start" color="primary" />
                      <IonLabel>
                        <h2 className="ion-text-wrap">Username</h2>
                        <p>{profile.username}</p>
                      </IonLabel>
                    </IonItem>

                    <IonItem>
                      <IonIcon icon={mail} slot="start" color="primary" />
                      <IonLabel>
                        <h2 className="ion-text-wrap">Email</h2>
                        <p>{profile.email}</p>
                      </IonLabel>
                    </IonItem>

                    <IonItem>
                      <IonIcon icon={shield} slot="start" color="primary" />
                      <IonLabel>
                        <h2 className="ion-text-wrap">Role</h2>
                        <p>{profile.role}</p>
                      </IonLabel>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>

              <IonButton 
                expand="block" 
                color="danger" 
                className="ion-margin-top ion-margin-bottom"
                onClick={handleLogout}
              >
                <IonIcon icon={logOut} slot="start" />
                Logout
              </IonButton>
            </div>
          )
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile; 