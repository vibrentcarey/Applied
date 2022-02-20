import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <article className="hero h-full mt-20 sm:mt-28 md:mt-36">
      <div className="text-center hero-content prose">
        <div className="max-w-lg">
          <h1 className="font-bold text-primary">Why Applied?</h1>
          <p className="">
            Applying to jobs is stressful enough without having to keep track of all your applications.  Applied takes care of tracking all of your job applications across platforms in one convenient place, so you can focus on getting hired 💰.
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
