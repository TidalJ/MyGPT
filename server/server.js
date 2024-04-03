import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();


const openai = new OpenAI({
    apiKey: "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",
});


const app = express();
app.use(cors());
app.use(express.json());


app.get("/", async (req, res) => {
    res.status(200).send({
        message: "Hello from MyGPT",
    })
});

app.post("/", async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-16k-0613",
            messages: [
                {
                    "role": "user",
                    "content": ""
                }
            ],
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        res.status(200).send({
            bot: response.data.choices[0].text
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }

});

app.listen(5000, () => console.log("Server is running on port http://localhost:5000"));