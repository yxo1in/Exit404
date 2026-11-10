import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { init } from "./main.js";

const SUPABASE_URL = "https://uzawdbyxziomlqezxuhb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6YXdkYnl4emlvbWxxZXp4dWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4MzM0NTUsImV4cCI6MjEwNDQwOTQ1NX0.hl1kQnFRyQoIBOKt3Qn_cvG-2MWTZQjYPG57_sJsrKE";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 선택한 카테고리의 문제를 가져오는 함수 (기본값 'javascript')
export async function loadProblemsByCategory(category = "javascript") {
  const { data, error } = await supabaseClient
    .from("problem")
    .select("id, category, question")
    .eq("category", category);

  if (error) {
    console.error(`${category} 문제 로드 실패:`, error);
    init([]);
    return;
  }

  console.log(`${category} 문제 불러오기 성공:`, data);
  init(data ?? []);
}

// 최초 실행 시 기본값 'javascript' 로드
loadProblemsByCategory("javascript");

// 랭킹 목록 조회
export async function fetchRanking() {
  const { data, error } = await supabaseClient
    .from('ranking')
    .select('student_name, play_time')
    .order('play_time', { ascending: true })
    .limit(10);

  if (error) {
    console.error('랭킹 로드 실패:', error);
    return [];
  }
  return data;
}

// 실제 게임 기록 저장 함수
export async function saveRanking(studentName, playTime) {
  try {
    const { data, error } = await supabaseClient
      .from('ranking')
      .insert([
        {
          student_name: studentName,
          play_time: playTime
        }
      ]);

    if (error) {
      console.error('랭킹 저장 중 에러 발생:', error);
      return false;
    }

    console.log('실제 데이터 랭킹 저장 완료:', data);
    return true;
  } catch (err) {
    console.error('서버 통신 에러:', err);
    return false;
  }
}