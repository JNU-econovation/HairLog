## 프로젝트 한 줄 소개
헤어 스타일링과 만족도를 기록하는 프로그레시브 웹 앱

## 아이디어
다른 미용실을 가거나 디자이너가 바뀌어 헤어 스타일링에 아쉬움을 느낀 적이 있지 않나요? 헤어로그는 이러한 상황에서도 만족도 높은 스타일링을 받을 수 있도록 하기 위해 기획되었습니다. 사용자는 미용실 방문 후 시술 종류에 따른 기록 양식을 제공받으며, 만족도를 기억할 수 있습니다. 이를 통해 자신에게 맞는 미용실을 찾고 원하는 스타일링을 받도록 돕습니다. 

## 기술 스택
- nodejs
 - passport
 - multer
 - Cloudinary
- sequelize
- swagger
- Heroku

#### passport
passport는 nodejs의 미들웨어로 으로 요청을 전략을 통해 인증한다.
헤어로그 프로젝트의 경우 요청을 passport의 local 전략을 활용하여 인증하였다.

#### multer
헤어로그 프로젝트는 자신의 머리 스타일링을 기록하는 어플이기에 자신의 헤어 스타일을 촬영한 사진을 업로드하는 기술이 필수이다.
multer은 node.js의 multipart/form-data를 다루기 위한 미들웨어로 이를 통해 사진을 업로드 할 수 있다.

#### Cloudinary
Cloudinary는 클라우드 기반의 이미지 및 비디오 관리 서비스이다.

#### sequelize
sequelize는 SQL을 위한 Node.js ORM 이다.
헤어로그에서 sequelize를 사용한 이유는 sequelize와 같은 ORM을 사용하면 SQL 쿼리의 재사용과 유지가 쉬워지고 DB와 객체 사이의 데이터 전환을 간단하게 해주기 때문에 사용하게 되었다.

#### swagger
swagger은 개발자가 REST 웹 서비스를 설계, 빌드, 문서화, 소비하는 일을 도와주는 대형 도구 생태계의 지원을 받는 오픈 소스 소프트웨어 프레임워크이다.

#### Heroku
Heroku는 여러 프로그래밍 언어를 지원하는 클라우드 컴퓨팅 플랫폼이다.

### 프로젝트를 시작하는 방법
웹 서버를 실행할 파일은 app.js로 npm start를 통해서 서버를 실행할 수 있습니다.
하지만 gitignore을 통해 업로드 되지 않은 파일 중 node_modules, .env는 프로젝트 시작전 생성해 주어야 합니다.
먼저 node_modules의 경우 npm install을 통해 생성할 수 있습니다.
.env의 경우 다음의 목록은 설정해 주어야 합니다.
* PORT = 3000
* NODE_ENV = development
* SESSION_SECRET = sessionSecret
* SEQUELIZE_DEVELOPEMENT = 본인 개발 스키마
* SEQUELIZE_DEVELOPEMENT_PASSWORD = 본인 sql 비밀번호
* SEQUELIZE_TEST = 본일 테스트 스키마
* SEQUELIZE_PRODUCTION_ID  = 본인 프로덕션 sql 아이디
* SEQUELIZE_PRODUCTION_PASSWORD = 본인 프로덕션 sql 비밀번호
* SEQUELIZE_PRODUCTION_HOST = 본인 프로덕션 sql host 주소
* SEQUELIZE_PRODUCTION_DBNAME = 본인 프로덕션 sql 스키마 이름
* CLOUD_NAME = cloudinary 아이디
* API_KEY = cloudinary key
* API_SECRET = cloudinary secret
