import React from 'react';

import Link from 'next/link';

function About() {
  return <div>
    <p>This is the about page</p>
    <Link href="/"><a>Home</a></Link>
  </div>
}

export default About