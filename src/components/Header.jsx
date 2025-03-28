import React from "react";

const Header = () => {
    return (
        <div className="">
            <p className="">This is Header</p>
            <div className="flex-centric gap-5">
                <button className="btn-primary">Click me</button>
                <button className="btn-secondary">Click me</button>
                <button className="btn-accent">Click me</button>
            </div>
            <p className="m-4 text-center p-3 font-bold px-2 text-lg">
                Catch me if you can
            </p>
            <blockquote className="text-center text-2xl font-semibold text-gray-900 italic dark:text-white">
                When you look&nbsp;
                <span
                    className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-pink-500">
          <span className="relative text-white dark:text-gray-950"> annoyed </span>
        </span>
                &nbsp;all the time, people think that you're busy.
            </blockquote>
        </div>
    );
};

export default Header;
