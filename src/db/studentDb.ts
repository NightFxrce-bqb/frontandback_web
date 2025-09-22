import sqlite3 from 'sqlite3';

import type StudentInterface from '@/types/StudentInterface';

sqlite3.verbose();

export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const students = await new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        'CREATE TABLE IF NOT EXISTS student (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, middle_name TEXT, groupId INTEGER)'
      );

      const sql = 'SELECT * FROM student';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          db.close();
          return;
        }
        resolve(rows);
        db.close();
      });
    });
  });

  return students as StudentInterface[];
};


