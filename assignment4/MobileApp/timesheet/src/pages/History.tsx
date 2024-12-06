import React, { useState, useEffect } from 'react';
import {
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle,
  IonList, IonItem, IonLabel, IonButton, IonIcon,
  IonRefresher, IonRefresherContent, useIonViewWillEnter,
  useIonToast, IonAlert
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import './History.css';

interface TimesheetEntry {
  _id: string;
  date: string;
  project: string;
  hours: number;
  description: string;
}

interface TimesheetResponse {
  data: TimesheetEntry[];
  total: number;
  page: number;
  lastPage: number;
}

const History: React.FC = () => {
  const [entries, setEntries] = useState<TimesheetEntry[]>([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState<string>('');
  const [present] = useIonToast();

  const loadEntries = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('userData')||'{}').username;
      const response = await fetch(`http://localhost:3001/timesheet/${userId}/entries?limit=100`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (response.ok) {
        const responseData: TimesheetResponse = await response.json();
        console.log('Entries loaded:', responseData.data);
        setEntries(responseData.data);
      } else {
        const errorData = await response.json();
        present({
          message: errorData.message || 'Failed to load entries',
          duration: 2000,
          position: 'top',
          color: 'danger'
        });
      }
    } catch (error) {
      console.error('Error loading entries:', error);
      present({
        message: 'Network error. Please try again.',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  useIonViewWillEnter(() => {
    loadEntries();
  });

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/timesheet/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log('Entry deleted:', id);
        present({
          message: 'Entry deleted successfully',
          duration: 2000,
          position: 'top',
          color: 'success'
        });
        
        await loadEntries();
      } else {
        const errorData = await response.json();
        present({
          message: errorData.message || 'Failed to delete entry',
          duration: 2000,
          position: 'top',
          color: 'danger'
        });
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      present({
        message: 'Network error. Please try again.',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
    }
  };

  const handleRefresh = async (event: CustomEvent) => {
    await loadEntries();
    event.detail.complete();
  };

  const confirmDelete = (id: string) => {
    console.log('Confirm delete for entry:', id);
    setSelectedEntryId(id);
    setShowDeleteAlert(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Timesheet History</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Confirm Delete"
          message="Are you sure you want to delete this entry?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Delete',
              role: 'destructive',
              handler: () => {
                handleDelete(selectedEntryId);
                return true;
              }
            }
          ]}
        />

        <IonList>
          {entries.map(entry => (
            <IonItem key={entry._id}>
              <IonLabel>
                <h2>{new Date(entry.date).toLocaleDateString()}</h2>
                <h3>{entry.project}</h3>
                <p>{entry.hours} hours</p>
                <p>{entry.description}</p>
              </IonLabel>
              <IonButton 
                fill="clear" 
                slot="end" 
                onClick={(e) => {
                  e.stopPropagation();
                  confirmDelete(entry._id);
                }}
              >
                <IonIcon icon={trash} slot="icon-only" color="danger" />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default History; 