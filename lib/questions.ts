import { supabase } from './supabase';

export type Question = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  imageUrl?: string;
};

// ✅ récupérer toutes les questions par niveau
export async function getQuestionsByLevel(level: string): Promise<Question[]> {
  console.log("📡 Fetching from Supabase, level =", level);

  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('level', level)
    .order("id");

  if (error) {
    console.error("❌ Supabase error:", error.message);
    return [];
  }

  console.log("✅ Supabase data:", data);

  return (data || []).map((q) => ({
    id: q.id,
    question: q.question ?? '',
    options: q.options ?? [],
    correctIndex: q.correct_index ?? 0,
    explanation: q.explanation ?? '',
    imageUrl: q.image_url?.replace(/^"+|"+$/g, '') ?? '' 
  }));
}

// ✅ récupérer dynamiquement la liste des niveaux
export async function getLevels(): Promise<string[]> {
  console.log("📡 Fetching levels from Supabase...");

  const { data, error } = await supabase
    .from("questions")
    .select("level");

  if (error) {
    console.error("❌ Supabase error (levels):", error.message);
    return [];
  }

  // extraire les niveaux uniques
  const levels = Array.from(new Set((data || []).map((q) => q.level)));

  console.log("✅ Levels trouvés:", levels);

  // optionnel: trier (niveau1, niveau2, ...)
  return levels.sort((a, b) => {
    const numA = parseInt(a.replace("niveau", ""), 10);
    const numB = parseInt(b.replace("niveau", ""), 10);
    return numA - numB;
  });
}
