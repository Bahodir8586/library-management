**GET Librarian API for user**
----

    Returns json DATA

## Get librarian

* **URL**

  /api/user/librarians/${id}

* **Method**

  `GET`

* **Bearer Token**

  Yes

* **URL Params**

  None


* **Data Params**

  None


* **Success Response:**

    * **Code:** 200 <br/>
      **Content:**
      `{id:1,image:"url", name:"bahodir01", accepted:"1", finished:"0", rejected:"18""}`<br/>

  
----

* **Error Response:**

      **Code:** 401 Unauthorized <br />
      **Content:** `{ error : "Unauthorized" }`

      OR
      **Code:** 404 NOT FOUND <br />
      **Content:** `{ error : "Not Found" }`

      OR

      **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to respond" }`

