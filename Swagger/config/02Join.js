/**
*@swagger
*paths: 
*  /api/swagger/join :
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