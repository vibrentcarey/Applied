import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <article className="hero min-h-screen bg-base-200">
      <div className="text-center hero-content prose">
        <div className="max-w-xs">
          <h1 className="font-bold">Welcome To Applied</h1>
          <p className="">
            Applying to jobs is stressful enough, there should be a convenient
            place to manage all of your applications. Applied allows you to keep
            track of all your job applications across platforms.
          </p>
          <Link href="/add" passHref>
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Hero;
