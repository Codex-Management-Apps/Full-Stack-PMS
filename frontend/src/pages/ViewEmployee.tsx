import { NormalLayout } from '@/layouts/NormalLayout'

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
            ViewEmployee
        </NormalLayout>
    )
}