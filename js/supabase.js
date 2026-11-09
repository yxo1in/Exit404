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

export { supabaseClient };
