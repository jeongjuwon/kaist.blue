# 깃 설치

## 윈도우 설치

[https://git-scm.com/download/win](https://git-scm.com/download/win)

## MAC 설치

[https://git-scm.com/download/mac](https://git-scm.com/download/mac)

# 설치 사용법

## 소스코드 다운로드

```
git clone https://github.com/jeongjuwon/kaist.blue.git
```

# 앱 관리

## 앱 코드 수정

아래의 명령어를 실행하여 vscode로 해당 워크스페이스를 연다.

```
code Blue
```

## 앱 실행 방법

```
cd Blue

# npm 설치: 처음 다운로드 받거나 package.json에 변경 사항이 있을 때

npm install 

# pod 설치: 처음 다운로드 받거나 package.json에 변경 사항이 있을 때

npx pod-install

# 메트로 번들러 실행
npm run start:dev 

# ios 실행
yarn ios 

# aos 실행
yarn android
```

# 서버 관리

## 서버 코드 수정

아래의 명령어를 실행하여 vscode로 해당 워크스페이스를 연다.

```
code APIServer
```

## 디비 경로 입력

/APIServer/src/main/resources/application.properties 파일 수정

```
spring.datasource.url=jdbc:mysql://디비호스트:디피포트/디비명?&allowPublicKeyRetrieval=true
spring.datasource.username=디비유저명
spring.datasource.password=디비패스워드
```

## 서버 실행 방법

```
cd APIServer
./gradlew clean && ./gradlew build
java -jar ./build/libs/KaistSampleAPIServer06-0.0.1-SNAPSHOT.jar
```
