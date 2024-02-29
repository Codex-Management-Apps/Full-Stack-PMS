import { NormalLayout } from '@/layouts/NormalLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'
import { Car } from 'lucide-react'
  

export default function ViewEmployee(){
    // const { id } = useParams<{ id: string }>();
  // const [data, setData] = useState({
  //   id: "",
  //   Name: "",
  //   LastName: "",
  //   LatestUpdate: "" 
  // });
  // useEffect(() => {
  //   const fetchData = async ()=>{
  //     try {
  //       const postData = await getPostById(id);
  //       setData(postData);
  //     } catch (error) {
  //       console.error("Error fetching post data: ", error);
  //     }
  //   }
  //   fetchData()
  // },[id])
    return(
        <NormalLayout>
            <div className='w-full flex flex-col g-4'>
            <div className='font-bold w-full flex justify-between'>
                <h3 className='text-3xl'>View User</h3>
                <Button className='px-10 bg-white-500 text-black border border-gray-300 hover:bg-gray-300'>Edit</Button>
            </div>
            <Card className='w-full'>
                <div className='font-sans'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Category</TableHead>
                            <TableHead className="w-[150px]">Value</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead className="w-[150px]">John</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Firstname</TableHead>
                            <TableHead className="w-[150px]">John</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Middlename</TableHead>
                            <TableHead className="w-[168px]">Dean</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Lastname</TableHead>
                            <TableHead className="w-[150px]">Doe</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Address Line</TableHead>
                            <TableHead className="w-[150px]">*********</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Brgy</TableHead>
                            <TableHead className="w-[150px]">*********</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Province</TableHead>
                            <TableHead className="w-[150px]">*********</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Country</TableHead>
                            <TableHead className="w-[150px]">*********</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                </div>
            </Card>

            <div className='font-bold w-full flex justify-between'>
                <h3 className='text-3xl'>Assign Designation</h3>
                <Button className='px-10 bg-white-500 text-black border border-gray-300 hover:bg-gray-300'>Edit</Button>
            </div>

            <Card className='w-full'>
                <div className='font-sans'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Category</TableHead>
                            <TableHead className="w-[150px]">Value</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Designation</TableHead>
                            <TableHead className="w-[164px]">????</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Employee Type</TableHead>
                            <TableHead className="w-[150px]">Regular</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead className="w-[150px]">Active</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                </div>
            </Card>
            </div>
        </NormalLayout>
    )
}