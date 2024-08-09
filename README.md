# OpenAI LangChain Bot

This project provides a backend API for preprocessing files, semantic search, and generating completions using GPT-3.5. It is easy to deploy and run as it is packaged in a Docker container. To use this service, you'll need an OpenAI API key.

## Setup Instructions

1. **Configure the API Key**

    Open the `config.py` file and set your OpenAI API key:
    ```python
    OPENAI_API_KEY = "your-api-key-here"
2. **Install Backend Dependencies**
    Navigate to the backend folder and install the required Python packages:
  
    ```
    pip install -r requirements.txt
    ```
3. **Run the Backend**
    Start the backend server by running:
    ```
    python3 main.py
    ```
    Keep this server running to handle requests.

4. **Set Up the Frontend**
    In the frontend folder, install the necessary Node.js packages and start the development server:
    ```
    npm install
    npm run dev
    ```

5. **Open your browser and navigate to http://localhost:5173 to access the user interface.**
    You should be able to upload your files and interact with them via the chat interface.
