export default function extractJsonFromResponse(response) {
  // Use a regular expression to find the JSON object in the response string
  const jsonMatch = response.match(/\{.*\}/s); // Match everything inside the first set of curly braces

  if (jsonMatch) {
    // Parse the matched string into a JSON object
    const jsonObject = JSON.parse(jsonMatch[0]);
    // Convert the JSON object back to a string
    return jsonObject; // Pretty print with 2 spaces for indentation
  } else {
    throw new Error("No valid JSON found in the response.");
  }
}
