import { enrollStudentInClass } from './services/firebaseService';

async function run() {
  console.log('Enrolling student...');
  await enrollStudentInClass('ejanem', 'Júnior Marcelo de Souza sales');
  console.log('Student enrolled.');
}

run();
