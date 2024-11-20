"use client"

import { useEffect } from "react";
import { useState } from "react";

export default function Post({ params }) {

    const id = params.id;
    const [post, setPost] = useState(null);
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URI + '/post/' + id)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setPost(res);
            })
            .catch((error) => console.log(error))
    }, [id]);

    return <>
        {post ? (
            <main className="container mx-auto px-4 py-6">
                <h2 className="text-4xl font-bold mb-4">{post.title || 'Untitled'}</h2>
                <p className="text-gray-500">Published on {post.created_at_formated || 'Unknown date'}</p>
                <img width={400} height={300} src={post.images || "https://picsum.photos/200"} alt="Post Image" className="my-4" />
                <p>{post.description || 'No description available'}</p>
            </main>
        ) : (
            <p>Loading...</p>
        )}
    </>

}