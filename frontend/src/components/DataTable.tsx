
import {
    ColumnDef,
    Row,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
  
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { DeleteEmployeeById } from "@/controller/employee"
import { handleReload } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
  
interface DataTableProps<TData, TValue>{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
  }: DataTableProps<TData, TValue>) {
    const navigate = useNavigate();
    const table = useReactTable({
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel()
        })

    // This took me 2 hours to get the id data for getting EmployeeId
    // This function basically gets the EmployeeID in the table. not the table id but the table data id
    const viewData = (status : string, row : Row<TData & { id: string }>)=>{
        const data = row.getVisibleCells().find((cell) => cell.row.original)
        const dataId = data?.row.original.id
        if(status === "view"){
            navigate(`/employee/${dataId}`)
        }else if(status === "delete"){
            if(dataId != undefined){
                DeleteEmployeeById(dataId)
                toast({
                    variant: "default",
                    title: "Data deleted",
                })
            }
        }
    };

    return(
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key = {header.id}>
                                            {header.isPlaceholder 
                                            ? null 
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableHead>
                                    )})}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                    <TableCell className="flex gap-3">
                                        <Button variant={"outline"} onClick={() => viewData("view",row as Row<TData & { id: string }>)}>
                                            View
                                        </Button>
                                        <Button variant={"destructive"} onClick={() => viewData("delete",row as Row<TData & { id: string }>)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ): (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
   }