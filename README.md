# Jacked-GPT

AI-driven application to create personalized workout routines tailored to your goals, helping you achieve peak performance. Say goodbye to generic workouts and hello to innovation!

Checkout the [live demo](https://jackedgpt-8eaf6b49c971.herokuapp.com/).

![screenshot](jacked-gpt.png)

This project provides a simple (HTML and vanilla Javascript) web UI to gather user input and a (NodeJS) server to generate a custom prompt and send it to GPT.

It aims at providing personalized workout routines, but could easily be forked to other purposes.

## Installation

[**Download**](https://github.com/evoluteur/jacked-gpt/archive/main.zip) or **clone** from [GitHub](https://github.com/evoluteur/jacked-gpt/).

```bash
# To get the latest stable version, use git from the command line.
git clone https://github.com/evoluteur/jacked-gpt
```

or use the [npm package](https://www.npmjs.com/package/jacked-gpt):

```bash
# To get the latest stable version, use npm from the command line.
npm install jacked-gpt
```

In the jacked-gpt directory, use the command line to type the following:

```bash
# Install dependencies
npm install

# Run the node.js server
npm start

```

You will need to set your OpenAI API key to the `OPENAI_API_KEY` variable in NodeJS. You could also set it in the config.js file.

In a web browser, go to the url [http://localhost:2000/](http://localhost:2000/) to play with the UI.

## Configuration

Configurations options are specified in the [config.js](https://github.com/evoluteur/jacked-gpt/blob/main/config.js) file.


| Option     | Description      | Example             |
|------------|------------------|---------------------|
| apiPath    | Path to Jacked-GPT API. | "/api/v1/"   |
| apiPort    | Port used for Jacked-GPT API. | 2000   |
| model      | Port used for Jacked-GPT API. | "gpt-5.2" |
| apiKey     | OpenAI API key. | (your key)   |

## License

Jacked-GPT is released under the [MIT license](http://github.com/evoluteur/jacked-gpt/blob/main/LICENSE).

Copyright (c) 2026 [Olivier Giulieri](https://evoluteur.github.io/) and [Phil Rosace](https://www.linkedin.com/in/philiprosace/).
