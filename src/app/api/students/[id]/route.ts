import { NextRequest } from 'next/server';
import { deleteStudentDb } from '@/db/studentDb';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return new Response(JSON.stringify({ message: 'Invalid id' }), { status: 400 });
  }

  await deleteStudentDb(id);

  return new Response(null, { status: 204 });
}


