"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(false);

  const inputRef = useRef("")
  useEffect(() => {

    fetch(process.env.NEXT_PUBLIC_API_URI + '/posts')
      .then((res) => res.json())
      .then((res) => setPosts(res))
  }, [])

  const serachPost = (e) => {
    if(e.type == 'keydown' && e.key !== 'Enter'){
      return
    }
    setSearch(true);
    // setTimeout(() => {
      fetch(process.env.NEXT_PUBLIC_API_URI + '/posts?q=' + inputRef.current.value)
        .then((res) => res.json())
        .then((res) => setPosts(res))
        .finally(() => setSearch(false))
    // },1000);

  }


  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </main>
      <div className="flex justify-end px-4 py-4">
        <input ref={inputRef} type="text" disabled={search} onKeyDown={serachPost} className="px-4 py-2 border border-gray-300 rounded-md" placeholder="Search..." />
        <button onClick={serachPost} disabled={search} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">{search ? '...' : 'Search'}</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
        {posts.map((post) => (
          <Link href={'/post/' + post._id}>
            <div className="border border-gray-200 p-4 hover:opacity-90">
              <img className="w-full h-48 object-cover mb-4" src={post.images} alt="Post Image" />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.short_description}</p>
            </div>
          </Link>
        ))}
        {!posts.length > 0 && inputRef.current.value && <p>No post avilable this Search:<b> {inputRef.current.value}</b></p>}

      </div>

    </>
  );
}
