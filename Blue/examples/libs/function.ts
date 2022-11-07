// 함수의 선언법
/*
const 함수명 = (인자1: 데이터 타입, 인자2: 데이터 타입): 리턴 데이터 타입 => {
  return 내용
}
*/
const mergeName = (familyName: string, givenName: string): string => {
  return `${familyName}:${givenName}`;
};

export default mergeName;
