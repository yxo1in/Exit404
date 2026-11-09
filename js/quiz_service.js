// Supabase 클라이언트 (프로젝트 설정에 맞춰 import)

import { supabaseClient } from './supabase.js';

/**
 * 1. 카테고리별 또는 전체 문제 목록 가져오기
 * @param {string} [category] - 특정 카테고리 (선택 사항)
 */
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

/**
 * 2. ID로 단일 문제 상세 가져오기
 * @param {string} problemId - UUID 형태의 문제 ID
 */
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

/**
 * 3. 정답 검증 (서버/DB 연동 채점)
 * @param {string} problemId - 문제 UUID
 * @param {string} userSubmittedAnswer - 사용자가 입력한 정답
 */
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

    // 공백 및 대소문자 정규화 후 비교
    const correctAnswer = data.answer.trim().toLowerCase();
    const inputAnswer = userSubmittedAnswer.trim().toLowerCase();

    const isCorrect = correctAnswer === inputAnswer;

    return {
        isCorrect,
        correctAnswer: data.answer // 필요 시 정답 제공
    };
}