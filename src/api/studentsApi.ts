import type StudentInterface from '@/types/StudentInterface';

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API ?? '/api/';
    const url = `${baseUrl}students`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentInterface[];
    return students;
  }
  catch (err) {
    console.log('>>> getStudentsApi', err);
    return [] as StudentInterface[];
  }
};

export const deleteStudentApi = async (id: number): Promise<boolean> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API ?? '/api/';
    const url = `${baseUrl}students/${id}`;
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok && response.status !== 204) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    return true;
  }
  catch (err) {
    console.log('>>> deleteStudentApi', err);
    return false;
  }
};


