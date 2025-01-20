# React AI Course

All that has to be done here is update the two methods, analyze-sentiment.ts and summarie-conent.ts

currently, all defaults to pending with a summary that shows body length

Approach 1: Using generateText and manually parsing the returned string

You provide a plain-text prompt to the model and get back a string.
You manually parse that string (trimming whitespace, etc.) and validate it with z.enum.
If the string from the model is anything outside the enum, you catch the error and use a default.
Approach 2: Using generateObject with a Zod schema

You define a structured response via a Zod schema (in this case, an object with a sentiment property).
You call the model with a prompt plus a schema, so the model is expected to return JSON matching that schema.
The returned JSON is validated automatically by Zod, making the result more reliable (or you fall back to a default on error).

USE analyzeSentimentWithSchema from prelim-investigation source for the above reasons.
