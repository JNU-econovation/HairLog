/**
*@swagger
*paths: 
*  /api/swagger/join :
*    get : 
*      tags: [Join]
*      summary: 회원가입 페이지
*      responses:
*        "200" :
*          description: 회원가입 페이지 로드 성공
*          
*    post:
*      tags: [Join]
*      summary: 회원가입 요청
*      requestBody:
*        required : true
*        content:
*          application/json:
*            schema:
*              $ref : '#/components/schemas/User'
*      responses:
*        '201' :
*          description : 회원가입 성공
*/