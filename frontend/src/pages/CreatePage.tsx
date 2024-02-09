
import { NormalLayout } from '@/layouts/NormalLayout'
import { useState } from 'react'

export default function Main() {
    // This handles auto input
    //
    // let navigate = useNavigate()

    // const [post,setPost] = useState({
    //     title:"",
    //     content:"",
    // })

    // const {title,content} = post

    // const onInputChange = (e) => {

    // }
    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     await axios.post("")
    //     navigate("/")
    // }

  return (
    <NormalLayout>
      <div className="flex flex-col gap-5 w-full">
        This is Create Page
        {/* Content */}
      </div>
    </NormalLayout>
  )
}
