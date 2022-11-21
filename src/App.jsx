import { useEffect, useRef, useState } from 'react';
import users from './users.json';
import { generateSignature, useLocalStorage } from './utils';
import ReactTooltip from 'react-tooltip';

export const App = () => {
  const [blogPost, setBlogPost] = useState();
  const [user, setUser] = useLocalStorage(null, 'user');
  const [copied, setCopied] = useState(false);
  const copyTimeout = useRef(null);
  const loading = !blogPost;

  // The signature / copy signature
  const signature = (!loading && user) ? generateSignature(user, blogPost) : '';
  const copySignature = () => {
    const blobHtml = new Blob([signature], { type: 'text/html' });
    const clipboardItem = new ClipboardItem({'text/html' : blobHtml });
    navigator.clipboard.write([clipboardItem]);

    if (copyTimeout.current) {
      window.clearTimeout(copyTimeout.current);
    }
    setCopied(true);
    copyTimeout.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Get the most recent blog post on load
  useEffect(() => {
    fetch('https://engeniusweb.com/wp-json/wp/v2/posts?per_page=1')
        .then((resp) => resp.json())
        .then((data) => {
          setBlogPost(data[0]);
        });
  }, [setBlogPost]);

  // Auto-copy when we have the necessary info
  useEffect(() => {
    if (blogPost && user) {
      copySignature();
    }
  }, [blogPost, user]);

  return (
      <div className='flex justify-center items-center w-screen h-screen'>
        <div className='bg-white rounded mx-auto min-w-[384px] overflow-hidden'>
          {loading && (
              <div className='flex items-center justify-center p-12'>
                Loading...
              </div>
          )}

          {!loading && user && (
              <div>
                <div className='flex items-center p-2 border-b'>
                  <p className='text-xl'>Welcome, {user.name.split(' ')[0]}!</p>
                  <div className='grow'/>
                  <button className='text-secondary hover:text-secondary-200 transition-colors' onClick={() => setUser(null)}>
                    Switch User
                  </button>
                </div>

                <div className='p-4'>
                  <div dangerouslySetInnerHTML={{ __html: signature }} />
                </div>

                <div className='flex justify-end border-t p-2'>
                  <button className='px-2 py-1 rounded text-white bg-secondary hover:bg-secondary-200 transition-colors' onClick={copySignature}>
                    {copied ? 'Copied ✅' : 'Copy Signature'}
                  </button>
                </div>
              </div>
          )}

          {!loading && !user && (
              <div className='flex flex-col'>
                <p className='text-xl text-center border-b py-2'>
                  Email Signature Generator
                  <i className='fa-solid fa-circle-question ml-2' data-tip data-for='help' />
                  <ReactTooltip id='help' effect='solid' multiline>
                    <p className='mb-0'>Auto-copy your signature by clicking your user.</p>
                    <p>After you choose your signature, this page will remember your selection!</p>
                  </ReactTooltip>
                </p>

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
