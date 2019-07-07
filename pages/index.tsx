import React from 'react';

import Link from 'next/link';

function Home() {
  return <div>
    <p>Welcome to Next.js!</p>
    <Link href="/about"><a>Home</a></Link>
  </div>
}

export default Home