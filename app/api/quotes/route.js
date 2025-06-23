// app/api/quotes/route.js

const quotesDB = {
  motivational: [
    { content: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { content: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { content: "Success is what comes after you stop making excuses.", author: "Luis Galarza" },
  ],
  funny: [
    { content: "I used to think I was indecisive, but now I’m not so sure.", author: "Unknown" },
    { content: "I’m on a seafood diet. I see food and I eat it.", author: "Anonymous" },
    { content: "Why don’t scientists trust atoms? Because they make up everything.", author: "Unknown" },
  ],
  philosophy: [
    { content: "The unexamined life is not worth living.", author: "Socrates" },
    { content: "He who opens a school door, closes a prison.", author: "Victor Hugo" },
    { content: "Man is condemned to be free.", author: "Jean-Paul Sartre" },
  ],
  tech: [
    { content: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { content: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { content: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
  ],
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "motivational";

  const quotes = quotesDB[category.toLowerCase()] || quotesDB["motivational"];
  const random = quotes[Math.floor(Math.random() * quotes.length)];

  return Response.json(random);
}
