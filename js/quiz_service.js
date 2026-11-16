import { supabaseClient } from './supabase.js';

export async function getProblems(category = null) {
  let query = supabaseClient
    .from('problem')
    .select('id, category, question'); 

    if (category) {
        query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) {
        console.error('문제 조회 실패:', error);
        return [];
    }
    return data;
}


export async function getProblemById(problemId) {
  const { data, error } = await supabaseClient
    .from('problem')
    .select('id, category, question')
    .eq('id', problemId)
    .single();

    if (error) {
        console.error('문제 가져오기 실패:', error);
        return null;
    }
    return data;
}


export async function checkAnswer(problemId, userSubmittedAnswer) {
  const { data, error } = await supabaseClient
    .from('problem')
    .select('answer')
    .eq('id', problemId)
    .single();

    if (error || !data) {
        console.error('정답 확인 중 오류 발생:', error);
        return { isCorrect: false, error: '문제를 찾을 수 없습니다.' };
    }

    const correctAnswer = data.answer.trim().toLowerCase();
    const inputAnswer = userSubmittedAnswer.trim().toLowerCase();

    const isCorrect = correctAnswer === inputAnswer;

    return {
        isCorrect,
        correctAnswer: data.answer // 필요 시 정답 제공
    };
}