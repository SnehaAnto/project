import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonPage, IonContent } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { addCircle, list, person } from 'ionicons/icons';
import NewEntry from './NewEntry';
import History from './History';
import Profile from './Profile';
import './Tabs.css';

const Tabs: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="tabs-page">
        <div className="content-container">
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tabs/new-entry">
                <NewEntry />
              </Route>
              <Route exact path="/tabs/history">
                <History />
              </Route>
              <Route exact path="/tabs/profile">
                <Profile />
              </Route>
              <Route exact path="/tabs">
                <Redirect to="/tabs/new-entry" />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="new-entry" href="/tabs/new-entry">
                <IonIcon icon={addCircle} />
                <IonLabel>New Entry</IonLabel>
              </IonTabButton>
              
              <IonTabButton tab="history" href="/tabs/history">
                <IonIcon icon={list} />
                <IonLabel>History</IonLabel>
              </IonTabButton>
              
              <IonTabButton tab="profile" href="/tabs/profile">
                <IonIcon icon={person} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tabs; 