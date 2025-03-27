# AI Coder

![aicoder](https://github.com/user-attachments/assets/bcf2a199-b0bb-4bcb-8d81-64f33f9a16fb)

**AI Coder** is a simple website created using Next.js, integrated with Llama 405B for React.js code generation. This project was developed as an experiment to explore the capabilities of Llama 405B. This is heavily inspired by [LlamaCoder](https://github.com/llama-coder).

## Features

- **Next JS**: Utilizes a front-end library Next JS for building user interfaces.
- **Llama AI Integration**: Generates code in React JS with the use prompts.
- **OpenAI Compatible**: Can be used with OpenAI compatible API inferences.

## Purpose

The main purpose of AI-Coder is to explore and understand how Meta's Llama 405B can be integrated into web applications for coding tasks. Built with Next.js, this project aims to study the practical applications and limitations of AI-driven code generation, focusing on creating React.js components from prompts.

## Installation

To get started with the AI Coder, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/jei3m/ai-coder.git
2. Navigate to the project directory:
   ```bash
   cd ai-coder
3. Install the dependencies:
   ```bash
   npm install
4. Set Up Environment Variables
    Create a `.env` file in the root directory and add your Sambanova API credentials.
    ```env
    SAMBANOVA_API_KEY=your_sambanova_api_key
    ```

5. Start the development server:
   ```bash
   npm run dev

## Usage
Once the development server is running, open your browser and navigate to http://localhost:3000. You can start typing prompts and the integrated AI will automatically create React JS components for you.
