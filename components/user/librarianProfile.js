import React from 'react';

const LibrarianProfile = ({image, name}) => {
    return (

        <div className="rounded-2xl w-full p-4 bg-white dark:bg-gray-800">
            <div className="flex flex-row items-start gap-4">
                <img src={image??"/images/people/person_1.jpg"} className="w-28 h-28 rounded-lg"/>
                <div className="h-28 w-full flex flex-col justify-between">
                    <div>
                        <p className="text-gray-800 dark:text-white text-xl font-medium">
                            {name??"John Jackson"}
                        </p>
                        <p className="text-gray-400 text-xs">
                            librarian
                        </p>
                    </div>
                    <div className="rounded-lg dark:bg-white p-2 w-full">
                        <div className="flex items-center justify-between text-sm text-gray-400 dark:text-black">
                            <p className="bg-blue-100 py-3 px-5 rounded flex flex-col">
                                Articles
                                <span className="text-black dark:text-indigo-500 font-bold">
                            34
                        </span>
                            </p>
                            <p className="bg-blue-100 py-3 px-5 rounded flex flex-col">
                                Followers
                                <span className="text-black dark:text-indigo-500 font-bold">
                            455
                        </span>
                            </p>
                            <p className="bg-blue-100 py-3 px-5 rounded flex flex-col">
                                Rating
                                <span className="text-black dark:text-indigo-500 font-bold">
                            9.3
                        </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default LibrarianProfile;
