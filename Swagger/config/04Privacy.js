/**
*@swagger
*paths:
*  /api/swagger/privacy/user :
*    get:
*      tags: [Privacy]
*      summary: 개인 페이지 유저 정보
*      responses:
*        "200":
*          description: 개인 페이지 로드 성공
*  /api/swagger/privacyUpdate/user :
*    post:
*      tags: [Privacy]
*      summary: 개인정보 수정 요청
*      requestBody:
*        required : true
*        content:
*          application/json:
*            schema:
*              $ref : '#/components/schemas/User'
*      responses:
*        '201' :
*          description : 개인정보 수정 성공
*  /api/swagger/checkPassword :
*    post:
*      tags: [Privacy]
*      summary: 비밀번호 확인 요청
*      requestBody:
*        content:
*          multipart/form-data:
*            schema:
*              type: object
*              properties:
*                userPassword:
*                  type: string
*                  example: 3
*      responses:
*        '201' :
*          description : 비밀번호 수정 성공
*/
