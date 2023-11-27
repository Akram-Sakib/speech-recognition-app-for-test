"use client";

import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
  const [message, setMessage] = useState("");

  const commands = [
    {
      command: "I would like to order *",
      callback: (food: string) => setMessage(`Your order is for: ${food}`),
    },
    {
      command: "The weather is :condition today",
      callback: (condition: string) =>
        setMessage(`Today, the weather is ${condition}`),
    },
    {
      command: "My top sports are * and *",
      callback: (sport1: string, sport2: string) =>
        setMessage(`#1: ${sport1}, #2: ${sport2}`),
    },
    {
      command: "Pass the salt (please)",
      callback: () => setMessage("My pleasure"),
    },
    {
      command: ["Hello", "Hi"],
      callback: ({ command }: { command: string }) =>
        setMessage(`Hi there! You said: "${command}"`),
      matchInterim: true,
    },
    {
      command: "Beijing",
      callback: (command: any, spokenPhrase: any, similarityRatio: any) =>
        setMessage(
          `${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`
        ),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: ["eat", "sleep", "leave"],
      callback: (command: any) =>
        setMessage(`Best matching command: ${command}`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true,
    },
    {
      command: "clear",
      callback: ({ resetTranscript }: { resetTranscript: () => void }) =>
        resetTranscript(),
    },
  ];

  const { transcript, browserSupportsSpeechRecognition, listening } =
    useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return "No browser support";
  }

  SpeechRecognition.startListening({ continuous: true });

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <p>{message}</p>
      <p>{transcript}</p>
      {listening ? (
        <p>Already Listening...</p>
      ) : (
        <button
          onClick={() => SpeechRecognition.startListening({ continuous: true })}
        >
          Start
        </button>
      )}
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button
        onClick={() => {
          SpeechRecognition.abortListening;
          setMessage("");
        }}
      >
        Reset
      </button>
    </div>
  );
};
export default Dictaphone;
