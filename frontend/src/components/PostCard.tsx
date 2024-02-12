import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "./ui/button"

export function PostCard({ id,title, content }: { id:number,title: string; content: string }){
    return(
        <Card>
            <CardHeader>
                <CardTitle> {title} </CardTitle>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
            <CardFooter>
                <Button variant="destructive">Cancel</Button>
                <Button variant="default">Submit</Button>
            </CardFooter>
        </Card>
    )
}