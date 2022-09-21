import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, { // This uses the db "jate" and says use v1 of it
    upgrade(db) { // Sets the database schema if it isnt already defined.
      // Checks if db has loaded into memory
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true }); // this stores the data of "jate" using the "id"
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, val: content });
  const result = await request;
  console.log('data saved to the database', result.val);
};
// TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error('getDb not implemented');
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  // if (result) {
  //   console.log('data received from the database', result.val);
  // } else {
  //   console.error('getDb not implemented');
  // }

  result ? console.log('data received from the database', result.val) :
    console.error('getDb not implemented');

  return result.val;
};
initdb();
