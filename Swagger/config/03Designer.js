/**
*@swagger
*paths: 
*  /api/swagger/designer :
*    get : 
*      tags: [Designer]
*      summary: 디자이너 페이지
*      responses:
*        "200" :
*          description: 디자이너 페이지 로드 성공
*    post:
*      tags: [Designer]
*      summary: 디자이너 등록 요청
*      requestBody:
*        required : true
*        content:
*          application/json:
*            schema:
*              $ref : '#/components/schemas/Designer'
*      responses:
*        '201' :
*          description : 디자이너 등록 성공
*  /api/swagger/designerUpdate :
*    post:
*      tags: [Designer]
*      summary: 디자이너 수정 요청
*      requestBody:
*        content:
*          application/x-www-form-urlencoded:
*            schema:
*              type: object
*              properties:
*                DesignerId:
*                  type: integer
*                  example: 
*                designerName:
*                  type: string
*                  example: 미라클
*                designerSalon:
*                  type: string
*                  example: 에코노베이션
*                fav:
*                  type: integer
*                  example: 0
*      responses:
*        '201' :
*          description : 디자이너 등록 성공
*  /api/swagger/designerDelete :
*    post:
*      tags: [Designer]
*      summary: 디자이너 삭제 요청
*      consume: multipart/form-data
*      produces: application/json
*      requestBody:
*        content:
*          application/x-www-form-urlencoded:
*            schema:
*              type: object
*              properties:
*                DesignerId:
*                  type: integer
*      responses:
*        "200":
*          description: "successful operation"
*  /api/swagger/favDesigner :
*    get : 
*      tags: [Designer]
*      summary: 선호 디자이너 페이지
*      responses:
*        "200" :
*          description: 선호 디자이너 페이지 로드 성공
 */
