import { ServerClient } from './client/server-client';

const USERS: any[] = [
  {
    firstName: 'Віка',
    lastName: 'Юрченко',
    role: 'STUDENT',
  },
  {
    firstName: 'Марія',
    lastName: 'Винарська',
    role: 'STUDENT',
  },
  {
    firstName: 'Саша',
    lastName: 'Малиновська',
    role: 'STUDENT',
  },
  {
    firstName: 'Роман',
    lastName: 'Буханець',
    role: 'STUDENT',
  },
  {
    firstName: 'Микола',
    lastName: 'Денисюк',
    role: 'STUDENT',
  },
  {
    firstName: 'Антон',
    lastName: 'Мордерер',
    role: 'STUDENT',
  },
  {
    firstName: 'Тарас',
    lastName: 'Мельник',
    role: 'TEACHER',
  },
];

async function main(): Promise<void> {
  const client = new ServerClient('http://localhost:3000/api/v1');
  await client.login('admin@mail.com', 'admin');
  for (const user of USERS) {
    await client.createUser(user);
  }
  const { data } = await client.axiosInstance.get('/auth/me');
  console.log('Data: ', data);
}

main().catch((e) => {
  console.log('Error in main');
  console.log(e);
});
