import { GoogleGenerativeAI } from "@google/generative-ai";
import extractJsonFromResponse from "./stringToJson.js";

export default async function getResponse(raw_data) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GENAI_KEY);
    const Sysprompt = `
  Generate a JSON object that describes a hackathon following the exact structure provided below. Ensure that all fields are properly filled with appropriate data types (e.g., strings, numbers, booleans) and no mistakes are allowed. The structure must match the following template exactly:
  
  {
    "title": "string",               // Hackathon title
    "organizer": "string",           // Organization or institution hosting the event
    "dates": {
      "start_date": "YYYY-MM-DD",    // Start date of the event
      "end_date": "YYYY-MM-DD",      // End date of the event
      "submission_deadline": "YYYY-MM-DD" // Submission deadline for first phase (if applicable)
    },
    "eligibility": {
      "open_to": "string",           // Description of eligible participants (e.g., students, professionals)
      "team_size": {                 // Team size constraints
        "min": "number",             
        "max": "number"
      },
      "cross_college_allowed": "boolean", // If cross-college teams are allowed
      "cross_specialization_allowed": "boolean" // If cross-specialization teams are allowed
    },
    "phases": [                      // Phases or rounds in the hackathon
      {
        "phase_name": "string",       // Name of the phase (e.g., Ideation, Coding Round)
        "description": "string",      // Brief description of what this phase entails
        "submission_format": "string", // Format of submission (e.g., PPT, PDF, video)
        "date": "YYYY-MM-DD"          // Date or deadline for this phase
      }
    ],
    "prizes": {
      "total_prize_pool": "string",   // Total prize pool (e.g., INR 1 Lakh)
      "individual_prizes": [
        {
          "position": "string",       // e.g., "Winner", "1st Runner-Up"
          "reward": "string"          // e.g., "INR 50,000"
        }
      ]
    },
    "submission_guidelines": {
      "submission_format": "string",   // Required format for submission (e.g., PDF, PPT)
      "instructions": "string"         // Any additional instructions or guidelines
    },
    "contact_information": [           // Contact information for inquiries
      {
        "name": "string",
        "phone": "string",
        "email": "string"
      }
    ],
    "rules": [                          // Rules for participation
      "string"
    ]
  }
  
  Make sure that:
  - The JSON structure is strictly followed.
  - All fields are filled out with valid placeholders as specified.
  - The data types (string, number, boolean) are correct.
  - Avoid missing any fields or creating additional ones.
  `;
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: Sysprompt,
    });

    const result = await model.generateContent(raw_data);

    const finalResult = await extractJsonFromResponse(result.response.text());

    return finalResult;
  } catch (e) {
    console.log(e);
  }
}
