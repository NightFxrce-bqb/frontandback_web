import { dehydrate } from '@tanstack/react-query';

import TanStackQuery from '@/containers/TanStackQuery';
import queryClient from '@/api/reactQueryClient';
import { getGroupsDb } from '@/db/groupDb';
import { getStudentsApi } from '@/api/studentsApi';
import type GroupInterface from '@/types/GroupInterface';
import type StudentInterface from '@/types/StudentInterface';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Main from '@/components/layout/Main/Main';

import type { Metadata } from 'next';

import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Вэб разработка ВКИ - Next.js шаблон',
  description: 'Шаблон для веб-разработки с использованием Next.js, React Hook Form, Yup, SCSS, Eslint, TanStack Query (React Query)',
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>): Promise<React.ReactElement> => {
  let groups: GroupInterface[];
  let students: StudentInterface[];

  // выполняется на сервере - загрузка групп (напрямую из БД, без HTTP)
  await queryClient.prefetchQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      groups = await getGroupsDb();
      return groups;
    },
  });

  // выполняется на сервере - загрузка студентов (через HTTP-клиент)
  await queryClient.prefetchQuery({
    queryKey: ['students'],
    queryFn: async () => {
      students = await getStudentsApi();
      return students;
    },
  });

  const state = dehydrate(queryClient, { shouldDehydrateQuery: () => true });

  return (
    <TanStackQuery state={state}>
      <html lang="ru">
        <body>
          <Header />
          <Main>
            <>{children}</>
          </Main>
          <Footer />
        </body>
      </html>
    </TanStackQuery>
  );
};

export default RootLayout;
