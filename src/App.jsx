import { useEffect, useState } from 'react';
import users from './users.json';
import { generateSignature, useLocalStorage } from './utils';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [blogPost, setBlogPost] = useState();
  const [user, setUser] = useLocalStorage(null, 'user');

  useEffect(() => {
    fetch('https://engeniusweb.com/wp-json/wp/v2/posts?per_page=1')
        .then((resp) => resp.json())
        .then((data) => {
          setBlogPost(data[0]);
          setLoading(false);
        });
  }, [setLoading]);

  return (
      <div className='flex justify-center items-center w-screen h-screen'>
        <div className='bg-white rounded mx-auto min-w-96 overflow-hidden'>
          {user ? (
              <div>
                <div className='flex items-center p-2 border-b'>
                  <p className='text-xl'>Hi, {user.name.split(' ')[0]}!</p>
                  <div className='grow'/>
                  <button className='text-primary hover:text-primary-200' onClick={() => setUser(null)}>
                    Switch User
                  </button>
                </div>

                <div className='p-4'>
                  <div dangerouslySetInnerHTML={{ __html: generateSignature(user, blogPost) }} />
                </div>
              </div>
          ) : (
              <div className='flex flex-col'>
                <p className='text-xl text-center border-b py-2'>Who Are You?</p>

                {
                  users.map((user) => {
                    return (
                        <div
                            key={user.username}
                            className='flex items-center cursor-pointer gap-2 hover:bg-primary-50 transition-colors p-2'
                            onClick={() => setUser(user)}
                        >
                          <img
                              className='w-12 h-12 rounded-full'
                              src={`https://engeniusweb.com/signatures/headshots/${user.username}-headshot.jpg`}
                          />
                          <div>
                            <p>{user.name}</p>
                            <p className='text-sm'>{user.username}@engeniusweb.com</p>
                          </div>
                        </div>
                    );
                  })
                }
              </div>
          )}
        </div>
      </div>
  );
};
