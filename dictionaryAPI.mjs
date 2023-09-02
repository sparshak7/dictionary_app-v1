import axios from "axios";

const getWordDefinition = async (word) => {
  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching definition:", error.message);
    throw error;
  }
};

export { getWordDefinition };
