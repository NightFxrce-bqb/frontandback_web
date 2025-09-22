'use client';

import type StudentInterface from '@/types/StudentInterface';

interface Props {
  student: StudentInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: Props): React.ReactElement => (
  <div>
    <div>
      {student.last_name} {student.first_name}{student.middle_name ? ` ${student.middle_name}` : ''}
    </div>
    <button type="button" onClick={() => onDelete(student.id)}>Удалить</button>
  </div>
);

export default Student;


