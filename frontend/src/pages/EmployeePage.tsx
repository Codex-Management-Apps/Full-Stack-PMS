
import { getPostById } from '@/controller/post';
import { NormalLayout } from '@/layouts/NormalLayout'

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow,} from '@/components/ui/table';
import { Card, CardContent} from '@/components/ui/card';

export default function EmployeePage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState({
    id: "",
    Name: "",
    LastName: "",
    LatestUpdate: ""
  });
  useEffect(() => {
    const fetchData = async ()=>{
      try {
        const postData = await getPostById(id);
        setData(postData);
      } catch (error) {
        console.error("Error fetching post data: ", error);
      }
    }
    fetchData()
  },[id])

  return (
    <>
    <Button className='absolute top-20 right-80 bg-white-500 text-white-500 border border-gray-400 rounded-md px-8 py-2'>Add</Button>
    <NormalLayout>
      <h1 className='pb-[30px] pt-[40px] font-bold text-3xl font-sans-helvetica'>Employees</h1>
      <Card className='w-[1100px]'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Latest Update</TableHead>
            <TableRow>
            </TableRow>
          </TableRow>
          <TableRow>
            <TableHead>1</TableHead>
            <TableHead>Rey</TableHead>
            <TableHead>Larombe</TableHead>
            <TableHead>02/10/1904</TableHead>
            <TableRow>
              <Button className='bg-white-900 text-white-500 border border-gray-400 rounded-md px-4 py-2 mr-2'>View</Button>
              <Button className='bg-red-500 text-white-500 border border-gray-400 rounded-md px-4 py-2'>Delete</Button>
            </TableRow>
          </TableRow>
          <TableRow>
            <TableHead>1</TableHead>
            <TableHead>Rey</TableHead>
            <TableHead>Larombe</TableHead>
            <TableHead>02/10/1904</TableHead>
            <TableRow>
              <Button className='bg-white-900 text-white-500 border border-gray-400 rounded-md px-4 py-2 mr-2'>View</Button>
              <Button className='bg-red-500 text-white-500 border border-gray-400 rounded-md px-4 py-2'>Delete</Button>
            </TableRow>
          </TableRow>
          <TableRow>
            <TableHead>1</TableHead>
            <TableHead>Rey</TableHead>
            <TableHead>Larombe</TableHead>
            <TableHead>02/10/1904</TableHead>
            <TableRow>
              <Button className='bg-white-900 text-white-500 border border-gray-400 rounded-md px-4 py-2 mr-2'>View</Button>
              <Button className='bg-red-500 text-white-500 border border-gray-400 rounded-md px-4 py-2'>Delete</Button>
            </TableRow>
          </TableRow>
          <TableRow>
            <TableHead>1</TableHead>
            <TableHead>Rey</TableHead>
            <TableHead>Larombe</TableHead>
            <TableHead>02/10/1904</TableHead>
            <TableRow>
              <Button className='bg-white-900 text-white-500 border border-gray-400 rounded-md px-4 py-2 mr-2'>View</Button>
              <Button className='bg-red-500 text-white-500 border border-gray-400 rounded-md px-4 py-2'>Delete</Button>
            </TableRow>
          </TableRow>
          <TableRow>
            <TableHead>1</TableHead>
            <TableHead>Rey</TableHead>
            <TableHead>Larombe</TableHead>
            <TableHead>02/10/1904</TableHead>
            <TableRow>
              <Button className='bg-white-900 text-white-500 border border-gray-400 rounded-md px-4 py-2 mr-2'>View</Button>
              <Button className='bg-red-500 text-white-500 border border-gray-400 rounded-md px-4 py-2'>Delete</Button>
            </TableRow>
          </TableRow>
          <TableRow>
            <TableHead>1</TableHead>
            <TableHead>Rey</TableHead>
            <TableHead>Larombe</TableHead>
            <TableHead>02/10/1904</TableHead>
            <TableRow>
              <Button className='bg-white-900 text-white-500 border border-gray-400 rounded-md px-4 py-2 mr-2'>View</Button>
              <Button className='bg-red-500 text-white-500 border border-gray-400 rounded-md px-4 py-2'>Delete</Button>
            </TableRow>
          </TableRow>
          <TableRow>
            <TableHead>1</TableHead>
            <TableHead>Rey</TableHead>
            <TableHead>Larombe</TableHead>
            <TableHead>02/10/1904</TableHead>
            <TableRow>
              <Button className='bg-white-900 text-white-500 border border-gray-400 rounded-md px-4 py-2 mr-2'>View</Button>
              <Button className='bg-red-500 text-white-500 border border-gray-400 rounded-md px-4 py-2'>Delete</Button>
            </TableRow>
          </TableRow>
          <TableRow>
            <TableHead>1</TableHead>
            <TableHead>Rey</TableHead>
            <TableHead>Larombe</TableHead>
            <TableHead>02/10/1904</TableHead>
            <TableRow>
              <Button className='bg-white-900 text-white-500 border border-gray-400 rounded-md px-4 py-2 mr-2'>View</Button>
              <Button className='bg-red-500 text-white-500 border border-gray-400 rounded-md px-4 py-2'>Delete</Button>
            </TableRow>
          </TableRow>
          <TableRow>
            <TableHead>1</TableHead>
            <TableHead>Rey</TableHead>
            <TableHead>Larombe</TableHead>
            <TableHead>02/10/1904</TableHead>
            <TableRow>
              <Button className='bg-white-900 text-white-500 border border-gray-400 rounded-md px-4 py-2 mr-2'>View</Button>
              <Button className='bg-red-500 text-white-500 border border-gray-400 rounded-md px-4 py-2'>Delete</Button>
            </TableRow>
          </TableRow>
          <TableRow>
            <TableHead>1</TableHead>
            <TableHead>Rey</TableHead>
            <TableHead>Larombe</TableHead>
            <TableHead>02/10/1904</TableHead>
            <TableRow>
              <Button className='bg-white-900 text-white-500 border border-gray-400 rounded-md px-4 py-2 mr-2'>View</Button>
              <Button className='bg-red-500 text-white-500 border border-gray-400 rounded-md px-4 py-2'>Delete</Button>
            </TableRow>
          </TableRow>
        </TableHeader>
      </Table>
    </Card>
    <div className='flex justify-end items-end pr-[220px] pt-[10px]'>
      <Button className='bg-white-500 text-white-500 border border-gray-400 rounded-md px-4 py-2 mr-2'>Previous</Button>
      <Button className='bg-white-500 text-white-500 border border-gray-400 rounded-md px-4 py-2'>Next</Button>
    </div>
    </NormalLayout>
    </>
  )
}
