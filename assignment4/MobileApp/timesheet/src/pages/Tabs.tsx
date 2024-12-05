import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { addCircle, list, person } from 'ionicons/icons';
import NewEntry from './NewEntry';
import History from './History';
import Profile from './Profile';

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/new-entry" component={NewEntry} />
        <Route exact path="/tabs/history" component={History} />
        <Route exact path="/tabs/profile" component={Profile} />
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
  );
};

export default Tabs; 