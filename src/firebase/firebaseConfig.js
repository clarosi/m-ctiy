import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyD0s0ITAfeHwD4Wsx264W77lYQkaYB4hgY',
  authDomain: 'm-city-551a8.firebaseapp.com',
  databaseURL: 'https://m-city-551a8.firebaseio.com',
  projectId: 'm-city-551a8',
  storageBucket: 'm-city-551a8.appspot.com',
  messagingSenderId: '660127579367'
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const matchesCollection = firebaseDB.ref('matches');
const playersCollection = firebaseDB.ref('players');
const positionsCollection = firebaseDB.ref('positions');
const promotionsCollection = firebaseDB.ref('promotions');
const teamsCollection = firebaseDB.ref('teams');

export {
    firebase,
    firebaseDB,
    matchesCollection,
    playersCollection,
    positionsCollection,
    promotionsCollection,
    teamsCollection
}

