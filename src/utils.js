import { useState } from 'react';

/**
 * A React hook to persist state to local storage.
 * @param initialValue The initial state value
 * @param key The local storage key
 * @returns the same tuple as useState: the state, and a dispatcher
 */
export function useLocalStorage(initialValue, key) {
  const stored = localStorage.getItem(key);
  const [state, setState] = useState(
      stored ? JSON.parse(stored) : initialValue
  );

  const updateState = (update) => {
    setState(update);
    localStorage.setItem(key, JSON.stringify(update));
  };

  return [state, updateState];
}

/**
 * Generates an Engenius signature based on the user and most recent blog post.
 * @param user The user to generate for
 * @param blogPost The most recent blog post
 * @returns {string} The HTML for the email signature
 */
export function generateSignature(user, blogPost) {
  const { name, username, title } = user;
  const blogUrl = blogPost.link;
  const blogTitle = blogPost.title.rendered;
  
  return `\
<html>
<head>
	<style>
		#eng-sig-table-left { padding: 4px 8px 0 0; }
		#eng-sig-table-right { padding: 8px 0 0 8px; }
		#eng-sig-mugshot img { border-radius: 50%; width: 96px; height: auto; max-width: 100%; }
		#eng-sig-brand { margin: 0; font-size: 20px; line-height: 1.1em; letter-spacing: 2px; display: block; font-weight: 700; font-family: 'Proxima Nova', Arial, Helvetica, sans-serif; font-weight: 900; color: #db3333; text-decoration: none; }
		#eng-sig-employee-name { margin: 0; font-size: 16px; line-height: 1.2em; font-family: 'Proxima Nova Black', Arial, Helvetica, sans-serif; font-weight: 600; color: #666; }
		#eng-sig-employee-title { margin: 0; line-height: 1.2em; font-family: 'Proxima Nova', Arial, Helvetica, sans-serif; font-size: 11px; color: #999; }
		#eng-sig-employee-contacts { margin: 0; padding-top: 3px; font-size: 11px; line-height: 1.35em; font-family: 'Proxima Nova', Arial, Helvetica, sans-serif; color: #999; }
		#eng-sig-socials { margin: 4px 0 0 0; font-size: 0; }
		#eng-sig-socials a { text-decoration: none; }
		#eng-sig-socials img { display: inline-block; position: relative; cursor: pointer; height: 20px; width: 20px; padding: 0px; border-radius: 50%; margin: 2px 0 0 0; }
	</style>
</head>
<body>

<table>
<tr>
<td style="padding: 8px 8px 0 0; vertical-align: top;" id="eng-sig-table-left">
	<a target="_blank" href="https://engeniusweb.com/?utm_source=direct%20employee%20email&utm_medium=email%20signature&utm_campaign=${username}" id="eng-sig-mugshot">
		<img height="96" width="96" style="border-radius: 50%; width: 96px; height: auto; max-width: 100%;" src="https://engeniusweb.com/signatures/headshots/${username}-headshot.jpg" alt="${name}" title="${name}" vspace="0" hspace="0">
    </a>
</td>

<td style="padding: 8px 0 0 8px; vertical-align: top;" id="eng-sig-table-right">

	<a href="https://engeniusweb.com/?utm_source=direct%20employee%20email&utm_medium=email%20signature&utm_campaign=${username}" id="eng-sig-brand" style="margin: 0; font-size: 20px; line-height: 1.1em; letter-spacing: 2px; display: block; font-weight: 700; font-family: 'Proxima Nova', Arial, Helvetica, sans-serif; font-weight: 900; color: #db3333; text-decoration: none;">ENGENIUS</a>

    <div id="eng-sig-employee">
		<span id="eng-sig-employee-name" style="margin: 0; font-size: 16px; line-height: 1.2em; font-family: 'Proxima Nova Black', Arial, Helvetica, sans-serif; font-weight: 600; color: #666;">${name}</span>
		<span id="eng-sig-employee-title" style="margin: 0; line-height: 1.2em; font-family: 'Proxima Nova', Arial, Helvetica, sans-serif; font-size: 11px; color: #999;">${title}</span>
	</div>

	<p id="eng-sig-employee-contacts" style="margin: 0; padding-top: 3px; font-size: 11px; line-height: 1.35em; font-family: 'Proxima Nova', Arial, Helvetica, sans-serif; color: #999;">864.977.1767 | ${username}@engeniusweb.com</p>

	<p id="eng-sig-location" style="margin: 0; font-size: 11px; line-height: 1.35em; font-family: 'Proxima Nova', Arial, Helvetica, sans-serif; color: #999;">1012 EAST WASHINGTON STREET<br>GREENVILLE, SC 29601</p>


	<div id="eng-sig-socials" style="margin: 4px 0 0 0; font-size: 0;">
	<a style="text-decoration: none;" href="https://www.linkedin.com/company/1329724">
    	<img style="display: inline-block; position: relative; cursor: pointer; height: 20px; width: 20px; padding: 0px; border-radius: 50%; margin: 2px 4px 0 0;" src="https://engeniusweb.com/signatures/linkedin.png" width="20" height="20" alt="LinkedIn" title="LinkedIn" vspace="0" hspace="0">
    </a>
	<a style="text-decoration: none;" href="http://facebook.com/engeniusweb">
    	<img style="display: inline-block; position: relative; cursor: pointer; height: 20px; width: 20px; padding: 0px; border-radius: 50%; margin: 2px 4px 0 0;" src="https://engeniusweb.com/signatures/facebook.png" width="20" height="20" alt="Facebook" title="Facebook" vspace="0" hspace="0">
	</a>
	<a style="text-decoration: none;" href="http://instagram.com/engeniusweb">
    	<img style="display: inline-block; position: relative; cursor: pointer; height: 20px; width: 20px; padding: 0px; border-radius: 50%; margin: 2px 4px 0 0;" src="https://engeniusweb.com/signatures/instagram.png" width="20" height="20" alt="Instagram" title="Instagram" vspace="0" hspace="0">
	</a>
	</div>

	<div id="eng-sig-blog-link" style="margin: 12px 0 0 0; font-size: 13px; line-height: 1.35em; font-family: 'Proxima Nova', Arial, Helvetica, sans-serif; color: #999;">
		<strong>From The Blog:</strong> <a style="color: #db3333; text-decoration: underline;" target="_blank" href="${blogUrl}/?utm_source=direct%20employee%20email&utm_medium=email%20signature&utm_campaign=${username}">${blogTitle}</a>
	</div>

</td>

</tr>
</table>
</body>
</html>`;
}
