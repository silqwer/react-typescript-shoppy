# Youtube Clone Coding

[시작하기  |  YouTube Data API  |  Google Developers](https://developers.google.com/youtube/v3/getting-started?hl=ko)

## 기능들 확인하기

1. 헤더
   1. 검색 inpput
   2. 키워드 단위
2. 콘텐츠
   1. 비디오 리스팅
   2. 비디오 카드
      1. 이미지
      2. 제좀
      3. 등록자
      4. 등록일
3. 영상 상세 패이지
   1. 재생
   2. 채널 정보 란
   3. 오른족 연관된 비디오 목록
   4. 라우팅 사용
4. 반응형

## API

[API Reference  |  YouTube Data API  |  Google Developers](https://developers.google.com/youtube/v3/docs?hl=ko)

- 키워드 검색

  ```jsx
  GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY] HTTP/1.1

  Authorization: Bearer [YOUR_ACCESS_TOKEN]
  Accept: application/json
  ```

- 핫트랜드 비디오들

  ```jsx
  GET https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=[YOUR_API_KEY] HTTP/1.1

  Authorization: Bearer [YOUR_ACCESS_TOKEN]
  Accept: application/json
  ```

- 연관된 비디오 검색

  ```jsx
  GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=Ks-_Mh1QhMc&type=video&key=[YOUR_API_KEY] HTTP/1.1

  Authorization: Bearer [YOUR_ACCESS_TOKEN]
  Accept: application/json
  ```

- 채널 상세내용

  ```jsx
  GET https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=[YOUR_API_KEY] HTTP/1.1

  Authorization: Bearer [YOUR_ACCESS_TOKEN]
  Accept: application/json
  ```

Mock Data를 사용하여 Api call 횟수를 줄인다.

### 개발 스택

- react

- react-router-dom

- react-query

- react-icons

- typescript

- axios

- timeago.js

### .env 구성

- REACT_APP_YOUTUBE_API_KEY=[YOUR_ACCESS_TOKEN]

### 사이트

- https://stately-brioche-9b9be1.netlify.app