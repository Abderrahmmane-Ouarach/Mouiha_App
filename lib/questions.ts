import { supabase } from './supabase';

export type Question = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  imageUrl?: string;
};

export async function getQuestionsByLevel(level: string): Promise<Question[]> {
  console.log("📡 Fetching from Supabase, level =", level);

  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('level', level);

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

