'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import { deleteStudentApi } from '@/api/studentsApi';
import Student from '@/components/Students/Student/Student';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { students } = useStudents();

  const onDeleteHandler = async (id: number): Promise<void> => {
    const ok = await deleteStudentApi(id);
    if (ok) {
      window.location.reload();
    }
  };

  return (
    <div className={styles.Students}>
      {students.map((student: StudentInterface) => (
        <div key={student.id} className={styles.StudentCard}>
          <Student student={student} onDelete={onDeleteHandler} />
        </div>
      ))}
    </div>
  );
};

export default Students;




