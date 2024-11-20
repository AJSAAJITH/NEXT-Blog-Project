import Post from '@/components/Post';
import { title } from 'process';

export async function generateMetadata({params}) {
    const id = params.id;
    const post = await fetch(process.env.NEXT_PUBLIC_API_URI + '/post/' + id)
    .then((res) => res.json())

    return{
        title:post.title 
    }
}

export default function Page({ params }) {
  return <Post params={params} />
}