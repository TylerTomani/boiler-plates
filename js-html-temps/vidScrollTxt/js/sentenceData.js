export async function loadTimeline() {
  const res = await fetch('data/sentenceTimeline.json');
  if (!res.ok) throw new Error('Failed to load timeline');
  return await res.json();
}
