import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://uzawdbyxziomlqezxuhb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6YXdkYnl4emlvbWxxZXp4dWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4MzM0NTUsImV4cCI6MjEwNDQwOTQ1NX0.hl1kQnFRyQoIBOKt3Qn_cvG-2MWTZQjYPG57_sJsrKE";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 이 파일을 import한 모듈은 문제를 다 불러올 때까지 기다렸다가 실행됨
const { data, error } = await supabaseClient
  .from("problem")
  .select("id, category, question");

if (error) {
  console.error("연결 실패:", error);
}

const problems = data ?? [];

export { supabaseClient, problems };
