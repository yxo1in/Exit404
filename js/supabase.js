import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { init } from "./main.js";

const SUPABASE_URL = "https://uzawdbyxziomlqezxuhb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6YXdkYnl4emlvbWxxZXp4dWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4MzM0NTUsImV4cCI6MjEwNDQwOTQ1NX0.hl1kQnFRyQoIBOKt3Qn_cvG-2MWTZQjYPG57_sJsrKE";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 문제를 다 불러온 뒤 게임 시작
const { data, error } = await supabaseClient
  .from("problem")
  .select("id, category, question");

if (error) {
  console.error("연결 실패:", error);
}

init(data ?? []);
export async function fetchRanking() {
  // supabase -> supabaseClient 로 수정!
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

// js/supabase.js

// 테스트용 더미 데이터 삽입 함수
export async function insertDummyRankings() {
  const dummyData = [
    { student_name: "김미림", play_time: 45 },
    { student_name: "이해커", play_time: 62 },
    { student_name: "박자바", play_time: 78 },
    { student_name: "최파이썬", play_time: 95 },
    { student_name: "정웹개발", play_time: 120 }
  ];

  const { data, error } = await supabaseClient
    .from('ranking')
    .insert(dummyData);

  if (error) {
    console.error("더미 데이터 삽입 실패:", error);
    alert("더미 데이터 삽입에 실패했습니다. (콘솔 확인)");
  } else {
    console.log("더미 데이터 삽입 성공!");
    alert("테스트용 랭킹 데이터 5건이 추가되었습니다!");
  }
}

export { supabaseClient };
