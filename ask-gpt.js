/*!
 *  Jacked-GPT - An AI-powered fitness routine generator
 *  https://github.com/evoluteur/jacked-gpt
 *  (c) 2026 Olivier Giulieri & Phil Rosace
 */
import OpenAI from "openai";
import videoKeys from "./videos.js";
import config from "./config.js";

// Example request:
// api/v1/routine?age=37&weight=145&genre=male&build=athletic&duration=30&focus=shoulder+workout&goal=gain+muscle

const { model, apiKey } = config;

const openai = new OpenAI({
  apiKey,
});

const getVideoId = (exercise, link) => {
  const kv = videoKeys[exercise];
  if (kv) {
    return kv;
  }
  if (link) {
    const l1 = link.split("?");
    if (l1.length > 1) {
      let params = l1[1].split("&");
      if (params.length > 1) {
        params = params.filter((p) => p.startsWith("v="));
      }
      if (params.length) {
        const vLink = params[0].substring(2);
        // logText(`VIDEO "${exercise}": "${vLink}",`);
        return vLink;
      }
    }
  }
  return null;
};

const cleanVideos = (data) => {
  data.forEach((d) => {
    d.youtube_link = getVideoId(d.name, d.youtube_link);
  });
};

const askGPT = async (userPrompt, systemPrompt) => {
  const completion = await openai.chat.completions.create({
    model,
    // temperature: 1.5,
    // max_tokens: 800,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
      {
        role: "system",
        content: systemPrompt,
      },
    ],
  });
  const data = completion.choices[0];
  if (data.finish_reason !== "stop") {
    return null;
  }
  let content = data.message.content;
  try {
    content = JSON.parse(content);
  } catch (err) {
    return null;
  }
  return { data: content };
};

const sysPrompt = (video) => {
  const jsonExample = [
    {
      name: "Push-Ups",
      sets: 3,
      reps: "10-12 reps",
      instructions:
        "Start with regular push-ups to activate your chest, shoulders, and triceps.",
    },
  ];
  if (video) {
    jsonExample[0].youtube_link = "https://www.youtube.com/watch?v=Eh00_rniF8E";
  }
  return (
    "Response MUST be valid JSON following this data schema " +
    JSON.stringify(jsonExample)
  );
};

const getRoutine = async (req, res) => {
  const {
    age = 35,
    weight = 160,
    height = "5 5 ft",
    gender = "male",
    build = "athletic",
    duration = 30,
    focus = "full body",
    goal = "gain muscle",
    bwOnly,
    video,
  } = req.query;

  let nbExercises = parseInt(duration / 7);
  if (duration > 60) {
    nbExercises = `${nbExercises - 2} to ${nbExercises}`;
  }

  let userPrompt =
    `I am a ${age} year old ${gender} who is ${height}, weighs ${weight} pounds and has a ${build} build. ` +
    `Provide a ${focus} routine to ${goal} with ${nbExercises} exercises. `;
  if (bwOnly) {
    userPrompt += "Limit exercises to body weight exercises only. ";
  }
  if (video) {
    userPrompt +=
      "Include links to YouTube videos demonstrating each exercise from well known YouTube accounts. ";
  }
  const systemPrompt = sysPrompt(video);

  let routine = await askGPT(userPrompt, systemPrompt);
  if (!routine) {
    routine = await askGPT(userPrompt, systemPrompt);
  }
  if (video) {
    cleanVideos(routine.data);
  }
  res.json(routine);
};

export default getRoutine;
