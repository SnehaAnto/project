import React, { useState } from 'react';
import {
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonInput, IonTextarea, IonButton,
  IonDatetime, IonSelect, IonSelectOption, useIonToast
} from '@ionic/react';
import './NewEntry.css';

const NewEntry: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString());
  const [project, setProject] = useState('');
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [present] = useIonToast();

  const handleSubmit = async () => {
    const descriptionInput = document.querySelector('ion-textarea')?.value || '';
    try {
      const response = await fetch('http://localhost:3001/timesheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          date,
          project,
          hours: Number(hours),
          description: descriptionInput
        })
      });

      if (response.ok) {
        // Clear form
        setDate(new Date().toISOString());
        setProject('');
        setHours('');
        setDescription('');
        present({
          message: 'Entry successfully added!',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
      } else {
        const errorData = await response.json();
        present({
          message: errorData.message || 'Failed to save entry',
          duration: 2000,
          position: 'bottom',
          color: 'danger'
        });
      }
    } catch (error) {
      console.error('Error saving timesheet:', error);
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
          <IonTitle>New Timesheet Entry</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonDatetime
              value={date}
              onIonChange={e => setDate(typeof e.detail.value === 'string' ? e.detail.value : '')}
              presentation="date"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Project</IonLabel>
            <IonSelect value={project} onIonChange={e => setProject(e.detail.value)}>
              <IonSelectOption value="Project A">Project A</IonSelectOption>
              <IonSelectOption value="Project B">Project B</IonSelectOption>
              <IonSelectOption value="Project C">Project C</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Hours</IonLabel>
            <IonInput
              type="number"
              value={hours}
              onIonChange={e => setHours(e.detail.value!)}
              min="0"
              max="24"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea
              value={description}
              onIonChange={e => setDescription(e.detail.value || '')}
              rows={4}
            />
          </IonItem>

          <IonButton expand="block" type="submit" className="ion-margin-top">
            Save Entry
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default NewEntry; 