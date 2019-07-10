import React from 'react';

import Link from 'next/link';

function About() {
  return <div>
    <h1>This is the about page</h1>
    <Link href="/"><a>Go to home page</a></Link>
  </div>
}

export default About