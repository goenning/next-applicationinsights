import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

function ShowPost() {
const router = useRouter()
const { pid } = router.query

  return <div>
    <h1>This is post #{pid}</h1>
    <Link href="/"><a>Go to home page</a></Link>
  </div>
}

export default ShowPost