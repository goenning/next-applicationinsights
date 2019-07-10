import React from 'react';

import Link from 'next/link';

function Home() {
  return <div>
    <h1>Welcome to Next.js!</h1>
    <ol>
      <li><Link href="/post/[pid]" as={`/post/csharp`}><a>Visit cshasp post</a></Link></li>
      <li><Link href="/post/[pid]" as={`/post/java`}><a>Visit java post</a></Link></li>
      <li><Link href="/post/[pid]" as={`/post/javascript`}><a>Visit javascript post</a></Link></li>
    </ol>
    <Link href="/about"><a>Go to about page</a></Link>
  </div>
}

export default Home