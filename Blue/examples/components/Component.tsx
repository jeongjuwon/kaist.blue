// 모든 컴포넌트는 상단에 React를 임포트 하세요.
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 컴포넌트의 속성
/*
type 타입명 = {
  속성명1: 데이터 타입
  속성명2: 데이터 타입
  속성명3: 데이터 타입
  속성명4: 데이터 타입
}
*/
type Props = {
  title: string;
  count: number;
};

// 컴포넌트 정의
/*
const Component: 타입(React.FC<Props>) = (속성) => {
  return (
    뷰 컴포넌트 와 스타일 조합
  )
}
*/
const Component: React.FC<Props> = ({title, count}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{count + 10}</Text>
    </View>
  );
};

// 스타일 정의
// 파일마다 여러개의 StyleSheet.create를 쓸 수 있지만
// 한번만 쓰자
const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  title: {
    color: 'white',
  },
  content: {
    color: 'red',
  },
});

// 내보내기
export default Component;
