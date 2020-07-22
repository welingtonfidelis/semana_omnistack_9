import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './src/routes';

//ignorar alerta/warning de websocket no mobile
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    <Routes/>
  );
}
