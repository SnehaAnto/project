import React, { useState, useEffect } from 'react';
import {
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonInput, IonTextarea, IonButton,
  IonDatetime, IonSelect, IonSelectOption, useIonToast
} from '@ionic/react';
import './NewEntry.css';

interface Task {
  id: string;
  title: string;
}

const NewEntry: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString());
  const [project, setProject] = useState('');
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [present] = useIonToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const response = await fetch(`http://localhost:3001/timesheet/${userData.username}/tasks`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load projects');
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error loading projects:', error);
      present({
        message: 'Failed to load projects. Please try again.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
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
          description: document.querySelector('ion-textarea')?.value as string,
          userId: userData.username
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
            <IonLabel>Date</IonLabel>
            <IonDatetime
              value={date}
              onIonChange={e => setDate(typeof e.detail.value === 'string' ? e.detail.value : '')}
              presentation="date"
              size="cover"
              preferWheel={false}
              showDefaultButtons={false}
              style={{ maxWidth: '280px' }}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Project</IonLabel>
            <IonSelect value={project} onIonChange={e => setProject(e.detail.value)}>
              {tasks.map(task => (
                <IonSelectOption key={task.id} value={task.title}>
                  {task.title}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Hours</IonLabel>
            <IonInput
              type="number"
              value={hours}
             // onIonChange={e => setHours(e.detail.value!)}
              onIonInput={e => setHours(e.detail.value!)}
              min="0"
              max="24"
              step="0.5"
              inputmode="decimal"
              clearInput={true}
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