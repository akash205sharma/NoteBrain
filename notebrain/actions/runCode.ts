export async function runCode(code:string|null,language:string|null) {
  const response = await fetch('http://localhost:4000/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code: code,
      language: language
    })
  });

  const data = await response.json();
  return data;
}
