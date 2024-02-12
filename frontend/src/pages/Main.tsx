import { NormalLayout } from '@/layouts/NormalLayout'
import { PostForm } from '@/components/PostForm';
import { PostList } from '@/components/PostList';

export default function Main() {
  
  return (
    <NormalLayout>
      <PostForm/>
      <br/>
      <hr className='h-[2.5px] my-[8px] bg-gray-500 border-100 dark:bg-gray-700'></hr>
      <PostList/>
    </NormalLayout>
  )
}

