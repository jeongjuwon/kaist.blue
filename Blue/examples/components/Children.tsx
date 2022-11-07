// 모든 컴포넌트는 상단에 React를 임포트 하세요.
import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 컴포넌트의 속성
type Props = {
  title: string;
  count: number;
  children: ReactNode;
};

// 컴포넌트 정의
const Children: React.FC<Props> = ({title, count, children}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{count}</Text>
      {children}
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  title: {
    color: 'white',
  },
  count: {
    color: 'red',
  },
});

// 내보내기
export default Children;
