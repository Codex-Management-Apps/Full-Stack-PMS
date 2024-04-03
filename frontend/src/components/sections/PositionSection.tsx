
import { AssignPosition } from "@/lib/types";
import { Card } from "../ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "../ui/table";

type Props = {
    receiveData: AssignPosition;
}

export function PositionSection({receiveData}: Props){
    return(
        <Card className='w-full mb-5'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            Category
                        </TableHead>
                        <TableHead>
                            Value
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            Position ID
                        </TableCell>
                        <TableCell>
                            
                            {receiveData.position.id}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Position
                        </TableCell>
                        <TableCell>
                            {receiveData.position.positionName}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>   
        </Card>
    )
}