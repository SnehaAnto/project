import React, { useState, useEffect } from 'react';
import {
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle,
  IonList, IonItem, IonLabel, IonButton, IonIcon,
  IonRefresher, IonRefresherContent
} from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import './History.css';

interface TimesheetEntry {
  _id: string;
  date: string;
  project: string;
  hours: number;
  description: string;
}

const History: React.FC = () => {
  const [entries, setEntries] = useState<TimesheetEntry[]>([]);

  const loadEntries = async () => {
    try {
      const response = await fetch('http://localhost:3001/timesheet', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      }
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/timesheet/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (response.ok) {
        setEntries(entries.filter(entry => entry._id !== id));
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleRefresh = async (event: CustomEvent) => {
    await loadEntries();
    event.detail.complete();
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

        <IonList>
          {entries.map(entry => (
            <IonItem key={entry._id}>
              <IonLabel>
                <h2>{new Date(entry.date).toLocaleDateString()}</h2>
                <h3>{entry.project}</h3>
                <p>{entry.hours} hours</p>
                <p>{entry.description}</p>
              </IonLabel>
              <IonButton fill="clear" slot="end" onClick={() => handleDelete(entry._id)}>
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