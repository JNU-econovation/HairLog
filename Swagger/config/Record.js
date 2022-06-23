/**
 * @swagger
*paths:
*  /api/swagger/record/cut :
*    get:
*      tags: [Record_Cut]
*      summary: Cut 기록후 페이지
*      responses:
*        "200":
*          description: Cut 기록 페이지 로드 성공
*    post:
*      tags: [Record_Cut]
*      summary: Cut 기록 요청
*      consume: multipart/form-data
*      produces: application/json
*      requestBody:
*        content:
*          multipart/form-data:
*            schema:
*              type: object
*              properties:
*                Image:
*                  type: string
*                  format: base64
*                recordGrade:
*                  type: integer
*                  example: 3
*                recordDate:
*                  type: string
*                  example: 2022-06-23
*                recordTime:
*                  type: string
*                  example: 60
*                designerName:
*                  type: string
*                  example: 미라클
*                recordCost:
*                  type: integer
*                  example: 30000
*                cutName:
*                  type: string
*                  example: cutNameTest
*                cutLength:
*                  type: integer
*                  example: 10
*                recordEtc: 
*                  type: string
*                  example: etcTest
*      responses:
*        "200":
*          description: "successful operation"
*  /api/swagger/record/perm :
*    get:
*      tags: [Record_Perm]
*      summary: Perm 기록후 페이지
*      responses:
*        "200":
*          description: Perm 기록 페이지 로드 성공
*    post:
*      tags: [Record_Perm]
*      summary: Perm 기록 요청
*      consume: multipart/form-data
*      produces: application/json
*      requestBody:
*        content:
*          multipart/form-data:
*            schema:
*              type: object
*              properties:
*                Image:
*                  type: string
*                  format: base64
*                recordGrade:
*                  type: integer
*                  example: 3
*                recordDate:
*                  type: string
*                  example: 2022-06-23
*                recordTime:
*                  type: string
*                  example: 60
*                designerName:
*                  type: string
*                  example: 미라클
*                recordCost:
*                  type: integer
*                  example: 30000
*                permName:
*                  type: string
*                  example: permNameTest
*                permTime:
*                  type: integer
*                  example: 3
*                permHurt:
*                  type: integer
*                  example: 2
*                recordEtc:  
*                  type: string 
*                  example: etcTest
*      responses:
*        "200":
*          description: "successful operation"
*  /api/swagger/record/dyeing :
*    get:
*      tags: [Record_Dyeing]
*      summary: Dyeing 기록후 페이지
*      responses:
*        "200":
*          description: Dyeing 기록 페이지 로드 성공
*    post:
*      tags: [Record_Dyeing]
*      summary: Dyeing 기록 요청
*      consume: multipart/form-data
*      produces: application/json
*      requestBody:
*        content:
*          multipart/form-data:
*            schema:
*              type: object
*              properties:
*                Image:
*                  type: string
*                  format: base64
*                recordGrade:
*                  type: integer
*                  example: 3
*                recordDate:
*                  type: string
*                  example: 2022-06-23
*                recordTime:
*                  type: string
*                  example: 60
*                designerName:
*                  type: string
*                  example: 미라클
*                recordCost:
*                  type: integer
*                  example: 30000
*                dyeingColor:
*                  type: string
*                  example: dyeingColor
*                dyeingDecolorization:
*                  type: integer
*                  example: 3
*                dyeingTime:
*                  type: integer
*                  example: 2
*                dyeingHurt:
*                  type: integer
*                  example: 2
*                recordEtc:  
*                  type: string 
*                  example: etcTest
*      responses:
*        "200":
*          description: "successful operation"
*/