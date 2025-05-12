import { ETaskStatus } from '~/types';

export const taskList = [
  {
    id: 0,
    status: ETaskStatus.DONE,
    name: 'long name long name long name long name long name long name long name long name long name long name long name long name long name long name long name long name',
    created_at: new Date('August 19, 2015 13:15:30').toLocaleDateString('ru-RU'),
  },
  {
    id: 1,
    status: ETaskStatus.DONE,
    name: 'name',
    created_at: new Date('September 18, 2021 23:15:00').toLocaleDateString('ru-RU'),
  },
  {
    id: 2,
    status: ETaskStatus.ACTIVE,
    name: 'имя',
    created_at: new Date('March 1, 2024 14:21:30').toLocaleDateString('ru-RU'),
  },
  {
    id: 3,
    status: ETaskStatus.ACTIVE,
    name: 'задача 8',
    created_at: new Date('March 10, 2024 16:11:35').toLocaleDateString('ru-RU'),
  },
  {
    id: 4,
    status: ETaskStatus.DONE,
    name: 'важная задача',
    created_at: new Date('March 10, 2024 16:12:35').toLocaleDateString('ru-RU'),
  },
  {
    id: 5,
    status: ETaskStatus.ACTIVE,
    name: 'неважная задача',
    created_at: new Date('March 10, 2024 17:19:05').toLocaleDateString('ru-RU'),
  },
  {
    id: 6,
    status: ETaskStatus.ACTIVE,
    name: 'покормить кота в 2 часа',
    created_at: new Date('May 1, 2024 16:11:35').toLocaleDateString('ru-RU'),
  },
];
