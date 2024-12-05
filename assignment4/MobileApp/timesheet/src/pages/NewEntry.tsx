import React, { useState } from 'react';
import {
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonInput, IonTextarea, IonButton,
  IonDatetime, IonSelect, IonSelectOption
} from '@ionic/react';
import './NewEntry.css';

const NewEntry: React.FC = () => {
  const [date, setDate] = useState('');
  const [project, setProject] = useState('');
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
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
          description
        })
      });

      if (response.ok) {
        // Clear form
        setDate('');
        setProject('');
        setHours('');
        setDescription('');
      }
    } catch (error) {
      console.error('Error saving timesheet:', error);
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
              onIonChange={e => setDescription(e.detail.value!)}
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