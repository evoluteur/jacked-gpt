# Jacked-GPT

AI-driven application to create personalized workout routines tailored to your goals, helping you achieve peak performance. Say goodbye to generic workouts and hello to innovation!

Checkout the [live demo](https://jackedgpt-8eaf6b49c971.herokuapp.com/).

![screenshot](jacked-gpt.png)

This project provides a simple web UI to gather user input and a NodeJS server generate a custom prompt for GPT.

It aims at providing personalized workout routines, but could easily be forked to other purposes.

## Installation

[**Download**](https://github.com/evoluteur/jacked-gpt/archive/main.zip) or **clone** from [GitHub](https://github.com/evoluteur/jacked-gpt/).

```bash
# To get the latest stable version, use git from the command line.
git clone https://github.com/evoluteur/jacked-gpt
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

Copyright (c) 2025 [Olivier Giulieri](https://evoluteur.github.io/) and [Phil Rosace](https://www.linkedin.com/in/philiprosace/).
