import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

// This modeule is how I embeded the html code without it becoming real html
import Code from 'react-embed-code';

// Dis be da Clipboard
import Clipboard from 'clipboard';

// Creates a new Clipboard
var clipboard = new Clipboard('.btn'); //eslint-disable-line

// The react bootstrap module imports bootstrap into the project
// If there are any extra bootstrap components that you want to use,
// you will need to add them below
import {
  ControlLabel,
  FormGroup,
  FormControl,
  Button,
  ButtonToolbar,
} from 'react-bootstrap';

// OK so here is where you set the password.  Using process.env.whateveryouwant
// you should be able to set it from heroku, but as the github is private,
// and you may want to change up the production env, this should work.
var correctPassword = 'engenius';

// Importing the wordpress api and connecting it to engenius
var WPAPI = require('wpapi');
var wp = new WPAPI({ endpoint: 'https://engeniusweb.com/wp-json' });

// This makes the switch to https.
// if (window.location.protocol !== 'https:') {
// window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
// }

// So it's a bad coding practice to have these global variables
// but they didn't work as states on the object, so the most recent
// blog link and title will be stored here.
var blogURL;
var blogTitle;

class App extends React.Component {
  constructor(props) {
    super(props);
    // This is just setting the default state to Anna "because she is first"
    this.state = {
      value: '',
      code: '',
      copy: 'Copy',
      password: '',
    };

    // All of the functions have to be bound in the constructor
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.copyClick = this.copyClick.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.getValidationState = this.getValidationState.bind(this);

    // Build a query for Posts resources
    // Only returns one post (the most recent)
    var postsQuery = wp.posts().perPage(1);

    postsQuery.get(function (err, data) {
      // Handling an error; Shouldn't matter
      if (err) {
        console.log(data);
      }

      // This will log all of the JSON data that comes from the query
      // If there is more that you want from the JSON, uncomment the line
      // Below and follow the format that I used for the link and title

      // This is the link scraped from the JSON
      blogURL = data[0].link;

      // This is the title scraped from the JSON
      blogTitle = data[0].title.rendered;

      console.log(this.state.blogTitle);
    });
  }

  // This is what happens when you change the name (before you hit submit)
  // It just saves the person's name when you change the name
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  copyClick() {
    // Changes the text of the copy button when you hit Copy
    this.setState({ copy: 'Copied!' });
  }
  handlePasswordChange(event) {
    // Sets the password on every change
    this.setState({ password: event.target.value });
  }
  getValidationState() {
    // This handles the validation.  It is compared to the password in line
    // 20.
    const length = this.state.password.length;
    const password = this.state.password;
    if (password === correctPassword) {
      return 'success';
    } else if (length > 0) return 'error';
  }

  // This is everything that happens when you hit submit (almost everything)
  handleSubmit(event) {
    // Only continues if the password is correct.
    if (this.getValidationState() === 'success') {
      this.setState({ copy: 'Copy' });

      // "Code" in this context is the html signature. This var will hold the html
      // as it is getting replaced with people's deets
      var replacedCode;

      // get the dataset, split it at %% to create an object
      var data = this.state.value.split('%%');
      console.log(data);

      // get the id
      var id = data[0];
      console.log(id);

      // get the name
      var name = data[1];
      console.log(name);

      // get the title
      var title = data[2];
      console.log(title);

      // So I know that this method sucks, but it searches for different things in
      // the HTML code and replaces them with the appropriate variables.  Right
      // now it's just hardcoded in, but if I have a lot of extra time to work
      // on this project I'll tackle this.  If you make changes to the signature,
      // this will have to change as well.
      replacedCode = this.code.replace(/%id%/g, id);
      replacedCode = replacedCode.replace(/%name%/g, name);
      replacedCode = replacedCode.replace(/%title%/g, title);
      replacedCode = replacedCode.replace(
        /%blogURL%/g,
        blogURL.substring(0, blogURL.length - 1)
      );
      replacedCode = replacedCode.replace(/%blogTitle%/g, blogTitle);

      // Uses the newly replaced code in the state
      this.setState({ code: <Code embed={replacedCode} /> });
      this.setState({ codeText: replacedCode });

      event.preventDefault();
    } else {
      event.preventDefault();
    }
  }

  render() {
    // START OF CSS SECTION //

    // This is how you style in React.  I don't like it but meh.
    var pixStyle = {
      width: 200,
      margin: 'auto',
    };
    var lButtonStyle = {
      width: 80,
    };
    var rButtonStyle = {
      width: 80,
      float: 'right',
    };
    var btnToolbar = {
      width: 200,
      margin: 'auto',
    };
    var table = {
      width: 200,
    };
    var someMargin = {
      margin: 80,
    };
    var dangerous = {
      margin: 'auto',
      width: 500,
    };
    // END OF CSS SECTION //

    // Below is the HTML Section which I don't feel like commenting.  The important thing to
    // note is that the option vdalue is where people's information is saved.
    // To add someone, just add them to this list and it should work
    // To edit the structure, make sure you edit it here and in the getSubmit
    // Method.
    return (
      <div style={someMargin}>
        <link
          rel='stylesheet'
          href='https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css'
        ></link>
        <script src='/node_modules/clipboard/dist/clipboard.min.js'></script>
        <form onSubmit={this.handleSubmit} style={pixStyle}>
          <FormGroup controlId='formControlsSelect'>
            <ControlLabel>Select</ControlLabel>
            <FormControl
              componentClass='select'
              placeholder='select'
              value={this.state.value}
              onChange={this.handleChange}
            >
              <option value=''>-- Select --</option>
              <option value='anna%%Anna Beam%%Executive Assistant to the CEO / Director of Finance &amp; Administration'>
                Anna Beam
              </option>
              <option value='brent%%Brent Alexander%%Web Developer'>
                Brent Alexander
              </option>
              <option value='cassidy%%Cassidy Krasinski%%Support Manager'>
                Cassidy Krasinski
              </option>
              <option value='chris%%Chris Manley%%Co-founder &amp; CEO'>
                Chris Manley
              </option>
              <option value='ellison%%Ellison Manley%%Web Designer'>
                Ellison Manley
              </option>
              <option value='kory%%Kory Radford%%Accounts Manager'>
                Kory Radford
              </option>
              <option value='molly%%Molly Willette-Green%%Project Manager, Director of Production'>
                Molly Willette-Green
              </option>
              <option value='samantha%%Samantha Wagner%%Sales & Marketing Coordinator'>
                Samantha Wagner
              </option>
              <option value='taylor%%Taylor Craig%%Content & SEO Strategist'>
                Taylor Craig
              </option>
              <option value='tj%%TJ Deluccia%%Chief Operating Officer'>
                TJ Deluccia
              </option>
            </FormControl>
          </FormGroup>
          <FormGroup
            controlId='formBasicText'
            validationState={this.getValidationState()}
          >
            <ControlLabel>Password</ControlLabel>

            <FormControl
              type='password'
              value={this.state.password}
              placeholder='Password'
              onChange={this.handlePasswordChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <ButtonToolbar style={btnToolbar}>
            <table style={table}>
              <thead>
                <tr>
                  <th>
                    <Button
                      bsStyle='primary'
                      type='submit'
                      style={lButtonStyle}
                    >
                      Submit
                    </Button>
                  </th>
                  <th>
                    <Button
                      style={rButtonStyle}
                      onClick={this.copyClick}
                      className='btn'
                      data-clipboard-action='copy'
                      data-clipboard-target='#div-target'
                    >
                      {this.state.copy}
                    </Button>
                  </th>
                </tr>
              </thead>
            </table>
          </ButtonToolbar>
        </form>
        <br />
        <div style={dangerous}>
          <br />
          <div id='div-target'>
            <div dangerouslySetInnerHTML={{ __html: this.state.codeText }} />
          </div>
          <br />
        </div>
        <br />
        {this.state.code}
      </div>
    );
  }
  // And here is the huge mess that is the actual code.  Note that the variables are saved as ~First Name~
  // So that they are unique and easily findable when we are searching for them to change them
  code = `<html>
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
	<a target="_blank" href="https://engeniusweb.com/?utm_source=direct%20employee%20email&utm_medium=email%20signature&utm_campaign=%id%" id="eng-sig-mugshot">
		<img height="96" width="96" style="border-radius: 50%; width: 96px; height: auto; max-width: 100%;" src="https://engeniusweb.com/signatures/headshots/%id%-headshot.jpg" alt="%name%" title="%name%" vspace="0" hspace="0">
    </a>
</td>

<td style="padding: 8px 0 0 8px; vertical-align: top;" id="eng-sig-table-right">

	<a href="https://engeniusweb.com/?utm_source=direct%20employee%20email&utm_medium=email%20signature&utm_campaign=%id%" id="eng-sig-brand" style="margin: 0; font-size: 20px; line-height: 1.1em; letter-spacing: 2px; display: block; font-weight: 700; font-family: 'Proxima Nova', Arial, Helvetica, sans-serif; font-weight: 900; color: #db3333; text-decoration: none;">ENGENIUS</a>

    <div id="eng-sig-employee">
		<span id="eng-sig-employee-name" style="margin: 0; font-size: 16px; line-height: 1.2em; font-family: 'Proxima Nova Black', Arial, Helvetica, sans-serif; font-weight: 600; color: #666;">%name%</span>
		<span id="eng-sig-employee-title" style="margin: 0; line-height: 1.2em; font-family: 'Proxima Nova', Arial, Helvetica, sans-serif; font-size: 11px; color: #999;">%title%</span>
	</div>

	<p id="eng-sig-employee-contacts" style="margin: 0; padding-top: 3px; font-size: 11px; line-height: 1.35em; font-family: 'Proxima Nova', Arial, Helvetica, sans-serif; color: #999;">864.977.1767 | %id%@engeniusweb.com</p>

	<p id="eng-sig-location" style="margin: 0; font-size: 11px; line-height: 1.35em; font-family: 'Proxima Nova', Arial, Helvetica, sans-serif; color: #999;">1012 EAST WASHINGTON STREET<br>GREENVILLE, SC 29601</p>


	<div id="eng-sig-socials" style="margin: 4px 0 0 0; font-size: 0;">
	<a style="text-decoration: none;" href="https://www.linkedin.com/company/1329724">
    	<img style="display: inline-block; position: relative; cursor: pointer; height: 20px; width: 20px; padding: 0px; border-radius: 50%; margin: 2px 4px 0 0;" src="https://engeniusweb.com/signatures/linkedin.png" width="20" height="20" alt="LinkedIn" title="LinkedIn" vspace="0" hspace="0">
    </a>
	<a style="text-decoration: none;" href="http://facebook.com/engeniusweb">
    	<img style="display: inline-block; position: relative; cursor: pointer; height: 20px; width: 20px; padding: 0px; border-radius: 50%; margin: 2px 4px 0 0;" src="https://engeniusweb.com/signatures/facebook.png" width="20" height="20" alt="Facebook" title="Facebook" vspace="0" hspace="0">
	</a>
	<a style="text-decoration: none;" href="http://twitter.com/engeniusweb">
    	<img style="display: inline-block; position: relative; cursor: pointer; height: 20px; width: 20px; padding: 0px; border-radius: 50%; margin: 2px 4px 0 0;" src="https://engeniusweb.com/signatures/twitter.png" width="20" height="20" alt="Twitter" title="Twitter" vspace="0" hspace="0">
	</a>
	<a style="text-decoration: none;" href="http://instagram.com/engeniusweb">
    	<img style="display: inline-block; position: relative; cursor: pointer; height: 20px; width: 20px; padding: 0px; border-radius: 50%; margin: 2px 4px 0 0;" src="https://engeniusweb.com/signatures/instagram.png" width="20" height="20" alt="Instagram" title="Instagram" vspace="0" hspace="0">
	</a>
	</div>

	<div id="eng-sig-blog-link" style="margin: 12px 0 0 0; font-size: 13px; line-height: 1.35em; font-family: 'Proxima Nova', Arial, Helvetica, sans-serif; color: #999;">
		<strong>From The Blog:</strong> <a style="color: #db3333; text-decoration: underline;" target="_blank" href="%blogURL%/?utm_source=direct%20employee%20email&utm_medium=email%20signature&utm_campaign=%id%">%blogTitle%</a>
	</div>

</td>

</tr>
</table>
</body>
</html>
`;
}

export default App;
